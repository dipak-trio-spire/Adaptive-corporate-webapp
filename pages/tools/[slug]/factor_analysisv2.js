import React,{useState , useEffect} from "react";
import Header from "@/components/Header/Header";
import  FactorAnalysis  from '@/components/FactorAnalysis/FactorAnalysis';
import { portfolios } from "@/utilites/Constants";
import { getFactorAnalysisProps } from "@/utils/getFactorAnalysisProps";

function factor_analysis(props) {
    return (
        <>
            <Header content="Adaptive Factor Analysis"
                page_head="Factor Analysis"
                description=""
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
            
            />
            <FactorAnalysis {...props}/>
            
        </>
    )
}
// export async function getServerSideProps() {
//     // const initPortfolio = portfolios[Math.floor(Math.random() * portfolios.length)]['name']
//     const initPortfolio = portfolios[0]['name']
//     const {initPortfolioValue } = await getFactorAnalysisProps();
//     return {
//         props: {
//             initPortfolio,
//             initPortfolioValue,
//         },
//     };
// }


export default factor_analysis;
