import React from "react";
import { Helmet } from "react-helmet";
import AdvisorHome from "@/components/Advisor/AdvisorHome";
import AddUser from "@/components/AddUser/AddUser"
import Head from 'next/head';
export default function AdvisorMainScreen() {
    return (
        <>
            <Head>
                <title>Adaptive Delivers Risk Tools for Investors and Financial Advisors</title>
                <meta property="og:title" content="Adaptive Delivers Risk Tools for Investors and Financial Advisors" />
                <meta property="og:site_name" content="Adaptive Investments" />
                <meta property="og:description" content="Adaptive helps advisors and investors with personalized hedging, to play defense like the pros. We develop technologies to make high-end investment tools easy-to-use, cost-effective, and personalized for advisors and clients portfolios, including tax-smart rebalancing and downside protection." />
                <meta property="og:image" content={process.env.NEXT_PUBLIC_WEBSITE_URL + "/Assets/Adaptive-Platform-Illustration.png"} />
                <meta name="keywords" content="Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax" />
            </Head>
            <AdvisorHome />
            <AddUser showDetailsForm={true} />
        </>
    );
}
