// tools/[slug]/index.js
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Ppc from '@/pages/tools/[slug]/ppc';
import Ppcv2 from '@/pages/tools/[slug]/ppcv2';
import Ppcv3 from '@/pages/tools/[slug]/ppcv3';
import Riskcontribution from '@/pages/tools/[slug]/riskcontribution';
import FactorAnalysisV1 from '@/pages/tools/[slug]/factor_analysis';
import FactorAnalysisV2 from '@/pages/tools/[slug]/factor_analysisv2';
import Risk_Weather from '@/pages/tools/[slug]/rw';
import ForwardTest from '@/pages/tools/[slug]/mc';
import ForwardTestv2 from '@/pages/tools/[slug]/mcv2';
import { getFactorAnalysisProps } from "@/utils/getFactorAnalysisProps";
import { FetchRiskData } from "@/pages/api/FetchRiskData";
import { FetchTickerData } from "@/pages/api/FetchTickerData";

export default function WhatWeServePage({ version_ppcv2, version, version_mc, initTickerData, initPortfolio, initPortfolioValue, riskData }) {
  const router = useRouter();
  const slug = router.query.slug;
  const [currentPage, setCurrentPage] = useState(null);

  useEffect(() => {
    if (slug === 'ppc') {
      setCurrentPage(<Ppc initPortfolio={initPortfolio} initPortfolioValue={initPortfolioValue} initTickerData={initTickerData} />);
    } else if (slug === 'ppcv2') {
      setCurrentPage(<Ppcv2 version={version_ppcv2} initPortfolio={initPortfolio} initPortfolioValue={initPortfolioValue} />);
    } else if (slug === 'ppcv3') {
      setCurrentPage(<Ppcv3 version={version_ppcv2} initPortfolio={initPortfolio} initPortfolioValue={initPortfolioValue} />);
    } else if (slug === 'riskcontribution') {
      setCurrentPage(<Riskcontribution />);
    } else if (slug === 'factor_analysis' && version === 1) {
      setCurrentPage(<FactorAnalysisV1 version={version} initPortfolio={initPortfolio} initPortfolioValue={initPortfolioValue} />);
    } else if (slug === 'factor_analysisv2' && version === 2) {
      setCurrentPage(<FactorAnalysisV2 version={version} initPortfolio={initPortfolio} initPortfolioValue={initPortfolioValue} />);
    } else if (slug === 'rw') {
      setCurrentPage(<Risk_Weather data={riskData} />); // Pass riskData as a prop to Risk_Weather
    } else if (slug === 'mc' && version_mc === 1) {
      setCurrentPage(<ForwardTest version={version_mc} initPortfolio={initPortfolio} initPortfolioValue={initPortfolioValue} />);
    } else if (slug === 'mcv2' && version_mc === 2) {
      setCurrentPage(<ForwardTestv2 version={version_mc} initPortfolio={initPortfolio} initPortfolioValue={initPortfolioValue} />);
    }
  }, [slug, version, version_mc, initPortfolio, initPortfolioValue, riskData, initTickerData, version_ppcv2]);

  return <>{currentPage}</>;
}

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Determine the version based on the slug
  const version = slug === 'factor_analysis' ? 1 : slug === 'factor_analysisv2' ? 2 : null;
  const version_mc = slug === 'mc' ? 1 : slug === 'mcv2' ? 2 : null;
  const version_ppcv2 = slug === 'ppcv2' || slug === 'ppcv3' ? 2 : null;

  // Call the utility function to get shared props
  const { initPortfolio, initPortfolioValue } = await getFactorAnalysisProps();

  let riskData = null;
  let initTickerData = null;
  if (slug === 'rw') {
    riskData = await FetchRiskData();
  }
  if (slug === 'ppc') {
    initTickerData = await FetchTickerData();
  }

  return {
    props: {
      version_ppcv2,
      version,
      version_mc,
      initTickerData,
      initPortfolio,
      initPortfolioValue,
      riskData, 
    },
  };
}
