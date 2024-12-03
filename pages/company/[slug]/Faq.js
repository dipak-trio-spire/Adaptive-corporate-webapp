import React, { useEffect, useState } from 'react';
import { Helmet } from "react-helmet";
import FaqDetail from "@/components/FaqDetail/FaqDetail";
import Head from 'next/head';
import axios from 'axios';

function Faq(props) {
  const [FaqSEOData, setFaqSEOData] = useState(null)
  const getFaqData = async () => {
    try {
      const response = await axios.get('https://adaptive.rocket-wp.com/wp-json/custom/v1/page-acf-data?slug=faq');
      setFaqSEOData(response.data);
    } catch (error) {
      console.error("Error fetching FAQ data:", error);
    } 
  };

  useEffect(() => {
    getFaqData();
  }, []);
  return (
    <>
            <Head>
                <title>{FaqSEOData?.seo_meta.meta_title.replace(/&amp;/g, '&')}</title>
                <meta property="og:title" content={FaqSEOData?.seo_meta.meta_title.replace(/&amp;/g, '&')} />
                <meta property="og:site_name" content="Adaptive FAQ" />
                <meta property="og:description" content={FaqSEOData?.seo_meta.meta_description.replace(/&amp;/g, '&')} />
                <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
                <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
            </Head>
            <FaqDetail></FaqDetail>
        </>
  )
}

export default Faq