import React,{useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import ShieldPricer from "@/components/ShieldPricer/ShieldPricer";
import { portfoliosWithManual } from "@/utilites/Constants";
import { FetchTickerData } from "@/pages/api/FetchTickerData";
import { useRouter } from 'next/router';
import { AllData} from "@/utils/fetchHelpers"

function ShieldPricerPage(props) {
    const router = useRouter();
    const { slug } = router.query;
    const [PPC, setPPC] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!slug) {
        console.warn("No 'home' slug parameter found.");
        setPPC(null); 
        return;
      }
      const fetchData = async () => {
        try {
          const initialContent = await AllData(slug);
          if (initialContent && initialContent.code !== 'no_page') {
            setPPC(initialContent.data);
          } else {
            setPPC(null);   
          }
        } catch (error) {
          console.error('Error fetching data:', error);
          setPPC(null); 
        }finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [slug]);

    return (
        <>
            <Header content={PPC?.seo_meta.meta_title}
                page_head="Portfolio Protection Calculator"
                show_info={true}
                description={PPC?.seo_meta.meta_description}
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
                info="Estimate the cost to dial down the risk of popular model portfolios, based on your selection of protection level and protection period. We welcome your suggestions for this new tool !"
            />
            <ShieldPricer {...props} PPC={PPC}/>
        </>
    )
}

// export async function getServerSideProps() {
//     const initTickerData = await FetchTickerData();
//     const initPortfolio = portfoliosWithManual[0]['name'];
//     const initPortfolioValue = 100000.00;

//     return {
//         props: {
//             initPortfolio,
//             initPortfolioValue,
//             initTickerData
//         }
//     };
// }

export default ShieldPricerPage;
