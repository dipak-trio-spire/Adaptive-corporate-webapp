import React, { useState , useEffect , useCallback , memo} from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { portfoliosWithManual } from "../../utilites/Constants";
import { addZeroes } from "../../utilites/AddZeros";
import { newConvertDate } from "../../utilites/ConvertDate";
import { GetPortfolioTable } from "../../utilites/GetPortfolioTable";
import { GetContractData } from "../../utilites/GetContractData";
import { GetSelfAssemblyRows } from "../../utilites/GetSelfAssemblyRows";
import { GetRiskHeaderColor } from "../../utilites/RiskColor";
import AddUser from "../../components/AddUser/AddUser";
import CustomPopup from "../../components/Popup/Popup";
import PortfolioDetailsTable from "../../components/PortfolioDetailsTable/PortfolioDetailsTable";
import SelfAssemblyTable from "../../components/SelfAssemblyTable/SelfAssemblyTable";
import { FetchRiskData } from "@/pages/api/FetchRiskData";
import { FetchMarketShield } from "@/pages/api/FetchMarketShield";
import { FetchSelfAssemblyData } from "@/pages/api/FetchSelfAssemblyData";
import PageLoader from '@/components/PageLoader/PageLoader';
import dynamic from 'next/dynamic';
import { FetchInteractiveMarketShield } from "@/pages/api/FetchInteractiveMarketShield";


const EditablePortfolioTable = dynamic(() => import('../PortfolioDetailsTable/EditablePortfolioTable'), { ssr: false });

