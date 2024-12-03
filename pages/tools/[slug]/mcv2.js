import React from "react";
import Header from "@/components/Header/Header";
import ForwardTest from "@/components/ForwardTest/ForwardTest";
import { portfolios } from "@/utilites/Constants";

function ForwardTestScreenV2(props) {
    return (
        <>
            <Header content="Adaptive Forward Test"
                page_head="Forward Test"
                description="Quantify downside-protection benefits with Adaptive’s Monte Carlo simulation of possible future returns and their probabilities. "
                keywords="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"            
            />
            <ForwardTest {...props} />
        </>
    )
}

export async function getServerSideProps() {
    // const initPortfolio = portfolios[Math.floor(Math.random() * portfolios.length)]['name']
    const initPortfolio = portfolios[0]['name']
    const version = 2
    return {
        props: {
            initPortfolio,
            version
        },
    };
}

export default ForwardTestScreenV2;