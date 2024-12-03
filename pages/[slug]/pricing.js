import React, { useEffect, useState } from "react";
import PageLoader from "@/components/PageLoader/PageLoader";
import HeroSectionv2 from "@/components/HeroSection/HeroSectionv2";
import Head from "next/head";
import { AllData } from "@/utils/fetchHelpers";
import { useRouter } from "next/router";
import PricingCard from "@/components/PricingCard/PricingCard";

export default function WhatWeDo() { // Renamed to start with uppercase
  const router = useRouter();
  const { slug } = router.query;
  const [PricingData, setPricingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) {
      setPricingData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== "no_page") {
          setPricingData(initialContent.data);
        } else {
          setPricingData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPricingData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <>
      {loading && <PageLoader />}
      <Head>
        <title>{PricingData?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
        <meta property="og:title" content={PricingData?.seo_meta.meta_title.replace(/&amp;/g, '&')} />
        <meta property="og:site_name" content="Adaptive Investments" />
        <meta property="og:description" content={PricingData?.seo_meta.meta_description.replace(/&amp;/g, '&')} />
        <meta
          property="og:image"
          content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"}
        />
        <meta
          name="keywords"
          content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
        />
      </Head>
      <HeroSectionv2
        title={PricingData?.pricing_banner_main_title}
        content={PricingData?.pricing_banner_content
          ?.replace(/<p>/g, "")
          .replace(/<\/p>/g, "")}
        showSignupForm=""
        pricing_banner_sub_text={PricingData?.pricing_banner_sub_text}
      />
      <div className="sectiondivide innercontent price-sheildCard">
        <div className="priceintercontent">
          <div className="context">
            <h2>{PricingData?.pricing_plans_main_title}</h2>
            <div className="marking-list1" dangerouslySetInnerHTML={{__html : PricingData?.pricing_plans_content }}></div>
          </div>
          <div className="ShieldCardcon pricing-card">
            {PricingData &&
              PricingData?.pricing_all_plans?.map((val, i) => (
                <PricingCard
                  key={i} 
                  mostPopulerplan={val.pricing_all_plans_most_popular_plan_option_selection}
                  icon={val.pricing_all_plans_icon}
                  title={val.pricing_all_plans_title}
                  BTNlink={val.pricing_all_plans_link}
                  price={val.pricing_all_plans_price}
                  discount={val.pricing_all_plans_discount}
                  trialText={val.pricing_all_plans_day_trial_text}
                  userMonth={val.pricing_all_plans_user_month_text}
                  content={val.pricing_all_plans_content
                    ?.replace(/<p>/g, "")
                    .replace(/<\/p>/g, "")}
                  listing={val.pricing_all_plans_listing}
                />
              ))}
          </div>
        </div>
      </div>
      {/* <div className="sectiondivide vcolumn">
        <h2 className="sec-head">{PricingData?.growing_main_title}</h2>
        <CompareTable
          CompareTableHeadData={PricingData?.growing_table_head}
          CompareTableBodyData={PricingData?.growing_table_body}
        />
      </div> */}
      {/* <AddUser showDetailsForm={true} /> */}
    </>
  );
}
