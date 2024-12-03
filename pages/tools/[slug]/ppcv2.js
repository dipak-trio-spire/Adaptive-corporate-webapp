import React,{useState , useEffect} from "react";
import Header from "@/components/Header/Header";
import ShieldPricerv2_v3 from "@/components/ShieldPricer/ShieldPricer_v2_v3";
import { portfoliosWithManual } from "@/utilites/Constants";
import { FetchRiskData } from "@/pages/api/FetchRiskData";
import { FetchMarketShield } from "@/pages/api/FetchMarketShield";
import { FetchSelfAssemblyData } from "@/pages/api/FetchSelfAssemblyData";
import { FetchTickerData } from "@/pages/api/FetchTickerData";
import { useRouter } from 'next/router';
import { AllData} from "@/utils/fetchHelpers"

function ShieldPricerPagev2(props) {
    const router = useRouter();
  const { slug } = router.query;
  const [PPCv2, setPPCv2] = useState(null)

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!slug) {
      console.warn("No 'home' slug parameter found.");
      setPPCv2(null); 
      return;
    }
    const fetchData = async () => {
      try {
        const initialContent = await AllData(slug);
        console.log("initialContent" , initialContent)
        if (initialContent && initialContent.code !== 'no_page') {
          setPPCv2(initialContent.data);
        } else {
          setPPCv2(null);   
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setPPCv2(null); 
      }finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [slug]);
    return (
        <>
            <Header content={PPCv2?.seo_meta.meta_title}
                page_head="Portfolio Protection Calculator"
                show_info={true}                
                description={PPCv2?.seo_meta.meta_description}
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
                info="Estimate the cost to dial down the risk of popular model portfolios, based on your selection of protection level and protection period. We welcome your suggestions for this new tool !"
            />
            <ShieldPricerv2_v3 {...props} PPCv2={PPCv2} />
        </>
    )
}

export async function getServerSideProps() {
    // const initPortfolio = portfolios[Math.floor(Math.random() * portfolios.length)]['name']
    const initTickerData = await FetchTickerData();
    const initPortfolio = portfoliosWithManual[0]['name']
    const initPortfolioValue = 100000.00
    // const initMarketShieldData = await FetchMarketShield(initPortfolioValue, initPortfolio);
    // const initSelfAssemblyData = await FetchSelfAssemblyData(initPortfolioValue, initPortfolio);
    // const initRiskData = await FetchRiskData();
    const version = 2
    return {
        props: {
            initPortfolio,
            initPortfolioValue,
            initTickerData,
            // initMarketShieldData,
            // initSelfAssemblyData,
            // initRiskData,
            version
        },
    };
}

export default ShieldPricerPagev2;