function ShieldPricerv2_v3({ initPortfolio, initPortfolioValue,initTickerData,PPCv2,
    initMarketShieldData,
    initSelfAssemblyData, initRiskData, version }) {
    var currObj = {
        style: "currency",
        currency: "USD",
    };

    const [show, setShow] = useState(false);

    const [levels, removeFirstLevel] = useState([
        { percent: 80, level: "80%" },
        { percent: 85, level: "85%" },
        { percent: 90, level: "90%" },
        { percent: 95, level: "95%" },
        { percent: 100, level: "100%" },
    ]);
    const periods = [
        { month: "week", period: "Weekly" },
        { month: "week_2", period: "2 Weeks" },
        { month: "week_3", period: "3 Weeks" },
        { month: "month", period: "1 Month" },
        { month: "month_2", period: "2 Months" },
        { month: "quarter", period: "3 Months" },
        { month: "half_year", period: "6 Months" },
        { month: "year", period: "Year" },
    ];

    const [level, setLevel] = useState(90);
    const [period, setPeriod] = useState("month");
    const [portfolio, setPortfolio] = useState(initPortfolio);
    const [bdopen, setBdOpen] = useState(true);
    const [popupState, setPopupState] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [count, setCount] = useState(0);
    const [PercentProtectedValue, setPercentProtectedValue] = useState(0);
    const [PercentPortflio, setPercentPortflio] = useState(0);
    const [shieldExpires, setShieldExpires] = useState("");
    const [PortfolioTotalValue, setPortfolioTotalValue] = useState(Number(
        addZeroes(
            Number(parseFloat("100000.00").toFixed(2))
        )
    ).toLocaleString("en-US", currObj));
    const [FormatPortfolioValue, setFormatPortfolioValue] = useState(initPortfolioValue);
    const [MarketShieldData, setMarketShieldData] = useState([]);
    const [shieldPrice, setShieldPrice] = useState(0);
    const [popupTitle, setPopupTitle] = useState("");
    const [alertType, setAlertType] = useState("");
    const [VIXData, setVIXData] = useState([]);
    const [MesgHeader, setMesgHeader] = useState();
    const [headerColor, setHeaderColor] = useState();
    const [MesgDscUp, setMesgDscUp] = useState();
    const [MesgDscDown, setMesgDscDown] = useState();
    const [SAData, setSAData] = useState([]);
    const [rows, setRows] = useState([]);
    const [rows2, setRows2] = useState([]);
    const [PortfolioRows, setPortfolioRows] = useState([]);
    const [gauranteeAssemblyTotal, setGauranteeAssemblyTotal] = useState(0);
    const [marketProtectionTotal, setMarketProtectionTotal] =
        useState(0);
    const [IndexBeta, setIndexBeta] = useState(0);
    const [IndexR2, setIndexR2] = useState(0);
    const [TrackingError, setTrackingError] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const [tickerData, setTickerData] = useState([{ symbol: '', company_name: '', quantity: '', message: '',buyprice:'',market_value:'' }]);
    const [showcollapse, setShowcollapse] = useState(false);
    let apiData = [];

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tickerData];
        list[index][name] = name === 'symbol' ? value.toUpperCase() : value;
        list[index].message = '';
        setTickerData(list);
    };

    const calculateTotalPortfolioValue = (newList,action) => {
        if(action !== 'Reset'){
            setPortfolioTotalValue(Number(addZeroes(Number(parseFloat(newList.map(data => data.market_value).reduce((a, b) => a + b)).toFixed(2)))).toLocaleString("en-US", currObj));
            setFormatPortfolioValue(Number(parseFloat(newList.map(data => data.market_value).reduce((a, b) => a + b)).toFixed(2)))
        }else{
            setPortfolioTotalValue(0);
            setFormatPortfolioValue(0);
        }
    }

    const checkTickerRecognition = (tickerData) => {
        const symbolsEntered = tickerData.map(ticker => ticker.symbol);
        const updatedTickerData = tickerData.map((tickerObj, index) => {
            const symbolEntered = tickerObj.symbol;
            const referenceTicker = initTickerData.find(refTicker => refTicker.symbol === symbolEntered);

            if (tickerObj.symbol.trim() !== '' && tickerObj.quantity.trim() === '') {
                return { ...tickerObj, message: 'Please add quantity' };
            } else if (!referenceTicker) {
                return { ...tickerObj, message: 'Symbol not recognized' };
            } else if (referenceTicker.status === 'insufficient data') {
                return { ...tickerObj, message: 'Insufficient data', company_name: referenceTicker.company_name };
            } else if (symbolsEntered.indexOf(symbolEntered) !== index) {
                return { ...tickerObj, message: 'This ticker has already been added' };
            } else {
                return { ...tickerObj, message: '', company_name: referenceTicker.company_name ,buyprice:referenceTicker.buyprice, market_value: Number(addZeroes(Number(parseFloat(referenceTicker.buyprice*tickerObj.quantity).toFixed(2)))).toLocaleString("en-US", currObj)};
            }
        });
        return updatedTickerData;
    };

    const handleAddClick = () => {
        const newList = checkTickerRecognition([...tickerData]);
        newList.push({ symbol: '', company_name: '', quantity: '', message: '',buyprice:'',market_value:'' });
        setTickerData(newList);
        calculateTotalPortfolioValue(newList,'Add');
    };

    const handleResetClick = () => {
        setTickerData([{ symbol: '', company_name: '', quantity: '', message: '',buyprice:'',market_value:'' }]);
        calculateTotalPortfolioValue([{ symbol: '', company_name: '', quantity: '', message: '',buyprice:'',market_value:'' }],'Reset');
    }

    const handleDeleteClick = (index) => {
        const list = [...tickerData];
        list.splice(index, 1);
        if (list.length === 0) {
            list.push({ symbol: '', company_name: '', quantity: '', message: '',buyprice:'',market_value:''});
        }
        setTickerData(list);
        calculateTotalPortfolioValue(list,'Delete');
    };

    const handleManualPortfolio = async () =>{
        setBdOpen(true);
        setDataLoaded(false);
        const updatedTickerData = checkTickerRecognition(tickerData);
        setTickerData(updatedTickerData);
        calculateTotalPortfolioValue(updatedTickerData,'calculate');
        if (updatedTickerData.length === 0 || updatedTickerData.every(ticker => ticker.symbol.trim() === '')) {
            setBdOpen(false);
            setShow(true);
            setPopupState(true);
            setPopupMessage(
                "Please add at least one symbol and its quantity to proceed."
            );
            setAlertType("error");
            return;
        }
        if (updatedTickerData.some(ticker => ticker.symbol.trim() !== '' && ticker.quantity.trim() === '')) {
            setBdOpen(false);
            setShow(true);
            setPopupState(true);
            setPopupMessage(
                "Please add a valid quantity for all entered tickers."
            );
            setAlertType("error");
            return;
        }
        if (updatedTickerData.every(ticker => ticker.message === 'Symbol not recognized' || ticker.message === 'Insufficient data')) {
            setBdOpen(false);
            setShow(true);
            setPopupState(true);
            setPopupMessage(
                "We do not have prices data for the tickers, Please try again with different tickers."
            );
            setAlertType("error");
            return;
        }
        apiData = updatedTickerData
            .filter(ticker => ticker.message === '' && ticker.symbol.trim() !== '' && ticker.quantity.trim() !== '')
            .map(ticker => ({ ticker: ticker.symbol, quantity: ticker.quantity }));

        if(apiData.length > 0){
            let raw = JSON.stringify({
                email_id: 'manualportfolio@ppc.com',
                full_name: 'Manual Portfolio ppc',
                pli: apiData,
              }, null, 4);
            
              try {
                const [ marketData, vixData, selfAssemblyData] = await Promise.all([
                    FetchInteractiveMarketShield(raw),
                    FetchRiskData(),
                    FetchSelfAssemblyData(raw)
                ]);
                setMarketShieldData(marketData);
                setVIXData(vixData);
                setSAData(selfAssemblyData);
                setDataLoaded(true);
                setBdOpen(false);
            } catch (error) {
                setBdOpen(false);
                setPopupMessage("Unable to fetch the data. Please try again later");
                setPopupState(true);
                setPopupTitle("Error");
                setAlertType("Error");
                setDataLoaded(false);
            }
        }
    };

    const changePeriod = (event) => {
        if (levels.length > 5) {
            levels.shift();
            removeFirstLevel(levels);
        }

        setPeriod(event.target.value);
        if (level !== 0) {
            fetch_price(event.target.value, level);
        }
    };

    const changeLevel = (event) => {
        setLevel(event.target.value);
        if (period !== " ") {
            fetch_price(period, event.target.value);
        }
    };

    const changePortfolio = (event) => {
        setPortfolio(event.target.value);
        setDataLoaded(false);
        if(event.target.value !=='Manual Portfolio'){
            setPortfolioTotalValue(Number(addZeroes(Number(parseFloat("100000.00").toFixed(2)))).toLocaleString("en-US", currObj));
            setFormatPortfolioValue(initPortfolioValue);
            fetchData(FormatPortfolioValue, event.target.value) 
        }
        else{
            setShowcollapse(true);
        }
    };

    const fetch_price = useCallback(async (period_str, selected_percent) => {

        const org_percent = selected_percent;

        if (Object.keys(VIXData).length !== 0 && VIXData !== false && VIXData !== 0) {
            const lastClosePrice = VIXData["1_month"]["risk_value"]["closeprice"][VIXData["1_month"]["risk_value"]["closeprice"].length - 1]
            const status = GetRiskHeaderColor(lastClosePrice)
            setMesgHeader(status["status_text"]);
            setHeaderColor(status["status_color"]);
            setMesgDscUp(status["status_description_up"]);
            setMesgDscDown(status["status_description_down"]);
        } else if (VIXData === false) {
            setBdOpen(false);
            setPopupMessage(
                "Unable to show the Risk Data. Please try again later"
            );
            setPopupTitle("ERROR");
            setAlertType("ERROR");
            setPopupState(true);
        } else if (VIXData === 0) {
            setBdOpen(false);
            setPopupState(true);
            setPopupTitle("ERROR");
            setAlertType("ERROR");
            setPopupMessage(
                "This is a technology preview. The service is not available during some market data updates. Please try again in 30 minutes."
            );
        }

        if (Object.keys(MarketShieldData).length !== 0 && MarketShieldData !== false && MarketShieldData !== 0) {
            var market_percent = org_percent / 100
            market_percent = market_percent === 1 ? parseFloat(market_percent).toFixed(1) : market_percent
                if(Object.keys(MarketShieldData["ChoosenOption"]).indexOf(period_str) >= 0){
                var market_data = MarketShieldData["ChoosenOption"][period_str];
                setShieldPrice(market_data[market_percent]["Cost"]);
                const [first_lyst, MarketTotalValue] = await GetContractData(market_data[market_percent])
                setRows2([...first_lyst]);
                setMarketProtectionTotal(MarketTotalValue);
                setPercentProtectedValue(FormatPortfolioValue * market_percent);
                const portfolio_lyst = await GetPortfolioTable(MarketShieldData["ProtPort"]);
                setPortfolioRows([...portfolio_lyst]);
                setShieldExpires(newConvertDate(market_data[market_percent]["ExpirationDate"]));
                setPercentPortflio(((market_data[market_percent]["Cost"] / FormatPortfolioValue) * 100).toFixed(2));
                setIndexBeta((MarketShieldData["Beta"]).toFixed(2));
                setIndexR2((MarketShieldData["RSq"]));
                setTrackingError((MarketShieldData["TrackingError"] * 100).toFixed(2));
            } else{
                displayError(
                    "Data not available. Please try again with a different protection period."
                );
                return;
            }
            setBdOpen(false);
        } else if (MarketShieldData === false || Object.keys(MarketShieldData).length === 0) {
            setBdOpen(false);
            displayError(
                "Unable to show the data. Please try again later"
            );
            return;
        } else if (MarketShieldData === 0) {
            setBdOpen(false);
            displayError(
                "This is a technology preview. The service is not available during some market data updates. Please try again in 30 minutes."
            );
            return;
        }

        if (Object.keys(SAData).length !== 0 && SAData !== false && SAData !== 0) {
            const [sa_lyst, totalValue] = await GetSelfAssemblyRows(SAData, period_str, selected_percent);
            setRows([...sa_lyst]);
            setGauranteeAssemblyTotal(totalValue);
        } else if (SAData === false || Object.keys(SAData).length === 0) {
            displayError(
                "Unable to show the data. Please try again later"
            );
            return;
        } else if (SAData === 0) {
            displayError(
                "This is a technology preview. The service is not available during some market data updates. Please try again in 30 minutes."
            );
            return;
        }
    }, [MarketShieldData, VIXData, SAData]);

    const fetchData = async (portfolioValue, portfolioName) => {
        setBdOpen(true);
        setDataLoaded(false);
        if (portfolioValue) {
            var raw = JSON.stringify({
                portfolio_name: portfolioName,
                portfolio_value: portfolioValue
            });
            try {
                const [marketData, vixData, selfAssemblyData] = await Promise.all([
                    FetchMarketShield(portfolioValue, portfolioName),
                    FetchRiskData(),
                    FetchSelfAssemblyData(raw)
                ]);
                setMarketShieldData(marketData);
                setVIXData(vixData);
                setSAData(selfAssemblyData);
                setDataLoaded(true);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setBdOpen(false);
                setPopupMessage("Unable to fetch the data. Please try again later");
                setPopupState(true);
                setPopupTitle("Error");
                setAlertType("Error");
                setDataLoaded(false);
            }
        }else{
            setPortfolioTotalValue(0);
            setBdOpen(false);
            setPopupMessage("Please enter valid value to proceed");
            setPopupState(true);
            setPopupTitle("Error");
            setAlertType("Error");
        }
    };

    useEffect(() => {
        if(portfolio!=='Manual Portfolio'){
            fetchData(FormatPortfolioValue, portfolio);
        }
        else{
            setBdOpen(false);
            setShowcollapse(true);
        }
    }, []);

    useEffect(() => {
        if (dataLoaded) {
            fetch_price(period, level);
        }
    }, [dataLoaded]);

    function changeValue(event, value) {
        let trimmedValue = value.trim().replace(/[^0-9.]/g, '');
    
        if (event.key === "Enter") {
            setShowTooltip(false);
            let float_value = parseFloat(trimmedValue);
            if (isNaN(float_value) || trimmedValue === "") {
                displayError("Please enter a valid value to proceed further.");
                return;
            }
    
            if (float_value === 0) {
                displayError("Value cannot be zero. Please enter a valid value.");
                return;
            }
            
            setBdOpen(true);
            setFormatPortfolioValue(float_value);
            setPortfolioTotalValue((Number(
                addZeroes(
                    Number(float_value.toFixed(2))
                )
            ).toLocaleString("en-US", currObj)));
            setDataLoaded(false);
            fetchData(float_value, portfolio);
        }
    }

    function handleChangeValue(event, value) {
        let text = event.target.value.replace(/[^\d\.]/gi, '');

        if ((text.split('.').length - 1) > 1) {
            event.target.classList.remove('valid');
            event.target.classList.add('invalid');
            return;
        }

        let lastCharIsAdot = text.substr(text.length - 1, 1) === ".";

        if (text === "0" || text === "." || isNaN(text)) {
            event.target.classList.remove('valid');
            event.target.classList.add('invalid');
            return;
        } else if (event.target.value === "") {
            setPortfolioTotalValue("");
        } else {
            event.target.classList.remove('invalid');
            event.target.classList.add('valid');
            event.target.value = Number(text).toLocaleString("en-US");
            if (lastCharIsAdot) event.target.value += ".";
            setPortfolioTotalValue(event.target.value);
            let float_value = parseFloat(event.target.value.replace(/,/g, ''));
            setFormatPortfolioValue(float_value);
        }
        setShowTooltip(true);
    }

    function displayError(message) {
        setPopupMessage(message);
        setPopupTitle("ERROR");
        setAlertType("ERROR");
        setPopupState(true);
    }

  const [showAccordian, setShowAccordian] = useState([]);

  const toggleShow = (index) => {
    setShowAccordian((prevShow) => {
      const newShow = [...prevShow];
      newShow[index] = !newShow[index];
      return newShow;
    });
  };
    return (
        <>
            <PageLoader bdopen = {bdopen} />
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title={popupTitle}
                content={popupMessage}
                alertType={alertType}
            />
            <div className="sectiondivide pb0 section-col ovv">
                <div className="duration inputs">
                    <div className="big">
                        <label>Model Portfolio</label>
                        <Select type="text"
                            value={portfolio}
                            className="input-mui-lg"
                            onChange={changePortfolio}>
                            {portfoliosWithManual.map((value, i) => (
                                <MenuItem key={i} value={value.name}>{value.value}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <label>Portfolio Value</label>
                        <div className="input-container">
                            <input type="text" className="input-gray" placeholder=""
                                required
                                onChange={handleChangeValue}
                                // onChange={(event) => setPortfolioTotalValue(event.target.value)}
                                value={PortfolioTotalValue}
                                disabled={portfolio === 'Manual Portfolio'?true:false}
                                onKeyUp={(event) =>
                                    changeValue(event, event.target.value)
                                }
                            />
                            {showTooltip && <div className="custom-tooltip">Please hit Enter to proceed</div>}
                        </div>
                    </div>
                    <div>
                        <label>Protection Period</label>
                        <Select type="text"
                            value={period}
                            className="input-mui-lg"
                            onChange={changePeriod}>
                            {periods.map((value, i) => (
                                <MenuItem key={i} value={value.month}>{value.period}</MenuItem>
                            ))}
                        </Select>
                        <span className="inpinfo">{shieldExpires}</span>
                    </div>
                    <div>
                        <label>Protection level</label>
                        <Select type="text" className="input-mui-lg"
                            value={level}
                            onChange={changeLevel} >
                            {levels.map((value, i) => (
                                <MenuItem key={i} value={value.percent}>{value.level}</MenuItem>
                            ))}
                        </Select>
                        <span className="inpinfo">{Number(
                            addZeroes(
                                Number(parseFloat(PercentProtectedValue).toFixed(2))
                            )
                        ).toLocaleString("en-US", currObj)}</span>
                    </div>
                    <div className="big">
                        <label>Market Protection Estimate</label>
                        <input type="text" className="input-value input-gray" placeholder=""
                            value={Number(
                                addZeroes(
                                    Number(parseFloat(shieldPrice).toFixed(2))
                                )
                            ).toLocaleString("en-US", currObj)} />
                        <span className="inpinfo">{PercentPortflio}% of total portfolio value</span>
                    </div>
                </div>
            </div>
            {version === 2 &&
                <>
                    <div className="sectiondivide pb0 pt0 section-col">
                        <div className="weatherstat part3">
                        { dataLoaded && (
                            <h4>Risk Weather is <span style={headerColor}>{MesgHeader}</span>.
                            {MesgDscUp}<br></br>{MesgDscDown} <a className="ai-link" href="#faq1">Learn more.</a></h4>
                        )}
                        </div>
                    </div>

                    {dataLoaded && (
                        <>
                            <SelfAssemblyTable rows={rows}
                                rows2={rows2}
                                gauranteeAssemblyTotal={gauranteeAssemblyTotal}
                                marketProtectionTotal={marketProtectionTotal}
                                IndexBeta={IndexBeta} TrackingError={TrackingError}
                                IndexR2={IndexR2} />
                        </>
                    )}
                    <div className="sectiondivide p0 aftermark">
                        <div class="weatherstat warning"><p>All price quotes as of market close for previous trading day.</p></div>
                    </div>
                    <div className="sectiondivide pb0 section-col">
                        <div className="collapse">
                            <h4>Put Options</h4>
                            <p>The Portfolio Protection Calculator programmatically generates a list of possible put option contracts with strike price and expiration based on the selection above of Protection Level and Protection Period. This is NOT investment advice. Consult a licensed broker for options trading information and approvals.</p>
                        </div>
                    </div>
                </>
            }

            <div className="sectiondivide pb0 section-col">
                <div className="getalerts">
                    <div>
                        <h3>Want to see downside protection personalized for your own portfolios? Join the wait-list for early access to our breakthrough technology.</h3>
                        <p>Easy changes everything. Join the wait-list to gain access to this brand new capability.</p>
                    </div>
                    <div class="riskalert">
                        <div class="main-header signupform ">
                            <AddUser singupFor="shieldpricer" buttonText="Sign Up" />
                        </div>
                    </div>
                </div>
            </div>

            <br/>
            <div className="sectiondivide pt0 pb0 section-col">
                {portfolio === 'Manual Portfolio' ? 
                    (
                        <div className="collapse">
                            <h4 onClick={() => setShowcollapse(!showcollapse)}>Enter Portfolio Details {showcollapse && <span className="minus">-</span>} {!showcollapse && <span>+</span>}</h4>
                            {showcollapse && <div className="tablecon portfolioinp">
                                <EditablePortfolioTable
                                    tickerData={tickerData}
                                    handleInputChange={handleInputChange}
                                    handleDeleteClick={handleDeleteClick}
                                />
                                <div className='tikerdatabtn'>
                            <div className='left'>
                                <a className='ai-btn primary solid' onClick={handleAddClick}>Add ticker</a>
                            </div>
                            <div className='right'>
                                <a className='ai-btn primary solid' onClick={() =>handleManualPortfolio()}>Calculate</a>
                                <a className='ai-btn primary solid' onClick={handleResetClick}>Reset</a>
                            </div>
                        </div>
                            </div>}
                            
                        </div>
                    ):
                    (<PortfolioDetailsTable PortfolioRows={PortfolioRows} />)
                }
            </div>

            {version === 2 &&
                <>
                    <div className="sectiondivide pb0 section-col">
                        <div>
                        <h3>{PPCv2?.advisors_investors_title} <br></br></h3>
                        <h4 dangerouslySetInnerHTML={{ __html: PPCv2?.advisors_investors_content?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
                        </div>
                    </div>

                    <div className="sectiondivide section-col ptsec">
                        <h3 className="sec-head">{PPCv2?.works_main_title}</h3>
                        <div className="iconcon">
                        {
                            PPCv2?.all_works_repeater && 
                            PPCv2?.all_works_repeater.map((val , i)=>{
                                return(
                                <div className="iconset" key={i}>
                                    <span dangerouslySetInnerHTML={{ __html: val.all_works_repeater_svg_codes }}></span>
                                    <h5>{val.all_works_repeater_title}</h5>
                                </div>
                                )
                            })
                            }                             
                        </div>
                    </div>
                    <div className="sectiondivide section-col ptsec">
                        <h3 className="sec-head">Join the wait-list for early access to our breakthrough technology.<br></br>Easy changes everything.</h3>
                        <div className="signupalert">
                            <AddUser singupFor="shieldpricer" buttonText="Sign Up" />
                        </div>
                        <p>Measure risk and estimate the cost of downside protection for model portfolios with Adaptive’s new <a className="ai-link" href="/tools/rw" target="_blank" >Risk Weather tool.</a></p>
                    </div>
                    <div className="sectiondivide section-col ptsec" id="faqsec">
                    <h3 className="sec-head">{PPCv2?.faqs_main_title}</h3>
                        <div className="faqcon">
                        {PPCv2?.all_faqs &&
                            PPCv2?.all_faqs.map((val, i) => (
                                    <div className="faq" id={`${i + 1}`} key={i}>
                                        <h4 onClick={() => toggleShow(i)}>
                                        {val.all_faqs_questions} {showAccordian[i] ? <span className="minus">-</span> : <span>+</span>}
                                        </h4>
                                        {showAccordian[i] && (
                                        <div className="content">
                                            <p dangerouslySetInnerHTML={{ __html: val.all_faqs_answers?.replace(/<p>/g, '').replace(/<\/p>/g, '') }} />
                                        </div>
                                        )}
                                    </div>
                                    ))} 
                        </div>
                    </div>
                </>
            }
        </>
    );
}

export default memo(ShieldPricerv2_v3);