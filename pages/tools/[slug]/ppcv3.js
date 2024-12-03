import React from "react";
import Header from "@/components/Header/Header";
import ShieldPricerv2_v3 from "@/components/ShieldPricer/ShieldPricer_v2_v3";
import { portfoliosWithManual } from "@/utilites/Constants";
import { FetchRiskData } from "@/pages/api/FetchRiskData";
import { FetchMarketShield } from "@/pages/api/FetchMarketShield";
import { FetchRiskandProjection } from "@/pages/api/FetchRiskandProjection";
import { FetchSelfAssemblyData } from "@/pages/api/FetchSelfAssemblyData";
import { FetchTickerData } from "@/pages/api/FetchTickerData";

function ShieldPricerPagev3(props) {
        
    return (
        <>
            <Header content="Adaptive Portfolio Protection Calculator"
                page_head="Portfolio Protection Calculator"
                show_info={true}                
                description="Measure risk and estimate the cost of downside protection for model portfolios with Adaptive’s Portfolio Protection Calculator. "
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
                info="Estimate the cost to dial down the risk of popular model portfolios, based on your selection of protection level and protection period. We welcome your suggestions for this new tool !"
            />
            <ShieldPricerv2_v3 {...props} />
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
    const version = 3
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

export default ShieldPricerPagev3;
