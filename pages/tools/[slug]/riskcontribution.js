import React from "react";
import Header from "@/components/Header/Header";
import RiskContribution from "@/components/RiskContribution/RiskContribution";
import HaloRiskContribution from "@/components/RiskContribution/HaloRiskContribution";
import { portfolios } from "@/utilites/Constants";
import { FetchTickerData } from "@/pages/api/FetchTickerData";
import { withHostname } from '@/hocs/withHostname';

function RiskContributionScreen({ hostLabel, ...otherProps }) {

    if (!hostLabel) {
        return <div className="blank-screen"></div>;
    }

    return (
        <>
            <Header content={hostLabel === "halo" ? "Portfolio Risk Contribution" : "Adaptive Risk Contribution"}
                page_head="Portfolio Risk Contribution"
                show_info={false}
                description="Chart the risk contribution of individual holdings in a portfolio, for better understanding of portfolio risk including the benefits of diversification even among volatile holdings"
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
                hostname={hostLabel}
            />
            {hostLabel === "halo" ? (
                <HaloRiskContribution {...otherProps} hostname={hostLabel} />
            ) : (
                <RiskContribution {...otherProps} />
            )}
        </>
    )
}

export async function getServerSideProps(context) {
    const initTickerData = await FetchTickerData();
    // const initPortfolio = portfolios[Math.floor(Math.random() * portfolios.length)]['name']
    const initPortfolio = portfolios[0]['name']
    const initPortfolioValue = 100000.00

    return {
        props: {
            initPortfolio,
            initPortfolioValue,
            initTickerData
        },
    };
}

export default withHostname(RiskContributionScreen);