import React from "react";
import AddUser from "@/components/AddUser/AddUser";
import MonteCarloSimulation from "@/components/Graph/MonteCarloGraph";
import "react-datepicker/dist/react-datepicker.css";
import CustomPopup from "@/components/Popup/Popup";
import "@/node_modules/slick-carousel/slick/slick.css";
import "@/node_modules/slick-carousel/slick/slick-theme.css";
import { addZeroes } from "../../utilites/AddZeros";
import { portfolios } from "../../utilites/Constants";
import { TabContainer, TabPane, TabContent } from 'react-bootstrap';
import { FetchForwardSimulation } from "@/pages/api/FetchForwardSimulation";
import PortfolioReturnGraph from "@/components/Graph/PortfolioReturnGraph";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TagManager from "react-gtm-module";
import PageLoader from '@/components/PageLoader/PageLoader';
import TooltipComponent from '../TooltipComponent/TooltipComponent';

function ForwardTest({ initPortfolio, version }) {

    var currObj = {
        style: "currency",
        currency: "USD",
    };

    const [levels, removeFirstLevel] = React.useState([
        { percent: 0, level: "SELECT" },
        { percent: 0.80, level: "80%" },
        { percent: 0.85, level: "85%" },
        { percent: 0.90, level: "90%" },
        { percent: 0.95, level: "95%" },
        { percent: 1.0, level: "100%" },
    ]);

    const periods = [
        { period_int: 0, period_value: "SELECT" },
        { period_int: 30, period_value: "1 Month" },
        { period_int: 60, period_value: "2 Months" },
        { period_int: 91, period_value: "3 Months" },
        { period_int: 182, period_value: "6 Months" },
        { period_int: 365, period_value: "Year" },
    ];

    const simulationPeriod = [
        { simulation_period: 0, simulation_value: "SELECT" },
        { simulation_period: 2, simulation_value: "2 Years" },
        { simulation_period: 3, simulation_value: "3 Years" },
        { simulation_period: 4, simulation_value: "4 Years" },
        { simulation_period: 5, simulation_value: "5 Years" },
        { simulation_period: 6, simulation_value: "6 Years" },
        { simulation_period: 7, simulation_value: "7 Years" },
        { simulation_period: 8, simulation_value: "8 Years" },
        { simulation_period: 9, simulation_value: "9 Years" },
        { simulation_period: 10, simulation_value: "10 Years" },
    ];

    const NumberOfPaths = [
        { path_no: 0, path_value: "SELECT" },
        { path_no: 100, path_value: "100" },
        { path_no: 500, path_value: "500" },
        { path_no: 1000, path_value: "1,000" }
    ];

    const portfolioDetailsTableHeaders = [
        { title: "#" },
        { title: "SYMBOL" },
        { title: "POSITION NAME" },
        { title: "QUANTITY", tooltip: "Number of shares held for each stock" },
        { title: "CLOSING PRICE", tooltip: "Price of a security at the EOD previous market close" },
        { title: "MARKET VALUE", tooltip: "Market value of each security based on last price" },
        { title: "WEIGHT" }
    ];

    const SimulationDetailsTableHeaders = [
        { title: "PATH" },
        { title: "ENDING PORTFOLIO VALUE WITHOUT SHIELD" },
        { title: "ENDING PORTFOLIO VALUE WITH SHIELD" },
        { title: "TOTAL SHIELD COST" },
        { title: "TOTAL SHIELD PAYOFF" },
        { title: "AVERAGE SHIELD COST" },
        { title: "AVERAGE SHIELD PAYOFF" },
        { title: "AVERAGE SHIELD COST(%)" },
        { title: "AVERAGE SHIELD PAYOFF(%)" },
    ];

    const [portfolio, setPortfolio] = React.useState(initPortfolio);
    const [level, setLevel] = React.useState(0);
    const [period, setPeriod] = React.useState(0);
    const [Simulation, setSimulation] = React.useState(0);
    const [Path, setPath] = React.useState(0);
    const [bdopen, setBdOpen] = React.useState(false);
    const [popupState, setPopupState] = React.useState(false);
    const [popupMessage, setPopupMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("");
    const [PortfolioTotalValue, setPortfolioTotalValue] = React.useState(Number(
        addZeroes(
            Number(parseFloat("100000.00").toFixed(2))
        )
    ).toLocaleString("en-US", currObj));
    const [FormatPortfolioValue, setFormatPortfolioValue] = React.useState(100000.00);
    const [tabletabvalue, setTableTabValue] = React.useState("Portfolio Details");
    const [tabvalue, setTabValue] = React.useState("Portfolio Return");
    const [PortfolioDetailsTable, setPortfolioDetailsTable] = React.useState([]);
    const [SimulationDetailsTable, setSimulationDetailsTable] = React.useState([]);
    const [HistogramShieldedData, setHistogramShieldedData] = React.useState([]);
    const [HistogramUnShieldedData, setHistogramUnShieldedData] = React.useState([]);
    const [HistogramRelativeData, setHistogramRelativeData] = React.useState([]);
    const [ShieldedGraphData, setShieldedGraphData] = React.useState([]);
    const [UnshieldedGraphData, setUnshieldedGraphData] = React.useState([]);
    const [DisableRunButton, setDisableRunButton] = React.useState(true);
    const [ShieldedMarketGraph, setShieldedMarketGraph] = React.useState([]);
    const [UnShieldedMarketGraph, setUnShieldedMarketGraph] = React.useState([]);
    const [GotForwardTData, setGotForwardTData] = React.useState(false);
    const [ApiCount, setApiCount] = React.useState(0);
    const [HistXMax, setHistXMax] = React.useState();
    const [HistYMax, setHistYMax] = React.useState();
    const [HistXMin, setHistXMin] = React.useState();
    const [LineYMin, setLineYMin] = React.useState();
    const [LineYMax, setLineYMax] = React.useState();
    const [show, setShow] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [show4, setShow4] = React.useState(false);
    const [show5, setShow5] = React.useState(false);
    const [show6, setShow6] = React.useState(false);

    const changePeriod = (event) => {
        if (event.target.value === 0) {
            setPopupState(true);
            setPopupMessage("Please select valid duration");
            setAlertType("warning");
            setDisableRunButton(true);
            // setPeriod(0);
            return;
        }
        if (ApiCount > 0) {
            setDisableRunButton(false);
        }
        setPeriod(event.target.value);
    };

    const changeLevel = (event) => {
        if (event.target.value === "") {
            setPopupState(true);
            setPopupMessage("Please select valid level");
            setAlertType("warning");
            setDisableRunButton(true);
            // setPeriod(0);
            return;
        }
        if (ApiCount > 0) {
            setDisableRunButton(false);
        }
        setLevel(event.target.value);
    };

    const changeSimulationPeriod = (event) => {
        if (event.target.value === "") {
            setPopupState(true);
            setPopupMessage("Please select valid simulation length");
            setAlertType("warning");
            setDisableRunButton(true);
            // setPeriod(0);
            return;
        }
        if (ApiCount > 0) {
            setDisableRunButton(false);
        }
        setSimulation(event.target.value);
    };


    const changeNumberOfPath = (event) => {
        if (event.target.value === "") {
            setPopupState(true);
            setPopupMessage("Please select valid number of path");
            setAlertType("warning");
            setDisableRunButton(true);
            // setPeriod(0);
            return;
        }
        if (ApiCount > 0) {
            setDisableRunButton(false);
        }
        setPath(event.target.value);
    };

    if (DisableRunButton === true) {
        if (portfolio !== "" && Simulation !== 0 && period !== 0 && level !== 0 && Path !== 0 && ApiCount === 0) {
            setDisableRunButton(false);
        }
    }

    const calculateForwardTest = () => {
        fetchForwardSimulation(portfolio, FormatPortfolioValue, Simulation, period, level, Path);
    };

    function changeValue(event, value) {
        let trimmedValue = value.trim().replace(/[^0-9.]/g, '');
        if (event.key === "Enter") {
            setShowTooltip(false);
            let float_value = parseFloat(value.replace(/,/g, ''));
            if (float_value === 0 || isNaN(float_value) || trimmedValue === "") {
                setPopupMessage(
                    "Please enter a valid value to proceed further."
                );
                setAlertType("ERROR");
                setPopupState(true);
                return;
            }
            setFormatPortfolioValue(float_value);
            setPortfolioTotalValue((Number(
                addZeroes(
                    Number(parseFloat(float_value).toFixed(2))
                )
            ).toLocaleString("en-US", currObj)));
            if (ApiCount > 0) {
                setDisableRunButton(false);
            }
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
        if (ApiCount > 0) {
            setDisableRunButton(false);
        }
    }

    function GenerateHistData(data) {
        let rawData = Object.entries(data).map(([interval, { count }]) => ({
            interval,
            count
        }));

        let intervalData = rawData.reduce((acc, { interval, count }) => {
            const key = Math.floor(parseInt(interval.match(/-?\d+/), 10) / 5) * 5;
            const prev = acc.find((d) => d.interval === `${key}-${key + 5}`);
            if (prev) {
                prev.count += count;
            } else {
                acc.push({ interval: `${key + 5}`, count });
            }
            return acc;
        }, []);
        intervalData.sort((a, b) => parseInt(a.interval) - parseInt(b.interval));
        return intervalData;
    }

    function FillMissingIntervals(data1, data2) {
        const intervals1 = Object.keys(data1);
        const intervals2 = Object.keys(data2);
        const uniqueIntervals = new Set([...intervals1, ...intervals2]);

        const newData1 = {};
        const newData2 = {};
        for (const interval of uniqueIntervals) {
            const count1 = data1[interval]?.count || 0;
            const count2 = data2[interval]?.count || 0;
            newData1[interval] = { count: count1 };
            newData2[interval] = { count: count2 };
        }
        let output_1 = GenerateHistData(newData1);
        let output_2 = GenerateHistData(newData2);
        return [output_1, output_2];
    }

    const fetchForwardSimulation = (portfolio, FormatPortfolioValue, simulation_period, protection_period, protection_level, number_of_paths) => {
        setBdOpen(true);
        FetchForwardSimulation(portfolio, FormatPortfolioValue, simulation_period, protection_period, protection_level, number_of_paths).then((data) => {
            console.log("FS", data)
            if (data !== false && data !== 0 && data !== undefined && data !== 401) {
                setGotForwardTData(true);
                setApiCount(1);
                setDisableRunButton(true);
                const [ShieldedData, UnShieldedData] = FillMissingIntervals(data["historgram_shielded_height"], data["historgram_unshielded_height"]);

                setHistogramShieldedData(ShieldedData);
                setHistogramUnShieldedData(UnShieldedData);
                setHistogramRelativeData(GenerateHistData(data["historgram_relative_height"]));
                setSimulationDetailsTable(data["simulation_details"]);
                setShieldedGraphData(data["shielded_portfolio_value"]);
                setUnshieldedGraphData(data['unshielded_portfolio_value']);
                setPortfolioDetailsTable(data["portfolio_details"]);
                setSimulationDetailsTable(data["simulation_details"]);

                const xMax = Math.max(
                    ...ShieldedData.map((item) => item.interval),
                    ...UnShieldedData.map((item) => item.interval)
                );
                const xMin = Math.min(
                    ...ShieldedData.map((item) => item.interval),
                    ...UnShieldedData.map((item) => item.interval));
                setHistXMax(xMax);
                setHistXMin(xMin);

                const yMax = Math.max(
                    ...ShieldedData.map((item) => item.count),
                    ...UnShieldedData.map((item) => item.count));
                setHistYMax(yMax);

                const lines1 = Object.keys(data["shielded_portfolio_value"][0]).filter(key => key !== 'index')
                const lines2 = Object.keys(data["unshielded_portfolio_value"][0]).filter(key => key !== 'index')
                setShieldedMarketGraph(lines1);
                setUnShieldedMarketGraph(lines2);

                const yMax1 = Math.max(
                    ...data["shielded_portfolio_value"].map(row => Math.max(...lines1.map(key => row[key]))),
                    ...data["unshielded_portfolio_value"].map(row => Math.max(...lines2.map(key => row[key])))
                );

                const yMin1 = Math.min(
                    ...data["shielded_portfolio_value"].map(row => Math.max(...lines1.map(key => row[key]))),
                    ...data["unshielded_portfolio_value"].map(row => Math.max(...lines2.map(key => row[key])))
                );

                setLineYMin(yMin1)
                setLineYMax(yMax1)

                TagManager.dataLayer({
                    dataLayer: {
                        event: 'Forward Simulation',
                        userType: sessionStorage.getItem("selectedAcType"),
                        user_id: sessionStorage.getItem("clientId")
                    },
                });
                setBdOpen(false);
            } else if (data === false) {
                setBdOpen(false);
                setPopupState(true);
                setPopupMessage(
                    "This is a technology preview. The service is not available during some market data updates. Please try again in 30 minutes."
                );
                setAlertType("error");
            } else if (data === 0 || data === undefined) {
                setBdOpen(false);
                setPopupState(true);
                setPopupMessage(
                    "Please retry by reducing the number of paths or simulation period."
                );
                setAlertType("error");
                return;
            }
        });
    }

    const changePortfolio = (event) => {
        console.log(event.target.value)
        if (event.target.value === "") {
            setPopupState(true);
            setPopupMessage("Please select valid portfolio");
            setAlertType("warning");
            return;
        }
        if (ApiCount > 0) {
            setDisableRunButton(false);
        }
        setPortfolio(event.target.value);
    };

    function handleTableTabChange(tabletabvalue) {
        setTableTabValue(tabletabvalue);
    }
    function handleTabChange(tabvalue) {
        setTabValue(tabvalue);
    }
    return (
        <>
            <PageLoader bdopen={bdopen} />
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title="Forward Test"
                content={popupMessage}
                alertType={alertType}
            />
            <div className="sectiondivide pb0 section-col">
                <div className="duration inputs">
                    <div>
                        <label>Model Portfolio <TooltipComponent id={"Model Portfolio"}></TooltipComponent></label>
                        <Select type="text"
                            value={portfolio}
                            className="input-mui-lg"
                            onChange={changePortfolio}>
                            {portfolios.map((value, i) => (
                                <MenuItem key={i} value={value.name}>{value.value}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>

                        <label>Portfolio Value <TooltipComponent id={"Portfolio Value"}></TooltipComponent></label>
                        <div className="input-container">
                            <input type="text" className="input-gray" placeholder=""
                                required
                                onChange={handleChangeValue}
                                value={PortfolioTotalValue}
                                onKeyUp={(event) =>
                                    changeValue(event, event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <label>Simulation Length <TooltipComponent id={"Simulation Length"}></TooltipComponent></label>
                        <Select type="text"
                            value={Simulation}
                            className="input-mui-lg"
                            onChange={changeSimulationPeriod}>
                            {simulationPeriod.map((value, i) => (
                                <MenuItem key={i} value={value.simulation_period}>{value.simulation_value}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <label>Protection Period <TooltipComponent id={"Protection Period"}></TooltipComponent></label>
                        <Select type="text"
                            value={period}
                            className="input-mui-lg"
                            onChange={changePeriod}>
                            {periods.map((value, i) => (
                                <MenuItem key={i} value={value.period_int}>{value.period_value}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <label>Protection level <TooltipComponent id={"Protection level"}></TooltipComponent></label>
                        <Select type="text" className="input-mui-lg"
                            value={level}
                            onChange={changeLevel} >
                            {levels.map((value, i) => (
                                <MenuItem key={i} value={value.percent}>{value.level}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <label>Number of Paths <TooltipComponent id={"Number of Paths"}></TooltipComponent></label>
                        <Select type="text" className="input-mui-lg"
                            value={Path}
                            onChange={changeNumberOfPath}>
                            {NumberOfPaths.map((value, i) => (
                                <MenuItem key={i} value={value.path_no}>{value.path_value}</MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="buttonbuy">
                        <button className="ai-btn primary solid mt30"
                            disabled={DisableRunButton}
                            onClick={calculateForwardTest}>
                            Run Monte Carlo Simulation
                        </button>
                        {!DisableRunButton &&
                            <p className="infomessage"> Press “Run..” to recalculate the simulation </p>
                        }
                    </div>
                </div>
            </div>
            <div className="minh600">
                {GotForwardTData &&
                    <>
                        <div className="sectiondivide pb0 section-col pt0i">
                            <div className="forwardtest">
                                <div className="forgraphs">
                                    <div className="forward-column">
                                        <h3><img className="ai-img" src="Assets/shield-green.png" />Portfolio with Portfolio Shield <TooltipComponent id={"Portfolio with Portfolio Shield"}></TooltipComponent></h3>
                                        {ShieldedGraphData.length === 0 ? (
                                            <div style={{ textAlign: "center" }}>
                                            </div>
                                        ) : (<MonteCarloSimulation data={ShieldedGraphData} lines={ShieldedMarketGraph}
                                            yMin={LineYMin} yMax={LineYMax} portfolioTotalValue={FormatPortfolioValue} />)}
                                    </div>
                                    <div className="forward-column">
                                        <h3><img className="ai-img" src="Assets/shield-red.png" />Portfolio without Portfolio Shield <TooltipComponent id={"Portfolio without Portfolio Shield"}></TooltipComponent></h3>
                                        {UnshieldedGraphData.length === 0 ? (
                                            <div style={{ textAlign: "center" }}>
                                            </div>
                                        ) : (<MonteCarloSimulation data={UnshieldedGraphData} lines={UnShieldedMarketGraph}
                                            yMin={LineYMin} yMax={LineYMax} portfolioTotalValue={FormatPortfolioValue} />)}
                                    </div>
                                </div>
                                <div className="forwardanalyze-portfolio">
                                    <div className="shieldstates">
                                        <div className="contentshield">
                                            <ul className="subnavbarmenu navtab">
                                                <li>
                                                    <a className={tabvalue === "Portfolio Return" ? "SUBITEM-selected " : "SUBITEM"} eventKey="Portfolio Return" onClick={() => handleTabChange('Portfolio Return')} > Portfolio Return <TooltipComponent id={"Portfolio Return"}></TooltipComponent></a>
                                                </li>
                                                <li>
                                                    <a className={tabvalue === "Relative Performance" ? "SUBITEM-selected" : "SUBITEM"} eventKey="Relative Performance" onClick={() => handleTabChange('Relative Performance')}>Relative Performance <TooltipComponent id={"Relative Performance"}></TooltipComponent></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <TabContainer defaultActiveKey={tabvalue}>
                                        <TabContent>
                                            <TabPane key="portfolio-return-tab" eventKey="Portfolio Return" active={tabvalue === 'Portfolio Return'} >
                                                <div className="barchart">
                                                    <PortfolioReturnGraph data={HistogramShieldedData} gradientId="colorUv1" xMin={HistXMin} xMax={HistXMax} yMax={HistYMax} />
                                                    <PortfolioReturnGraph data={HistogramUnShieldedData} gradientId="colorUv2" xMin={HistXMin} xMax={HistXMax} yMax={HistYMax} />
                                                </div>
                                            </TabPane>
                                            <TabPane key="relative-performance-tab" eventKey="Relative Performance" active={tabvalue === 'Relative Performance'}>
                                                <div className="barchart">
                                                    <PortfolioReturnGraph data={HistogramRelativeData} gradientId="colorUv3" />
                                                </div>
                                            </TabPane>
                                        </TabContent>
                                    </TabContainer>
                                </div>
                            </div>
                        </div>
                        {version === 1 &&
                            <div className="sectiondivide pb0 section-col">
                                <div className="getalerts">
                                    <div>
                                        <h3>Want to see downside protection personalized for your own portfolios? Request a pilot account to access our breakthrough technology.</h3>
                                    </div>
                                    <div class="forwardtest">
                                        <div class="main-header signupform ">
                                            <AddUser singupFor="forwardtest" buttonText="Request Account" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="sectiondivide pb0 section-col">
                            <div className="shieldstates">
                                <div className="contentshield">
                                    <ul className="subnavbarmenu navtab">
                                        <li>
                                            <a className={tabletabvalue === "Portfolio Details" ? "SUBITEM-selected " : "SUBITEM"} eventKey="Portfolio Details" onClick={() => handleTableTabChange('Portfolio Details')} >Portfolio Details</a>
                                        </li>
                                        <li>
                                            <a className={tabletabvalue === "Simulation Details" ? "SUBITEM-selected" : "SUBITEM"} eventKey="Simulation Details" onClick={() => handleTableTabChange('Simulation Details')}>Simulation Details</a>
                                        </li>
                                    </ul>
                                    <div className="table_holder">
                                        <TabContainer defaultActiveKey={tabletabvalue}>
                                            <TabContent>
                                                <TabPane eventKey="Portfolio Details" active={tabletabvalue === 'Portfolio Details'} >
                                                    <TableContainer className="table_height">
                                                        <Table stickyHeader aria-label="sticky table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    {portfolioDetailsTableHeaders.map((header, i) => (
                                                                        <TableCell key={i}>
                                                                            <div className="stck_table_heading">{header.title} <TooltipComponent id={header.title}></TooltipComponent></div>
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {Object.entries(PortfolioDetailsTable).map(([key, value]) => (
                                                                    <TableRow key={key}>
                                                                        <TableCell>{value.number}</TableCell>
                                                                        <TableCell>{value.Ticker}</TableCell>
                                                                        <TableCell>{value.Name}</TableCell>
                                                                        <TableCell>{value.quantity.toFixed(2)}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value["ClosePrice"]).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value["Market Value"]).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{Number(parseFloat(value["Weight"]).toFixed(2) * 100).toFixed(2)}%</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                            <TableFooter>
                                                                <TableRow>
                                                                    <TableCell colSpan="5">Total:</TableCell>
                                                                    <TableCell>{Number(
                                                                        addZeroes(Number(parseFloat(PortfolioDetailsTable.reduce((total, currentItem) => total = total + currentItem["Market Value"], 0)).toFixed(2)))
                                                                    ).toLocaleString("en-US", currObj)}</TableCell>
                                                                    <TableCell>100%</TableCell>
                                                                </TableRow>
                                                            </TableFooter>
                                                        </Table>
                                                    </TableContainer>
                                                </TabPane>
                                                <TabPane eventKey="Simulation Details" active={tabletabvalue === 'Simulation Details'}>
                                                    <TableContainer className="table_height">
                                                        <Table stickyHeader aria-label="sticky table">
                                                            <TableHead>
                                                                <TableRow>
                                                                    {SimulationDetailsTableHeaders.map((header, i) => (
                                                                        <TableCell key={i}>
                                                                            <div className="stck_table_heading">{header.title}</div>
                                                                        </TableCell>
                                                                    ))}
                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {Object.entries(SimulationDetailsTable).map(([key, value]) => (
                                                                    <TableRow key={value}>
                                                                        <TableCell>{value.path_number}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value.portfolio_value).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value.shielded_portfolio_value).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value.total_shield_cost).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value.total_shield_payoff).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value.average_shield_cost).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{Number(
                                                                            addZeroes(Number(parseFloat(value.average_shield_payoff).toFixed(2)))
                                                                        ).toLocaleString("en-US", currObj)}</TableCell>
                                                                        <TableCell>{parseFloat(value.percentage_shield_cost).toFixed(2)}%</TableCell>
                                                                        <TableCell>{parseFloat(value.percentage_shield_payoff).toFixed(2)}%</TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </TabPane>
                                            </TabContent>
                                        </TabContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
            {version === 2 &&
                <div className="sectiondivide pb0 section-col">
                    <div className="getalerts">
                        <div>
                            <h3>Want to see downside protection personalized for your own portfolios? Request a pilot account to access our breakthrough technology.</h3>
                        </div>
                        <div class="riskalert">
                            <div class="main-header signupform ">
                                <AddUser singupFor="forwardtest" buttonText="Request Account" />
                            </div>
                        </div>
                    </div>
                </div>
            }

            {version === 1 &&
                <div className="sectiondivide section-col ptsec">
                    <h3 className="sec-head">Forward Test FAQ (Frequently Asked Questions)</h3>
                    <div className="faqcon">
                        <div className="faq">
                            <h4 onClick={() => setShow(!show)}>1. What is Adaptive’s Forward Test tool? {show && <span className="minus">-</span>} {!show && <span>+</span>}</h4>
                            {show && <div className="content">
                                <p>Forward Test games out possible investment returns in the future, based on the risk of your portfolio and its components, by charting many possible paths and the likelihood of various outcomes.</p>
                                <p>The largest gains and losses tend to be the least likely, akin to the low probability for instance of repeated coin tosses which are almost all heads or almost all tails.</p>
                                <p>Forward Test also help you compare the effects of downside protection for a portfolio in limiting potential losses.</p>
                                <p>Forward Test is a form of Monte Carlo simulation, which can be helpful for making more informed decisions and managing risk, by considering a wide range of potential outcomes. Read more about the use of Monte Carlo simulation in finance at <a className="ai-link" href="https://www.investopedia.com/articles/investing/112514/monte-carlo-simulation-basics.asp" target="_blank">Investopedia</a> and <a className="ai-link" href="https://en.wikipedia.org/wiki/Monte_Carlo_methods_in_finance" target="_blank">Wikipedia</a>.</p>
                            </div>}
                        </div>
                        <div className="faq" id="faq2">
                            <h4 onClick={() => setShow2(!show2)}>2. What are some potential insights from adjusting settings in Adaptive’s Forward Test? {show2 && <span className="minus">-</span>} {!show2 && <span>+</span>}</h4>
                            {show2 && <div className="content">
                                <p>A key feature of Adaptive’s Forward Test is the ability to simulate the possible effects of downside protection, and to compare outcomes to a portfolio without downside protection. The interaction of Simulation Length, Protection Period, and Protection Level can affect these results.</p>
                                <p>Protection Renewals. If the Simulation Length is longer than Protection Period, say five years of Simulation Length and one year of Protection Period, then the simulation assumes renewals of the downside protection at the same Protection Level and Protection Period. This assumption can greatly affect simulation results in part because the Protection Level is expressed as a percentage, so renewals for a rising portfolio will have higher dollar levels of protection, and likewise renewals for a falling portfolio will have lower dollar levels of protection.</p>
                                <p>There are a few nuances: (1) any Protection Payouts are added to the market value of the portfolio, in effect simulating reinvestment at the lower prices and, in an overall rising market, using Protection Payouts to ‘buy the dips’ as a potentially potent form of countering <a className="ai-link" href="https://www.investopedia.com/articles/06/compoundingdarkside.asp" target="_blank">negative compounding</a>; (2) whether there are Protection Payouts or not, the Forward Test finances Protection renewals out of the market value of the portfolio, meaning that there is some rebalancing to maintain portfolio allocations; (3) the Forward Test uses the current implied market volatility as its assumption for the cost of any renewals during the simulations, but in the real world the cost of renewals will be affected by the market conditions which might price protection higher or lower than current levels.</p>

                            </div>}
                        </div>
                        <div className="faq" id="faq3">
                            <h4 onClick={() => setShow3(!show3)}>3. What are some limitations of Adaptive’s Forward Test tool? {show3 && <span className="minus">-</span>} {!show3 && <span>+</span>}</h4>
                            {show3 && <div className="content">
                                <p>Monte Carlo simulations such as Adaptive’s Forward Test tool are only as good as their assumptions about the probability of what is being simulated.</p>
                                <p>If these assumptions are incorrect or poorly calibrated, the simulation results may be inaccurate or misleading. To address this, it is important to use realistic and well-calibrated inputs, and to perform sensitivity analysis to test the robustness of the results to different assumptions.</p>
                                <p>Please contact us for more technical information. Forecasting tools tend to assume long-term growth in stocks, in keeping with long-term trends. Adaptive’s Forward Test, however, does not currently assume growth—instead it assumes a market on the whole that goes nowhere even though this likely underestimates the gains in long-term portfolios. Some of other Adaptive’s inputs include: historical returns for correlation estimates; implied volatility for calculating forward returns; and historical volatility, in part as a sanity check for implied volatility calculations.</p>
                            </div>}
                        </div>
                        <div className="faq" id="faq4">
                            <h4 onClick={() => setShow4(!show4)}>4. How can the Forward Test tool inform investment decisions? {show4 && <span className="minus">-</span>} {!show4 && <span>+</span>}</h4>
                            {show4 && <div className="content">
                                <p>Adaptive’s Forward Test tool is not investment advice. These kinds of simulations can be used to model the potential range of outcomes for different investment strategies or asset allocations. By comparing the distributions of potential returns, volatility, and downside risk for different scenarios, investors can make more informed decisions about which strategies to pursue and how to manage portfolios. <a className="ai-link" href="/demo/requestdemo" target="_blank">Request an Adaptive demo or pilot account to test drive our breakthrough fintech technology</a>. Pilot users can securely link brokerage accounts for automated risk analysis and downside protection pricing.</p>
                            </div>}
                        </div>
                        <div className="faq">
                            <h4 onClick={() => setShow5(!show5)}>5. What is downside protection? {show5 && <span className="minus">-</span>} {!show5 && <span>+</span>}</h4>
                            {show5 && <div className="content">
                                <p>Downside protection, often called a portfolio hedge, is a general term for investments and other agreements which pay off in market and portfolio declines. Common forms include ‘put options’ and futures contracts which require special expertise and trading permissions.</p>
                                <p>Downside protection can limit potential losses, thus reducing the overall risk of a portfolio even while staying invested for potential growth.</p>
                                <p>The cost of downside protection is a drag on a portfolio’s performance, compared to an unprotected portfolio. At the same time downside protection can sometimes lead to improved risk-adjusted returns as compared to buy-and-hold without protection, if protection proceeds are reinvested at lower prices in a portfolio which is growing over the long term.</p>
                            </div>}
                        </div>
                        <div className="faq">
                            <h4 onClick={() => setShow6(!show6)}>6. How do I request an Adaptive pilot account to manage investment risks? {show6 && <span className="minus">-</span>} {!show6 && <span>+</span>}</h4>
                            {show6 && <div className="content">
                                <p>Adaptive seeks to smooth out the ride—and level the playing field—so investors can stay invested for long-term growth with tools which are otherwise the province of the ultra high-net-worth. <a className="ai-link" href="/demo/requestdemo" target="_blank">Request an Adaptive demo or pilot account to test drive our breakthrough fintech technology</a>. Pilot users can securely link brokerage accounts for automated risk analysis and downside protection pricing.</p>
                            </div>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default React.memo(ForwardTest);