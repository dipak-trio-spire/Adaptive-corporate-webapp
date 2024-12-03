import React, { useState } from 'react';
import styles from "@/styles/EnterpriseApi.module.scss";
import TagManager from "react-gtm-module";
import Header from "@/components/Header/Header";
import PortfolioShieldPrice from "../../components/PortfolioShieldPrice/PortfolioShieldPrice"
import RiskAnalytics from "../../components/RiskAnalytics/RiskAnalytics";
import MarketShiedOption from "../../components/MarketShieldOption/MarketShieldOption";
import MarketShieldPlus from '../../components/MarketShieldPlus/MarketShieldPlus';
import { useEffect } from "react";
import Image from 'next/image';
import userbg from "@/public/Assets/userbg.svg"

export default function EnterpriseApi() {

    const [activeTab, setActiveTab] = React.useState("Portfolio Shield Price");
    const [showPortfolioShieldPrice, setShowPortfolioShieldPrice] = React.useState(true);
    const [showMarketShieldOption, setShowMarketShieldOption] = React.useState(false);
    const [showRiskAnalytics, setShowRiskAnalytics] = React.useState(false);
    const [showMarketShieldPlus, setShowMarketShieldPlus] = React.useState(false);
    const [showPopup, setShowPopup] = React.useState(true);
    const [emailId, setEmailId] = React.useState("");
    const [fullName, setFullName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [signupFormErrors, setSignupFormErrors] = React.useState([]);
    const [checkUserCount, setCheckUserCount] = React.useState(0);
    const [checkUserDataFlag, setUserDataFlag] = React.useState(false);
    const [userData, setUserData] = React.useState([]);

    useEffect(() => {
        let data = JSON.parse(localStorage.getItem('user'));
        if (checkUserDataFlag === false && checkUserCount === 0) {
            if (data !== null) {
                var exp_flag = new Date().getTime().toString() > data.exp_date

                if (exp_flag) {
                    localStorage.removeItem('user');
                    setShowPopup(true);
                } else {
                    setUserData(data)
                    setShowPopup(false);
                }
            }
            setCheckUserCount(1);
            setUserDataFlag(true)
        }
      }, [checkUserDataFlag,checkUserCount])

    

    const onhandleClick = (item) => {
        if (item === "Portfolio Shield Price") {
            setShowPortfolioShieldPrice(true);
            setShowMarketShieldPlus(false);
            setShowMarketShieldOption(false);
            setShowRiskAnalytics(false);
        }
        else if (item === "Market Shield Option Contracts") {
            setShowMarketShieldOption(true);
            setShowPortfolioShieldPrice(false);
            setShowMarketShieldPlus(false);
            setShowRiskAnalytics(false);
        }
        else if (item === "Risk Analytics") {
            setShowPortfolioShieldPrice(false);
            setShowMarketShieldOption(false);
            setShowMarketShieldPlus(false);
            setShowRiskAnalytics(true);

        }
        else if (item === "Market Shield Plus") {
            setShowPortfolioShieldPrice(false);
            setShowMarketShieldOption(false);
            setShowRiskAnalytics(false);
            setShowMarketShieldPlus(true);
        }
        setActiveTab(item);
    };

    const validateForm = () => {
        let validFlag = true;
        let error = {};
        if (!fullName) {
            validFlag = false;
            error.fullName = "Please enter full name";
        }

        if (!emailId) {
            validFlag = false;
            error.emailId = "Please enter your email id";
        }

        if (fullName && !(/^[A-Za-z][A-Za-z0-9 ,._'-]+$/.test(fullName))) {
            validFlag = false;
            error.fullName = "Please enter your valid name.\nValid characters are: A-Z,a-b,0-9, space, comma, apostrophe, hyphen, underscore, dot";
        }
        if (emailId && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId))) {
            validFlag = false;
            error.emailId = "Please enter a valid email id";
        }
        setSignupFormErrors(error);
        return validFlag;
    }

    const submitUserSignup = () => {
        if (validateForm()) {
            let raw = {
                "fullName": fullName,
                "emailId": emailId,
                "phoneNumber": phoneNumber,
                "exp_date": new Date().setDate(new Date().getDate() + 30).toString()
            };
            localStorage.setItem('user', JSON.stringify(raw));
            TagManager.dataLayer({
                dataLayer: {
                    event: 'User Signup for API Console'
                },
            });
            setShowPopup(false);
            setUserData(raw);
        }
    }

    return (
        <>  
            <Header content="Adaptive Enterprise API"
                page_head="Enterprise API"
                description = "Adaptive Enterprise API for analysis of anonymized portfolios, based on target protection period & protection levels, as well as target risk levels & name-your-price hedging costs."
                keywords = "Adaptive, AdaptiveInvestmentSolutions, Adaptive Investment Solutions, Downside Protection, DownsideProtection, VIX, Implied Volatility, ImpliedVolatility, Market Risk, MarketRisk, Volatility Tax, VolatilityTax"
                show_info={false}
            />
            <div className="sectiondivide apisection">
                <div className='apilist'>
                    <a className={activeTab === "Portfolio Shield Price" ? "tablist active " : "tablist"} eventKey="Portfolio Shield Price" onClick={() => onhandleClick('Portfolio Shield Price')} >Portfolio Shield</a>
                    <a className={activeTab === "Market Shield Option Contracts" ? "tablist active " : "tablist"} eventKey="Market Shield Option Contracts" onClick={() => onhandleClick('Market Shield Option Contracts')} >Market Shield</a>
                    <a className={activeTab === "Market Shield Plus" ? "tablist active " : "tablist"} eventKey="Market Shield Plus" onClick={() => onhandleClick('Market Shield Plus')} >Market Shield Plus</a>
                    <a className={activeTab === "Risk Analytics" ? "tablist active " : "tablist"} eventKey="Risk Analytics" onClick={() => onhandleClick('Risk Analytics')} >Risk Analytics</a>


                </div>
                {showPortfolioShieldPrice &&
                    <PortfolioShieldPrice userData={userData} ></PortfolioShieldPrice>
                }
                {showMarketShieldOption &&
                    <MarketShiedOption userData={userData} ></MarketShiedOption>
                }
                {showRiskAnalytics &&
                    <RiskAnalytics userData={userData} ></RiskAnalytics>
                }
                {showMarketShieldPlus &&
                    <MarketShieldPlus userData={userData} ></MarketShieldPlus>
                }
            </div>
            
            {showPopup === true && (
                <div className="overlay">
                    <div className="pop-up apipop">
                        <div className='tickcon'>
                            <Image className="tick small" src={userbg} alt=''></Image>
                        </div>
                        <div className="popuptext">
                            <div className="userselection ">
                                <h1>Welcome to our API Console!</h1>
                                <p>Before you begin using it, kindly provide the necessary details below.</p>
                            </div>
                            <div className='inputcon'>
                                <input type="text" className="input-gray" placeholder="Your name *" onChange={(event) => setFullName(event.target.value)} />
                                <p className="error-message">{signupFormErrors.fullName}</p>
                            </div>
                            <div className='inputcon'>
                                <input type="text" className="input-gray" placeholder="Enter your email address *" onChange={(event) => setEmailId(event.target.value)} />
                                <p className="error-message">{signupFormErrors.emailId}</p>
                            </div>
                            <div className='inputcon'>
                                <input type="text" className="input-gray" placeholder="Enter your phone number" onChange={(event) => setPhoneNumber(event.target.value)} />
                                <p className="error-message">{signupFormErrors.phoneNumber}</p>
                            </div>
                            <button className="button" onClick={() => submitUserSignup()}>Submit</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
