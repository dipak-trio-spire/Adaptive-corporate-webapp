"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PageLoader from "@/components/PageLoader/PageLoader";
import Productcard from "@/components/Productcard/Productcard";
import ShieldCard from "@/components/ShieldCard/ShieldCard";
import HeroSection from "@/components/HeroSection/HeroSection";
import HowItWork from "@/components/HowItWork/HowItWork";
import FeatureCard from "@/components/FeatureCard/FeatureCard";
import CompareTable from "@/components/CompareTable/CompareTable";
import AddUser from "@/components/AddUser/AddUser";
import Head from "next/head";
import { AllData } from "@/utils/fetchHelpers";
import { useRouter } from "next/router";

export default function WhatWeDo() {
  const router = useRouter();
  const { slug } = router.query;
  const [retail_investorsData, setRetailInvestorsData] = useState(null);

  useEffect(() => {
    if (!slug) {
      setRetailInvestorsData(null);
      return;
    }
    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);

        if (initialContent && initialContent.code !== "no_page") {
          setRetailInvestorsData(initialContent.data);
        } else {
          setRetailInvestorsData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setRetailInvestorsData(null);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <>
      <PageLoader />
      <Head>
        <title>
          {retail_investorsData?.seo_meta.meta_title.replace(/&amp;/g, "&")}
        </title>
        <meta
          property="og:title"
          content={retail_investorsData?.seo_meta.meta_title.replace(
            /&amp;/g,
            "&"
          )}
        />
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta
          property="og:description"
          content={retail_investorsData?.seo_meta.meta_description.replace(
            /&amp;/g,
            "&"
          )}
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}/Assets/Adaptive-Platform-Illustration.png`}
        />
        <meta
          name="keywords"
          content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
        />
      </Head>
       <HeroSection
        title={retail_investorsData?.retail_investors_banner_main_title}
        subtitle={retail_investorsData?.retail_investors_banner_sub_title}
        content={retail_investorsData?.retail_investors_banner_content}
        hreflink={retail_investorsData?.retail_investors_banner_link?.url}
        linktext={retail_investorsData?.retail_investors_banner_link?.title}
        showSignupForm=""
      >
        {retail_investorsData?.retail_investors_banner_image && (
          <Image
            src={retail_investorsData?.retail_investors_banner_image}
            width={630}
            height={400}
            alt={
              retail_investorsData?.retail_investors_banner_main_title ||
              "Banner image"
            } // Added alt prop
          />
        )}
      </HeroSection>

      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
            {retail_investorsData?.retail_investors_what_we_do_sub_title && (
              <p className="subhighlight">
                {retail_investorsData?.retail_investors_what_we_do_sub_title}
              </p>
            )}
            <h2>
              {retail_investorsData?.retail_investors_what_we_do_main_title}
            </h2>
          </div>
          <div className="productcardsec">
            {retail_investorsData?.retail_investors_what_we_do_all_tools?.map(
              (val, i) => (
                <Productcard
                  key={i} // Added key prop
                  imageUrl={val.retail_investors_what_we_do_all_tools_icon}
                  // imageAlt={val.retail_investors_what_we_do_all_tools_title}
                  title={val.retail_investors_what_we_do_all_tools_title}
                  link=""
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: val.retail_investors_what_we_do_all_tools_content
                        ?.replace(/<p>/g, "")
                        .replace(/<\/p>/g, ""),
                    }}
                  />
                </Productcard>
              )
            )}
          </div>
        </div>
        <div className="featureview context">
          <div className="sectiontitle">
            {retail_investorsData?.retail_investors_changes_main_title && (
              <p className="subhighlight">
                {retail_investorsData?.retail_investors_changes_sub_title}
              </p>
            )}
            <h2>{retail_investorsData?.retail_investors_changes_main_title}</h2>
          </div>
          <div className="productcardsec">
            {retail_investorsData?.retail_investors_all_changes?.map(
              (val, i) => (
                <Productcard
                  key={i} // Added key prop
                  imageUrl={val.retail_investors_all_changes_icon}
                  // imageAlt={val.retail_investors_what_we_do_all_tools_title}
                  title={val.retail_investors_all_changes_title}
                  link=""
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: val.retail_investors_all_changes_content
                        ?.replace(/<p>/g, "")
                        .replace(/<\/p>/g, ""),
                    }}
                  />
                </Productcard>
              )
            )}
          </div>
        </div>
      </div>
      <ShieldCard
        ImageSRC={retail_investorsData?.retail_investors_downturns_images}
        normaltext={retail_investorsData?.retail_investors_downturns_content
          ?.replace(/<p>/g, "")
          .replace(/<\/p>/g, "")
          .replace(/&amp;/g, "&")}
      >
        {retail_investorsData?.retail_investors_downturns_main_title}
      </ShieldCard>

      <HowItWork
        title={retail_investorsData?.retail_investors_how_work_main_title}
        subheading={retail_investorsData?.retail_investors_how_work_sub_title}
        imageUrl={retail_investorsData?.retail_investors_how_work_image}
      />

      <div className="sectiondivide vcolumn gap100">
        <div className="featureview context">
          <div className="sectiontitle">
            <h2>
              {retail_investorsData?.retail_investors_benefits_main_title}
            </h2>
            <p
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: retail_investorsData?.retail_investors_benefits_content
                  ?.replace(/<p>/g, "")
                  .replace(/<\/p>/g, ""),
              }}
            ></p>
          </div>
          <div className="feturecardcon">
            {retail_investorsData?.retail_investors_all_benefits?.map(
              (val, i) => (
                <FeatureCard
                  key={i} // Added key prop
                  imageUrl={val?.retail_investors_all_benefits_icon}
                  imageAlt={val?.retail_investors_all_benefits_title}
                  title={val?.retail_investors_all_benefits_title}
                  content={val?.retail_investors_all_benefits_content
                    ?.replace(/<p>/g, "")
                    .replace(/<\/p>/g, "")}
                  hreflink="javascript:;"
                />
              )
            )}
          </div>
        </div>
      </div>
      <div className="sectiondivide vcolumn">
        <h2 className="sec-head">{retail_investorsData?.growing_main_title}</h2>
        <CompareTable
          CompareTableHeadData={retail_investorsData?.growing_table_head}
          CompareTableBodyData={retail_investorsData?.growing_table_body}
        />
      </div>
      <AddUser showDetailsForm={true} />
    </>
  );
}
