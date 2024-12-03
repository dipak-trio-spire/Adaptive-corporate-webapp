import React,{useState , useEffect} from "react";
import Header from "@/components/Header/Header";
import RiskWeather from "@/components/RiskWeather/RiskWeather";
import { FetchRiskData } from "@/pages/api/FetchRiskData";
import { useRouter } from "next/router";
import { AllData } from "@/utils/fetchHelpers";

function RiskWeatherScreen(props) {
    const router = useRouter();
    const { slug } = router.query;
    const [RiksWeathersData, setRiksWeathersData] = useState(null);
    useEffect(() => {
      if (!slug) {
        setRiksWeathersData(null);
        return;
      }
  
      const fetchData = async () => {
        try {
          const initialContent = await AllData(slug);
          if (initialContent && initialContent.code !== "no_page") {
            setRiksWeathersData(initialContent.data);
          } else {
            setRiksWeathersData(null);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setRiksWeathersData(null);
        }
      };
  
      fetchData();
    }, [slug]);

    return (
        <>
            <Header content={RiksWeathersData?.seo_meta.meta_title}
                page_head="Risk Weather Tool"
                description={RiksWeathersData?.seo_meta.meta_description}
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
            />
            <RiskWeather {...props} RiksWeathersDatas={RiksWeathersData} />
        </>
    )
}

export async function getServerSideProps() {
    const data = await FetchRiskData();
    return {
        props: {
            data,
        },
    };
}

export default RiskWeatherScreen;