import React,{useState , useEffect} from "react";
import Header from "@/components/Header/Header";
import ForwardTest from "@/components/ForwardTest/ForwardTest";
import { portfolios } from "@/utilites/Constants";
import AddUser from "@/components/AddUser/AddUser";
import { useRouter } from "next/router";
import { AllData } from "@/utils/fetchHelpers";

function ForwardTestScreen(props) {
    const router = useRouter();
    const { slug } = router.query;
    const [ForwardTestData, setForwardTestData] = useState(null);
    useEffect(() => {
      if (!slug) {
        setForwardTestData(null);
        return;
      }
  
      const fetchData = async () => {
        try {
          const initialContent = await AllData(slug);
          if (initialContent && initialContent.code !== "no_page") {
            setForwardTestData(initialContent.data);
          } else {
            setForwardTestData(null);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setForwardTestData(null);
        }
      };
  
      fetchData();
    }, [slug]);
    return (
        <>
            <Header content={ForwardTestData?.seo_meta.meta_title}
                page_head="Forward Test"
                description={ForwardTestData?.seo_meta.meta_description}
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"            
            />
            <ForwardTest {...props} ForwardTestDatas={ForwardTestData}/>
            {
                props.version === 1 &&
            <AddUser showDetailsForm={true}  />
            }
        </>
    )
}

// export async function getServerSideProps() {
//     // const initPortfolio = portfolios[Math.floor(Math.random() * portfolios.length)]['name']
//     const initPortfolio = portfolios[0]['name']
//     const version = 1
//     return {
//         props: {
//             initPortfolio,
//             version
//         },
//     };
// }

export default ForwardTestScreen;
