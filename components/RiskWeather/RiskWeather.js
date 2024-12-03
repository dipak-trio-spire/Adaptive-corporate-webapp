import React, { useState } from "react";
import Link from "next/link";
import CustomPopup from "@/components/Popup/Popup";
import VixDial from "@/components/VixDial/VixDial";
import VIXGraph from "@/components/VIXGraph/VIXGraph";
import AddUser from "@/components/AddUser/AddUser";
import { addZeroes } from "../../utilites/AddZeros";
import { newConvertDate } from "../../utilites/ConvertDate";
import { GetRiskColor, GetRiskHeaderColor } from "../../utilites/RiskColor";
import PageLoader from '@/components/PageLoader/PageLoader';

function RiskWeather({ data }) {

    const [bdopen, setBdOpen] = React.useState(true);
    const [popupState, setPopupState] = React.useState(false);
    const [popupMessage, setPopupMessage] = React.useState("");
    const [popupTitle, setPopupTitle] = React.useState("");
    const [alertType, setAlertType] = React.useState("");
    const [vixData, setVixData] = React.useState();
    const [GraphData, setGraphData] = React.useState([]);
    const [selectedPeriod, setSelectedPeriod] = React.useState("1_month");
    const [LowerBound, setLowerBound] = React.useState();
    const [MesgStatus, setMesgStatus] = React.useState();
    const [MesgContent, setMesgContent] = React.useState();
    const [MesgHeader, setMesgHeader] = React.useState();
    const [headerColor, setHeaderColor] = React.useState();
    const [statusColor, setStatusColor] = React.useState();
    const [VixClosePrice, setVixClosePrice] = React.useState(0);
    const [DialColor, setDialColor] = React.useState();
    const [selectedPeriodContent, setSelectedPeriodContent] = React.useState("one month");
    const [MesgDscUp, setMesgDscUp] = React.useState();
    const [MesgDscDown, setMesgDscDown] = React.useState();
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [show5, setShow5] = useState(false);
    const [show6, setShow6] = useState(false);

    const option = [
        { value: "1_week", label: "1 Week", content: "one week" },
        { value: "1_month", label: "1 Month", content: "one month" },
        { value: "3_month", label: "3 Months", content: "three months" },
        { value: "6_month", label: "6 Months", content: "six months" },
        { value: "12_month", label: "1 Year", content: "one year" },

    ];

    const [updates, setUpdates] = React.useState({
        dailyUpdates: false,
        statusUpdates: false
    });

    React.useEffect(() => {
    }, [updates]);

    const handleUpdatesChange = (e) => {
        const value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUpdates({ ...updates, [e.target.name]: value });
    };

    const refreshPage = () => {
        window.location.reload();
    };

    function changePropsStatus(val) {
        if (val) {
            refreshPage()
        }
    }

    const changePeriod = (period, content) => {
        setSelectedPeriod(period);
        setSelectedPeriodContent(content)
        setVixData(GraphData[period]["risk_value"]);
        setLowerBound(Math.min(...GraphData[period]["risk_value"]["closeprice"]));
        setMesgStatus(GraphData[period]["message_status"]);
        setMesgContent(GraphData[period]["message_text"]);
        setStatusColor(GetRiskColor(GraphData[period]["message_status"]));
    };

    React.useEffect(() => {
        setBdOpen(true);
        if (data !== false && data !== 0) {
            setGraphData(data);
            setVixData(data[selectedPeriod]["risk_value"]);
            const lastClosePrice = data[selectedPeriod]["risk_value"]["closeprice"][data[selectedPeriod]["risk_value"]["closeprice"].length - 1]
            const status = GetRiskHeaderColor(lastClosePrice)
            setLowerBound(Math.min(...data[selectedPeriod]["risk_value"]["closeprice"]));
            setMesgStatus(data[selectedPeriod]["message_status"]);
            setMesgContent(data[selectedPeriod]["message_text"]);
            setMesgHeader(status["status_text"]);
            setMesgDscUp(status["status_description_up"]);
            setMesgDscDown(status["status_description_down"]);
            setVixClosePrice(lastClosePrice);
            setHeaderColor(status["status_color"]);
            setDialColor(status["color_hash"]);
            setStatusColor(GetRiskColor(data[selectedPeriod]["message_status"]));
            setBdOpen(false);
        } else if (data === false) {
            setBdOpen(false);
            setPopupMessage(
                "Unable to show the data. Please try again later"
            );
            setPopupTitle("ERROR");
            setAlertType("ERROR");
            setPopupState(true);
        } else if (data === 0) {
            setBdOpen(false);
            setPopupState(true);
            setPopupTitle("ERROR");
            setAlertType("ERROR");
            setPopupMessage(
                "This is a technology preview. The service is not available during some market data updates. Please try again in 30 minutes."
            );
        }
    }, [data]);

    return (
        <>
            <PageLoader bdopen={bdopen} />
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title={popupTitle}
                content={popupMessage}
                alertType={alertType}
            />
            <VixDial VixClosePrice={addZeroes(Number(parseFloat(VixClosePrice).toFixed(2)))}
                headerColor={headerColor}
                MesgHeader={MesgHeader}
                DialColor={DialColor} />
            <div className="weatherstat">
                <div className="stat">
                    <h3>Risk Weather is <span style={headerColor}>{MesgHeader}</span></h3>
                </div>
                <p>
                    <span>
                        {MesgDscUp}<br></br>{MesgDscDown} <a className="ai-link" href="#faq1">Learn more</a>.
                    </span>
                </p>
            </div>

            <div className="sectiondivide sectioncol ptsec pb0">
                <div className="sec-title">
                    <h3 class="sec-head small left">CBOE Volatility Index (VIX) Chart</h3>
                    <span className="indicator">{addZeroes(Number(parseFloat(VixClosePrice).toFixed(2)))}</span>
                </div>
            </div>
            <div className="sectiondivide sectioncol ptsec pt0">
                <div className="duration">
                    {option.map((value, i) => (
                        <button className={selectedPeriod === value.value ? "selected" : ""}
                            value={value.value}
                            key={i}
                            onClick={(event) => changePeriod(event.target.value, value.content)}>{value.label}</button>
                    ))}
                </div>
                <div className="GraphHolder">
                    {GraphData.length === 0 ?
                        (<></>
                        ) : (
                            <VIXGraph GraphData={vixData} />
                        )}
                </div>
                <br/>
                <div className="weatherstat warning">
                    <p>All price quotes as of market close. Most recent price quote is for previous trading day</p>
                </div>
                <div className="weatherstat part2">
                    <h4>Risk weather is <span>{MesgStatus?.toLowerCase()}</span> relative to {selectedPeriodContent} ago.</h4>
                    <p>{MesgContent}</p>
                </div>
                <div className="signupalert" id="setalert">
                    <h3>Set an alert now</h3>
                    <p>We will tell you when Market Risk changes straight to your inbox.</p>
                    <div className="reminder">
                        <h4>Daily Updates</h4>
                        <p>Receive daily email about VIX movement and its effect on protection costs</p>
                        <label class="checkcon">
                            <input type="checkbox" name="dailyUpdates" defaultChecked={updates.dailyUpdates} onChange={(e) => handleUpdatesChange(e)} />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <div className="reminder">
                        <h4>Status UPDATES</h4>
                        <p>Receive an email when the Risk Weather status changes</p>
                        <label class="checkcon">
                            <input type="checkbox" name="statusUpdates" defaultChecked={updates.statusUpdates} onChange={(e) => handleUpdatesChange(e)} />
                            <span class="checkmark"></span>
                        </label>
                    </div>
                    <AddUser singupFor="risk" updates={updates} onChange={changePropsStatus} buttonText="Get Risk Alerts" />
                </div>
                <p>This is NOT investment advice. Consult a licensed broker for options trading information and approvals.</p>
                <div className="weatherstat part2">
                    <h4>Adaptive helps financial advisors & investors with personalized hedging.</h4>
                    <p>Our one-of-a-kind mission is to smooth out the ride—and level the playing field—so investors stay invested for long-term growth, with tax-smart downside protection which is otherwise the province of ultra high-net-worth clients. <a className="ai-link" href="/advisor" target="_blank">Learn more</a>.</p>
                </div>
            </div>
            <div className="sectiondivide section-col ptsec">
                <h3 className="sec-head">Because buy-and-hold doesn&apos;t work for everyone all the time.</h3>
                <div className="iconcon">
                    <div className="iconset">
                        <span>
                            <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.5831 31.6255L34.5831 46.5005C33.0831 48.0005 32.3331 49.8755 32.3331 52.0005C32.3331 54.2505 33.2081 56.1255 34.7081 57.6255C36.2081 59.1255 38.0831 60.0005 40.3331 60.0005C42.5831 60.0005 44.4581 59.1255 45.9581 57.6255C47.4581 56.1255 48.2081 54.2505 48.3331 52.0005C48.2081 49.7505 47.4581 47.8755 45.9581 46.3755C44.4581 44.8755 42.5831 44.1255 40.3331 44.0005C38.7081 44.0005 37.3331 44.5005 36.0831 45.2505L24.0831 30.2505C23.5831 30.0005 23.0831 30.0005 22.5831 30.2505C22.2081 30.7505 22.2081 31.1255 22.5831 31.6255ZM40.3331 58.0005C38.5831 58.0005 37.2081 57.3755 36.0831 56.2505C34.9581 55.1255 34.3331 53.7505 34.3331 52.0005C34.3331 50.1255 35.0831 48.6255 36.5831 47.3755H36.4581C37.5831 46.5005 38.8331 46.0005 40.3331 46.0005C41.9581 46.1255 43.3331 46.7505 44.5831 47.7505C45.5831 49.0005 46.2081 50.3755 46.3331 52.0005C46.2081 53.7505 45.5831 55.1255 44.5831 56.2505C43.3331 57.3755 41.9581 58.0005 40.3331 58.0005ZM38.3331 24.0005C38.3331 25.2505 39.0831 26.0005 40.3331 26.0005C41.5831 26.0005 42.2081 25.2505 42.3331 24.0005C42.2081 22.7505 41.5831 22.1255 40.3331 22.0005C39.0831 22.1255 38.3331 22.7505 38.3331 24.0005ZM59.3331 31.0005C59.2081 29.7505 58.5831 29.1255 57.3331 29.0005C56.0831 29.1255 55.3331 29.7505 55.3331 31.0005C55.3331 32.2505 56.0831 33.0005 57.3331 33.0005C58.5831 33.0005 59.2081 32.2505 59.3331 31.0005ZM62.3331 48.0005C62.3331 49.2505 63.0831 50.0005 64.3331 50.0005C65.5831 50.0005 66.2081 49.2505 66.3331 48.0005C66.2081 46.7505 65.5831 46.1255 64.3331 46.0005C63.0831 46.1255 62.3331 46.7505 62.3331 48.0005ZM18.3331 48.0005C18.2081 46.7505 17.5831 46.1255 16.3331 46.0005C15.0831 46.1255 14.3331 46.7505 14.3331 48.0005C14.3331 49.2505 15.0831 50.0005 16.3331 50.0005C17.5831 50.0005 18.2081 49.2505 18.3331 48.0005ZM13.5831 68.0005H67.0831C69.2081 68.0005 70.8331 67.1255 71.9581 65.2505C74.7081 60.1255 76.2081 54.3755 76.3331 48.0005C76.2081 41.3755 74.5831 35.3755 71.4581 29.8755C68.2081 24.5005 63.8331 20.1255 58.4581 16.8755C52.9581 13.7505 46.9581 12.1255 40.3331 12.0005C33.5831 12.1255 27.5831 13.7505 22.2081 16.8755C16.7081 20.1255 12.4581 24.5005 9.20813 29.8755C5.95813 35.3755 4.33313 41.3755 4.33313 48.0005C4.33313 54.3755 5.83313 60.1255 8.70813 65.2505C9.70813 67.1255 11.3331 68.0005 13.5831 68.0005ZM6.33313 48.0005H6.20813C6.20813 41.7505 7.83313 36.0005 10.8331 30.8755C13.8331 25.7505 17.9581 21.6255 23.0831 18.6255C28.2081 15.6255 33.9581 14.1255 40.2081 14.0005C46.5831 14.1255 52.3331 15.6255 57.4581 18.6255C62.5831 21.6255 66.7081 25.7505 69.7081 30.8755C72.7081 36.0005 74.2081 41.7505 74.3331 48.0005C74.2081 54.0005 72.8331 59.5005 70.2081 64.2505C69.4581 65.3755 68.4581 66.0005 67.0831 66.0005H13.5831C12.0831 66.0005 11.0831 65.3755 10.4581 64.2505C7.70813 59.5005 6.33313 54.0005 6.33313 48.0005Z" fill="#60034C" />
                            </svg>
                        </span>
                        <h5>Excessive or unwanted risk.</h5>
                    </div>
                    <div className="iconset">
                        <span>
                            <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M42.3809 38.0005H68.5059C69.5059 38.0005 70.1309 37.3755 70.2559 36.1255L70.3809 36.0005C70.2559 30.7505 69.0059 26.1255 66.5059 21.8755C64.0059 17.6255 60.7559 14.3755 56.5059 11.8755C52.2559 9.37549 47.6309 8.12549 42.3809 8.00049H42.2559C41.0059 8.12549 40.3809 8.75049 40.3809 9.87549V36.0005C40.3809 37.2505 41.1309 38.0005 42.3809 38.0005ZM68.3809 36.0005H42.3809V10.0005C49.6309 10.2505 55.7559 12.7505 60.7559 17.6255C65.6309 22.6255 68.1309 28.7505 68.3809 36.0005ZM34.3809 14.2505C34.2559 13.0005 33.5059 12.2505 32.1309 12.2505C24.6309 13.5005 18.6309 16.7505 13.8809 22.2505C9.00586 27.7505 6.50586 34.2505 6.38086 42.0005C6.38086 47.6255 7.75586 52.6255 10.5059 57.1255C13.1309 61.6255 16.7559 65.2505 21.2559 67.8755C25.7559 70.6255 30.7559 72.0005 36.3809 72.0005C42.8809 72.0005 48.7559 70.1255 53.7559 66.5005C54.7559 65.6255 54.7559 64.6255 54.0059 63.6255L34.3809 44.0005V14.2505ZM33.0059 45.3755L52.5059 64.8755C47.7559 68.1255 42.3809 69.8755 36.3809 70.0005C31.1309 70.0005 26.3809 68.6255 22.2559 66.1255C18.0059 63.7505 14.6309 60.3755 12.2559 56.1255C9.75586 52.0005 8.38086 47.2505 8.38086 42.0005C8.50586 34.8755 10.7559 28.7505 15.2559 23.6255C19.7559 18.6255 25.3809 15.5005 32.3809 14.2505V44.0005C32.3809 44.6255 32.5059 45.1255 33.0059 45.3755ZM64.8809 63.8755C69.8809 59.2505 72.8809 53.3755 74.1309 46.1255C74.1309 44.8755 73.3809 44.2505 72.1309 44.0005H47.2559C46.2559 44.1255 45.6309 44.5005 45.3809 45.2505C45.0059 46.0005 45.1309 46.7505 45.7559 47.3755L62.2559 63.8755C63.0059 64.6255 63.8809 64.6255 64.8809 63.8755ZM63.6309 62.3755L47.2559 46.0005H72.1309C71.0059 52.5005 68.1309 58.0005 63.6309 62.3755Z" fill="#60034C" />
                            </svg>
                        </span>
                        <h5>Concentrated positions.</h5>
                    </div>
                    <div className="iconset">
                        <span>
                            <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.4286 59.0005V13.0005C10.3036 12.5005 9.92859 12.1255 9.42859 12.0005C8.80359 12.1255 8.42859 12.5005 8.42859 13.0005V59.0005C8.42859 61.6255 9.30359 63.7505 11.0536 65.3755C12.6786 67.1255 14.8036 68.0005 17.4286 68.0005H71.4286C71.9286 68.0005 72.3036 67.6255 72.4286 67.0005C72.3036 66.5005 71.9286 66.1255 71.4286 66.0005H17.4286C15.4286 66.0005 13.6786 65.2505 12.4286 64.0005C11.1786 62.7505 10.4286 61.0005 10.4286 59.0005ZM52.4286 52.0005H67.4286C67.9286 52.0005 68.3036 51.6255 68.4286 51.0005V35.8755C68.3036 35.3755 67.9286 35.0005 67.4286 34.8755C66.8036 35.0005 66.4286 35.3755 66.4286 35.8755V48.6255L45.1786 27.2505C44.6786 27.0005 44.1786 27.0005 43.6786 27.2505L32.4286 38.6255L21.1786 27.2505C20.6786 27.0005 20.1786 27.0005 19.6786 27.2505C19.3036 27.7505 19.3036 28.2505 19.6786 28.7505L31.6786 40.7505C32.1786 41.1255 32.6786 41.1255 33.1786 40.7505L44.4286 29.3755L65.0536 50.0005H52.4286C51.8036 50.1255 51.4286 50.5005 51.4286 51.0005C51.4286 51.6255 51.8036 52.0005 52.4286 52.0005Z" fill="#60034C" />
                            </svg>
                        </span>
                        <h5>Panic or fear of market downturns.</h5>
                    </div>
                    <div className="iconset">
                        <span>
                            <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M75.3513 25.7505C76.1013 26.6255 76.4763 27.5005 76.4763 28.5005C76.4763 29.5005 76.1013 30.3755 75.3513 31.1255L48.8513 57.6255C48.6013 57.8755 48.4763 57.8755 48.2263 57.8755L37.9763 60.0005H36.2263H34.4763C34.2263 60.0005 33.9763 60.0005 33.7263 59.7505L30.4763 56.3755L27.2263 59.7505C26.4763 60.2505 25.9763 60.1255 25.6013 59.3755L21.4763 49.6255L17.3513 59.3755C17.1013 59.8755 16.8513 60.0005 16.4763 60.0005H13.4763C12.8513 60.0005 12.4763 59.6255 12.4763 59.0005C12.4763 58.5005 12.8513 58.1255 13.4763 58.0005H15.8513L19.6013 48.8755C19.9763 48.1255 20.6013 47.7505 21.4763 47.7505C22.2263 47.7505 22.8513 48.1255 23.3513 48.8755L26.8513 57.2505L29.1013 55.0005C29.9763 54.2505 30.8513 54.2505 31.8513 55.0005L34.8513 58.0005H36.4763L38.6013 48.2505C38.6013 48.0005 38.6013 47.8755 38.8513 47.6255L65.3513 21.1255C66.1013 20.3755 66.9763 20.0005 67.9763 20.0005C68.9763 20.0005 69.8513 20.3755 70.7263 21.1255L75.3513 25.7505ZM47.6013 56.0005L67.3513 36.2505L60.2263 29.1255L40.4763 48.8755L38.7263 57.7505L47.6013 56.0005ZM73.9763 29.7505C74.6013 29.0005 74.6013 28.1255 73.9763 27.2505L69.2263 22.5005C68.3513 21.8755 67.6013 21.8755 66.8513 22.5005L61.6013 27.7505L68.7263 34.8755L73.9763 29.7505ZM51.4763 62.0005C51.9763 62.1255 52.3513 62.5005 52.4763 63.0005V64.0005C52.3513 66.2505 51.6013 68.1255 50.1013 69.6255C48.6013 71.1255 46.7263 72.0005 44.4763 72.0005H12.4763C10.2263 72.0005 8.35126 71.1255 6.85126 69.6255C5.35126 68.1255 4.47626 66.2505 4.47626 64.0005V16.0005C4.47626 13.7505 5.35126 11.8755 6.85126 10.3755C8.35126 8.87549 10.2263 8.12549 12.4763 8.00049H30.8513C31.8513 8.00049 32.8513 8.37549 33.6013 9.12549L51.3513 26.8755C52.1013 27.6255 52.4763 28.6255 52.4763 29.6255C52.4763 29.8755 52.3513 30.0005 52.1013 30.0005H35.4763C33.9763 30.0005 32.8513 29.5005 31.9763 28.5005C30.9763 27.6255 30.4763 26.5005 30.4763 25.0005V10.0005H12.4763C10.7263 10.1255 9.35126 10.7505 8.22626 11.7505C7.10126 13.0005 6.47626 14.3755 6.47626 16.0005V64.0005C6.47626 65.7505 7.10126 67.1255 8.22626 68.2505C9.35126 69.3755 10.7263 70.0005 12.4763 70.0005H44.4763C46.1013 70.0005 47.4763 69.3755 48.7263 68.2505C49.7263 67.1255 50.3513 65.7505 50.4763 64.0005V63.0005C50.4763 62.5005 50.8513 62.1255 51.4763 62.0005ZM32.4763 10.8755V25.0005C32.6013 26.8755 33.6013 27.8755 35.4763 28.0005H49.6013L32.4763 10.8755Z" fill="#60034C" />
                            </svg>
                        </span>
                        <h5>Risk management.</h5>
                    </div>
                </div>
            </div>
            <div className="sectiondivide sectioncol ptsec">
                <h3 className="sec-head">Want to see downside protection personalized for your own portfolios?<br></br>Sign up for the <a className="ai-link" target="_blank" href="https://app2.adaptive-investments.com/advisorsignup">Free Trial</a> for more features, including call writing for income.</h3>
                <p>Measure risk and estimate the cost of downside protection for model portfolios with Adaptive’s new <Link className="ai-link" href="/tools/ppc">Portfolio Protection Calculator.</Link></p>
            </div>
            <div className="sectiondivide sectioncol ptsec">
                <h3 className="sec-head">Risk Weather FAQ (Frequently Asked Questions)</h3>
                <div className="faqcon">
                    <div className="faq" id="faq1">
                        <h4 onClick={() => setShow(!show)}>1. What is Risk Weather? {show && <span className="minus">-</span>} {!show && <span>+</span>}</h4>
                        {show && <div className="content">
                            <p>Adaptive Risk Weather is a broad gauge of whether downside protection is more or less affordable based on market conditions: when Risk Weather is ‘Low’ or ‘Medium’, the cost of downside protection tends to be lower, as compared to when Risk Weather is ‘High’ or ‘Very High’.</p>
                            <p>Risk Weather measures the market’s expectations for price movements, based on the price premium and implied volatility of publicly traded stock options. Risk Weather communicates if market seas are expected to be calm or stormy, as reflected in the cost of downside protection (‘put options’ are more expensive if danger feared) and the premium which can be charged for selling upside protection (‘call options’ are also more expensive if greater volatility expected).</p>
                            <p>We currently use the VIX as our measure, though this may be refined further in the future. The VIX, often called the ‘fear index’ or ‘fear gauge’, is roughly a measure of the implied volatility of the S&P 500 for the coming 30 days, as calculated from the price of publicly traded options on the S&P 500.</p>
                            <p>Read more about ‘implied volatility’ and the VIX at <a className="ai-link" target="_blank" href="https://en.wikipedia.org/wiki/VIX">Wikipedia</a>, <a className="ai-link" target="_blank" href="https://www.investopedia.com/terms/v/vix.asp">Investopedia</a>, and the <a className="ai-link" target="_blank" href="https://www.cboe.com/tradable_products/vix/">Chicago Board Options Exchange</a>. Read more about the S&P 500 at <a className="ai-link" target="_blank" href="https://en.wikipedia.org/wiki/S%26P_500">Wikipedia</a>, <a className="ai-link" target="_blank" href="https://www.investopedia.com/terms/s/sp500.asp">Investopedia</a>, and <a className="ai-link" target="_blank" href="https://www.spglobal.com/spdji/en/indices/equity/sp-500/#overview">S&P Dow Jones Indices</a>.</p>
                        </div>}
                    </div>
                    <div className="faq">
                        <h4 onClick={() => setShow2(!show2)}>2. Can I automate Risk Weather alerts? {show2 && <span className="minus">-</span>} {!show2 && <span>+</span>}</h4>
                        {show2 && <div className="content">
                            <p>Yes, you can select Risk Weather alerts in two forms, for Daily Update email delivery, and also for less frequent Status Update, also email delivery, when the Risk Weather changes, for example from ‘Medium’ to ‘High’. <a className="ai-link" href="#setalert">Set an alert now</a></p>
                        </div>}
                    </div>
                    <div className="faq">
                        <h4 onClick={() => setShow3(!show3)}>3. What defines the Risk Weather status, from ‘Low’ and ‘Medium’ to ‘High’ and ‘Very High’? {show3 && <span className="minus">-</span>} {!show3 && <span>+</span>}</h4>
                        {show3 && <div className="content">
                            <p>Adaptive currently uses an absolute scale for Risk Weather status, based on the <a className="ai-link" href="#faq1">Risk Weather definition:</a></p>
                            <div className="tablecon">
                                <table cellSpacing="0">
                                    <tr>
                                        <th>Risk Weather</th>
                                        <th>VIX</th>
                                        <th>1990-2022</th>
                                        <th>Notes</th>
                                    </tr>
                                    <tr>
                                        <td style={{ color: '#45AD42' }}>Low</td>
                                        <td>0 to 15</td>
                                        <td>34%</td>
                                        <td>VIX 15 is Medium</td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: '#FFA654' }}>Medium</td>
                                        <td>15 to 20</td>
                                        <td>28%</td>
                                        <td>VIX 20 is High</td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: '#ED6663' }}>High</td>
                                        <td>20 to 30</td>
                                        <td>30%</td>
                                        <td>VIX 30 is Very High</td>
                                    </tr>
                                    <tr>
                                        <td style={{ color: '#800000' }}>Very High</td>
                                        <td>30 or Greater</td>
                                        <td>8%</td>
                                        <td></td>
                                    </tr>
                                </table>
                            </div>
                            <p>“Frequency” is a measure of how much time the market has spent historically in these various ratings, with ‘Low’ the most common—and ‘Very High’ the most rare—over the last three decades.</p>
                            <p>A <a className="ai-link" href="https://finance.yahoo.com/chart/%5EVIX#eyJpbnRlcnZhbCI6IndlZWsiLCJwZXJpb2RpY2l0eSI6MSwiY2FuZGxlV2lkdGgiOjEsImZsaXBwZWQiOmZhbHNlLCJ2b2x1bWVVbmRlcmxheSI6dHJ1ZSwiYWRqIjp0cnVlLCJjcm9zc2hhaXIiOnRydWUsImNoYXJ0VHlwZSI6ImxpbmUiLCJleHRlbmRlZCI6ZmFsc2UsIm1hcmtldFNlc3Npb25zIjp7fSwiYWdncmVnYXRpb25UeXBlIjoib2hsYyIsImNoYXJ0U2NhbGUiOiJwZXJjZW50IiwicGFuZWxzIjp7ImNoYXJ0Ijp7InBlcmNlbnQiOjEsImRpc3BsYXkiOiJeVklYIiwiY2hhcnROYW1lIjoiY2hhcnQiLCJpbmRleCI6MCwieUF4aXMiOnsibmFtZSI6ImNoYXJ0IiwicG9zaXRpb24iOm51bGx9LCJ5YXhpc0xIUyI6W10sInlheGlzUkhTIjpbImNoYXJ0Iiwi4oCMdm9sIHVuZHLigIwiXX19LCJzZXRTcGFuIjp7ImJhc2UiOiJhbGwiLCJtdWx0aXBsaWVyIjoxfSwibGluZVdpZHRoIjoyLCJzdHJpcGVkQmFja2dyb3VuZCI6dHJ1ZSwiZXZlbnRzIjp0cnVlLCJjb2xvciI6IiNmZjgwODQiLCJzdHJpcGVkQmFja2dyb3VkIjp0cnVlLCJldmVudE1hcCI6eyJjb3Jwb3JhdGUiOnsiZGl2cyI6dHJ1ZSwic3BsaXRzIjp0cnVlfSwic2lnRGV2Ijp7fX0sInN5bWJvbHMiOlt7InN5bWJvbCI6Il5WSVgiLCJzeW1ib2xPYmplY3QiOnsic3ltYm9sIjoiXlZJWCIsInF1b3RlVHlwZSI6IklOREVYIiwiZXhjaGFuZ2VUaW1lWm9uZSI6IkFtZXJpY2EvTmV3X1lvcmsifSwicGVyaW9kaWNpdHkiOjEsImludGVydmFsIjoid2VlayIsInNldFNwYW4iOnsiYmFzZSI6ImFsbCIsIm11bHRpcGxpZXIiOjF9fSx7InN5bWJvbCI6IlNQWSIsInN5bWJvbE9iamVjdCI6eyJzeW1ib2wiOiJTUFkifSwicGVyaW9kaWNpdHkiOjEsImludGVydmFsIjoid2VlayIsInNldFNwYW4iOnsiYmFzZSI6ImFsbCIsIm11bHRpcGxpZXIiOjF9LCJpZCI6IlNQWSIsInBhcmFtZXRlcnMiOnsiY29sb3IiOiIjMDA4OTRjIiwid2lkdGgiOjIsImlzQ29tcGFyaXNvbiI6dHJ1ZSwic2hhcmVZQXhpcyI6dHJ1ZSwiY2hhcnROYW1lIjoiY2hhcnQiLCJzeW1ib2xPYmplY3QiOnsic3ltYm9sIjoiU1BZIn0sInBhbmVsIjoiY2hhcnQiLCJmaWxsR2FwcyI6ZmFsc2UsImFjdGlvbiI6ImFkZC1zZXJpZXMiLCJzeW1ib2wiOiJTUFkiLCJnYXBEaXNwbGF5U3R5bGUiOiJ0cmFuc3BhcmVudCIsIm5hbWUiOiJTUFkiLCJvdmVyQ2hhcnQiOnRydWUsInVzZUNoYXJ0TGVnZW5kIjp0cnVlLCJoZWlnaHRQZXJjZW50YWdlIjowLjcsIm9wYWNpdHkiOjEsImhpZ2hsaWdodGFibGUiOnRydWUsInR5cGUiOiJsaW5lIiwic3R5bGUiOiJzdHhfbGluZV9jaGFydCIsImhpZ2hsaWdodCI6ZmFsc2V9fV0sImN1c3RvbVJhbmdlIjpudWxsLCJzdHVkaWVzIjp7IuKAjHZvbCB1bmRy4oCMIjp7InR5cGUiOiJ2b2wgdW5kciIsImlucHV0cyI6eyJpZCI6IuKAjHZvbCB1bmRy4oCMIiwiZGlzcGxheSI6IuKAjHZvbCB1bmRy4oCMIn0sIm91dHB1dHMiOnsiVXAgVm9sdW1lIjoiIzAwYjA2MSIsIkRvd24gVm9sdW1lIjoiI2ZmMzMzYSJ9LCJwYW5lbCI6ImNoYXJ0IiwicGFyYW1ldGVycyI6eyJ3aWR0aEZhY3RvciI6MC40NSwiY2hhcnROYW1lIjoiY2hhcnQiLCJwYW5lbE5hbWUiOiJjaGFydCJ9fX0sIndpZHRoIjoyfQ--" target="_blank">chart with both the VIX with S&P500</a>
                                shows that ‘Very High’ tends to correlate with stock market crashes, such as the <a className="ai-link" href="https://en.wikipedia.org/wiki/2007%E2%80%932008_financial_crisis" target="_blank">Global Financial Crisis of 2008-2009</a> and the <a className="ai-link" href="https://en.wikipedia.org/wiki/2020_stock_market_crash" target="_blank">Covid Crash of March 2020</a>.</p>
                        </div>}
                    </div>
                    <div className="faq">
                        <h4 onClick={() => setShow4(!show4)}>4. Does Risk Weather tell me when it’s best to invest in stocks or buy downside protection? {show4 && <span className="minus">-</span>} {!show4 && <span>+</span>}</h4>
                        {show4 && <div className="content">
                            <p>Risk Weather can’t predict the future, though it is a crystal ball insofar as it measures what investors are expecting in terms of price volatility.</p>
                            <p>In so-called “perfect markets”—an assumption not shared by all market commentators—the price of downside protection should accurately reflect actual market conditions, and there is no investing edge to be had by timing the purchase of downside protection.</p>
                            <p>That said, investors who like to ‘buy low / sell high’ may find Risk Weather Alerts extremely useful for knowing when protection costs are relatively low or high, and for selecting the duration of downside protection coverage—for example buying shorter-term protection such as one week or one month when costs are relatively high, and buying longer-term protection such as three months or one year when costs are relatively low.</p>
                            <p>Downside protection can also be a great tool for getting invested—and staying invested—for exposure to any long-term growth in stock markets, because it limits potential losses without having to exit the market.</p>
                            <p>Risk Weather is not investment advice.</p>
                        </div>}
                    </div>
                    <div className="faq">
                        <h4 onClick={() => setShow5(!show5)}>5. Can I get Risk Weather personalized to my own investment portfolio? {show5 && <span className="minus">-</span>} {!show5 && <span>+</span>}</h4>
                        {show5 && <div className="content">
                            <p>Yes, though it requires a pilot account with customization and account-linking features not included in this public Risk Weather tool. <a className="ai-link" href="/demo/requestdemo" target="_blank">Request an Adaptive demo or pilot account to test drive our breakthrough fintech technology.</a> Pilot users can securely link brokerage accounts for automated risk analysis and downside protection pricing.</p>
                        </div>}
                    </div>
                    <div className="faq">
                        <h4 onClick={() => setShow6(!show6)}>6. What is downside protection? {show6 && <span className="minus">-</span>} {!show6 && <span>+</span>}</h4>
                        {show6 && <div className="content">
                            <p>Downside protection, often called a portfolio hedge, can limit portfolio losses by paying off in the event of a downturn in the portfolio value. Downside protection can sometimes also lead to improved risk-adjusted returns as compared to buy-and-hold without protection, if protection proceeds are reinvested at lower prices in a portfolio which is growing over the long term.</p>
                            <p>Adaptive seeks to smooth out the ride—and level the playing field—so investors can stay invested for long-term growth with tools which are otherwise the province of the ultra high-net-worth. <a className="ai-link" href="/demo/requestdemo" target="_blank">Request an Adaptive demo or pilot account to test drive our breakthrough fintech technology.</a> Pilot users can securely link brokerage accounts for automated risk analysis and downside protection pricing.</p>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(RiskWeather);