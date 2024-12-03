import React, { useState, useEffect } from "react";
import Header from "@/components/Header/Header";
import { portfolios } from "@/utilites/Constants";
import AddUser from "@/components/AddUser/AddUser";
import { useRouter } from "next/router";
import { AllData } from "@/utils/fetchHelpers";
import FactorAnalysis from "@/components/FactorAnalysis/FactorAnalysis";
import { getFactorAnalysisProps } from "@/utils/getFactorAnalysisProps";

function FactorAnalysisPage(props) {
  const router = useRouter();
  const { slug } = router.query;
  const [factorAnalysisData, setFactorAnalysisData] = useState(null);
  useEffect(() => {
    if (!slug) {
      console.warn("No 'home' slug parameter found.");
      setFactorAnalysisData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        if (initialContent && initialContent.code !== "no_page") {
          setFactorAnalysisData(initialContent.data);
        } else {
          setFactorAnalysisData(null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFactorAnalysisData(null);
      }
    };

    fetchData();
  }, [slug]);

  return (
    <>
      <Header
        content={factorAnalysisData?.seo_meta.meta_title}
        page_head="Factor Analysis"
        description={factorAnalysisData?.seo_meta.meta_description}
        keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
      />
      <FactorAnalysis {...props} Factor_analysisData={factorAnalysisData}  />
      <AddUser showDetailsForm={true} />
    </>
  );
}

// export async function getServerSideProps() {
//     const { initPortfolio, initPortfolioValue } = await getFactorAnalysisProps(); // Use the utility function
  
//     return {
//       props: {
//         initPortfolio,
//         initPortfolioValue,
//       },
//     };
//   }

export default FactorAnalysisPage;
