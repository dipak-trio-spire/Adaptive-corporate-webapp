import React, { useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import CustomPopup from "../../components/Popup/Popup";
import TagManager from "react-gtm-module";
import { addZeroes } from "../../utilites/AddZeros";
import { getEDTDate } from "../../utilites/ConvertDate";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import { UploadCsvFile } from "@/pages/api/UploadCsvFile";
import { FetchHaloRiskContribution } from "@/pages/api/FetchHaloRiskContribution";
import { AddMiscellaneousLogs } from '@/pages/api/AddMiscellaneousLogs';
import PageLoader from '@/components/PageLoader/PageLoader';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import RiskContributionGraph from '../../components/RiskContributionGraph/RiskContributionGraph';
import Link from 'next/link';
import WarningIcon from "@mui/icons-material/Warning";
import Close from "@mui/icons-material/Close";
import { Page, Document, Image as PDFImage, StyleSheet, pdf, Font, Text, Link as PDFLink } from '@react-pdf/renderer';
import Html from "react-pdf-html";
import domToImage from 'dom-to-image';
import ReactDOMServer from "react-dom/server";
import TooltipComponent from '../TooltipComponent/TooltipComponent';

const EditablePortfolioTable = dynamic(() => import('../PortfolioDetailsTable/EditablePortfolioTable'), { ssr: false });

Font.register({
    family: 'Inter-V',
    src: process.env.NEXT_PUBLIC_BASE_PATH + '/fonts/Inter-Regular.ttf'
});

Font.register({
    family: 'Inter-Medium',
    src: process.env.NEXT_PUBLIC_BASE_PATH + '/fonts/Inter-Medium.ttf'
});

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    image: {
        marginVertical: 15,
        textAlign: "left",
        height: 40,
        width: 75,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
        fontFamily: 'Inter-V'
    },
    footer: {
        position: "absolute",
        fontSize: 8,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "left",
        color: "#3E4968",
        paddingLeft: 30,
        paddingRight: 30,
        fontFamily: 'Inter-V'
    },
    summaryHeader: {
        color: "#3E4968",
        fontSize: 18,
        textAlign: "left",
        fontWeight: "bold",
        marginVertical: 15,
        fontFamily: 'Inter-V'
    },
    poweredText: {
        marginTop: 2,
        fontSize: 8,
        color: '#081a66',
        marginBottom: 15
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
    },
    tableheader: {
        backgroundColor: "#ffffff",
        borderRadius: 5,
        color: "#081a66",
        fontSize: 8,
        fontFamily: 'Inter-V',
        textTransform: 'uppercase',
        paddingBottom: 10
    },
    tablebody: {
        fontSize: 8,
        fontFamily: 'Inter-V',
        textTransform: 'capitalize',
    },
    tableRow: {
        height: 40,
        fontFamily: 'Inter-V',
        textTransform: 'capitalize',
    },
    tableCell: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '12.5%',
    },
    tableCellPositionName: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'left',
        paddingRight: 8,
    },
    tableCellNumber: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        // width: '12.5%',
        textAlign: 'right',
        paddingRight: 8
    },
    detailsHeader: {
        backgroundColor: "#e6e8f0",
        padding: 10,
        color: "#081a66",
        fontSize: 10,
        fontFamily: 'Inter-V'
    },

    summaryFooter: {
        backgroundColor: "#e6e8f0",
        padding: 10,
        color: "#081a66",
        fontSize: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'align-items',
        alignItems: 'center',
        fontFamily: 'Inter-V'
    },
    portfolioinfoBar: {
        border: '0.5px solid #081a66',
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        fontSize: 8,
        fontFamily: 'Inter-V'
    },

    Footnotes: {
        fontSize: 8,
        color: "#081a66",
        textAlign: "left",
        marginTop: 10,
        display: 'flex',
        fontFamily: 'Inter-Medium'
    },
    Faq: {
        marginTop: 20,
        marginBottom: 10,
        color: "#081a66",
        textAlign: "left",
        marginTop: 20,
        display: 'flex',
        fontSize: 8,
        fontFamily: 'Inter-Medium'
    },
    FaqNotes: {
        marginTop: 5,
        marginLeft: 10,
        marginBottom: 10,
        color: "#666666",
        fontSize: 8,
        fontFamily: 'Inter-Medium'
    },
    listItem: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        marginLeft: 10,
    },
});


function HaloRiskContribution({ initPortfolio, initPortfolioValue, initTickerData, hostname }) {

    var currObj = {
        style: "currency",
        currency: "USD",
    };
    const router = useRouter();
    const [chartDataURL, setChartDataURL] = React.useState(null);
    const chartRef = React.useRef();

    const [show, setShow] = useState(true);
    const [showTable, setShowTable] = useState(true);
    const [showFormPopup, setShowFormPopup] = React.useState(false);
    const [bdopen, setBdOpen] = React.useState(false);
    const [GotData, setGotData] = React.useState(true);
    const [popupState, setPopupState] = React.useState(false);
    const [csvPopupState, setCsvPopupState] = React.useState(false);
    const [popupMessage, setPopupMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("");
    const [popupLoginRedierct, setPopupLoginRedirect] = React.useState(false);
    const [riskCOntributionTableData, setRiskCOntributionTableData] = React.useState([]);
    const [riskCOntributionGraphData, setRiskCOntributionGraphData] = React.useState([]);
    const [riskPortfolioKeyList, setRiskPortfolioKeyList] = React.useState([]);
    const [PortfolioMarketValue, setPortfolioMarketValue] = React.useState(0);
    const [PortfolioRisk, setPortfolioRisk] = React.useState(0);
    const [MarketVolatility, setMarketVolatility] = React.useState(0);
    const [PortfolioRows, setPortfolioRows] = React.useState([]);
    const [totalIndividualRiskContribution, setTotalIndividualRiskContribution] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState();
    const [fileError, setFileError] = React.useState(null);
    const [tickerData, setTickerData] = useState([{ symbol: '', company_name: '', quantity: '', message: '',buyprice:'', market_value:'',format_market_value:'' }]);
    const [totalWeight, setTotalWeight] = useState(0);
    const [FilteredPLI, setFilteredPLI] = React.useState([]);
    const [userUuid, setUserUuid] = useState(localStorage.getItem('userUuid'));
    const [showImportData, setShowImportData] = React.useState(false);
    const [show1, setShow1] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    const [show3, setShow3] = React.useState(false);
    const [show4, setShow4] = React.useState(false);
    const [maxNormalizedRisk, setMaxNormalizedRisk] = React.useState();
    const [minNormalizedRisk, setMinNormalizedRisk] = React.useState();
    const [HistoricalRisk, setHistoricalRisk] = React.useState(0);
    const [IndexRisk, setIndexRisk] = React.useState();
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [selectedVixTicker, setSelectedVixTicker] = React.useState();
    let requestURL = window.location.href;
    let apiData = []

    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...tickerData];
        list[index][name] = name === 'symbol' ? value.toUpperCase() : value;
        list[index].message = '';
        setTickerData(list);
    };

    const checkTickerRecognition = (tickerData) => {
        const symbolsEntered = tickerData.map(ticker => ticker.symbol);
        const updatedTickerData = tickerData.map((tickerObj, index) => {
            const symbolEntered = tickerObj.symbol;
            const referenceTicker = initTickerData.find(refTicker => refTicker.symbol === symbolEntered);
            console.log(" ref ticker", referenceTicker)

            if (tickerObj.symbol.trim() !== '' && tickerObj.quantity.trim() === '') {
                return { ...tickerObj, message: 'Please add quantity' };
            } else if (!referenceTicker) {
                return { ...tickerObj, message: 'Symbol not recognized' };
            } else if (referenceTicker.status === 'insufficient data') {
                return { ...tickerObj, message: 'Insufficient data', company_name: referenceTicker.company_name };
            } else if (symbolsEntered.indexOf(symbolEntered) !== index) {
                return { ...tickerObj, message: 'This ticker has already been added' };
            } else {
                return { ...tickerObj, message: '', company_name: referenceTicker.company_name, buyprice:referenceTicker.buyprice, market_value: Number(parseFloat(referenceTicker.buyprice*tickerObj.quantity).toFixed(2)), format_market_value: Number(addZeroes(Number(parseFloat(referenceTicker.buyprice*tickerObj.quantity).toFixed(2)))).toLocaleString("en-US", currObj)};
            }
        });

        return updatedTickerData;
    };


    const handleAddClick = () => {
        const newList = checkTickerRecognition([...tickerData]);
        newList.push({ symbol: '', company_name: '', quantity: '', message: '' ,buyprice:'', market_value:'',format_market_value:''});
        setTickerData(newList);
    };

    const handleResetClick = () => {
        setTickerData([{ symbol: '', company_name: '', quantity: '', message: '',buyprice:'', market_value:'',format_market_value:'' }]);
    }

    const handleDeleteClick = (index) => {
        const list = [...tickerData];
        list.splice(index, 1);
        if (list.length === 0) {
            list.push({ symbol: '', company_name: '', quantity: '', message: '' ,buyprice:'', market_value:'',format_market_value:''});
        }
        setTickerData(list);
    };

    async function GetPortfolioTable(data) {
        try {
            var lyst = [];
            for (let [key, value] of Object.entries(data)) {
                lyst.push({
                    symbol: key,
                    name: value["Name"],
                    weight: value["Allocation"],
                    mutual_fund_ticker: value["mutual_fund_ticker"],
                    mutual_fund_name: value["mutual_fund_name"],
                });
            }
            setPortfolioRows([...lyst])
        } catch (e) {
            console.log(e.message);
        }
    }
    const csvFileBase64 = "U3ltYm9sLFF1YW50aXR5CkdPT0csOTAKTkZMWCwxMzAKTUVUQSwxMDAKQU1aTiwxMApUU0xBLDUwCkFBUEwsMTAw";

    function downloadCSVFile(e) {
        e.preventDefault();
        const element = document.createElement("a");
        const file = new Blob([atob(csvFileBase64)], { type: "text/csv;charset=utf-8" });
        element.href = URL.createObjectURL(file);
        element.download = "SampleTemplate.csv";
        document.body.appendChild(element);
        element.click();
    }

    React.useEffect(() => {
        const ShowRiskData = localStorage.getItem('ShowRiskData')
        const CsvData = JSON.parse(localStorage.getItem('CsvData'))
        if (CsvData && CsvData["recognised"]) {
            if (ShowRiskData === 'true') {
                apiData = CsvData["recognised"].map(item => ({ ticker: item.symbol, quantity: item.quantity }));
                setTickerData(CsvData["recognised"].map(item => ({
                    symbol: item.symbol,
                    quantity: item.quantity.toString(),
                    company_name: item.company_name,
                    buyprice:item.buyprice, 
                    market_value: Number(parseFloat(item.buyprice*item.quantity).toFixed(2)), 
                    format_market_value: Number(addZeroes(Number(parseFloat(item.buyprice*item.quantity).toFixed(2)))).toLocaleString("en-US", currObj)
                })));
                setShowImportData(true)
                fetchRiskContribute(!localStorage.getItem('ShowRiskData'));
            }
        }
        localStorage.removeItem('CsvData')
        localStorage.removeItem('ShowRiskData')
    }, []);

    const totalSums = riskCOntributionTableData.reduce((acc, curr) => {
        acc.marketValue += curr.market_value;
        acc.marketWeight += (curr.market_value / PortfolioMarketValue) * 100;
        acc.marketContribution += curr.market_contribution;
        acc.idiosyncraticContribution += curr.idiosyncratic_portion;
        acc.totalRiskContribution += curr.risk_contributions;
        acc.diversifiedRisk += curr.isolated_risk;
        return acc;
      }, { marketValue: 0, marketWeight: 0, marketContribution: 0, idiosyncraticContribution: 0, totalRiskContribution: 0, diversifiedRisk: 0 });
    
    const fetchRiskContribute = (calcFlag) => {
        if (userUuid) {
            setBdOpen(true);
            setShow(false);

            if (calcFlag) {
                const updatedTickerData = checkTickerRecognition(tickerData);
                setTickerData(updatedTickerData);
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
            }
            setBdOpen(true);
            setFilteredPLI(apiData);
            FetchHaloRiskContribution(apiData, userUuid, requestURL, "Calculate Portfolio").then((data) => {
                if(data.result){
                    const vix_data = data.result.graph_data['vix']['6mo']['closeprice'];
                    const vix_value = parseFloat(vix_data[vix_data.length - 1]).toFixed(2);
                    let lyst = [];
                    let i = 1;
                    let maxNormalizedRisk = 0;
                    let minNormalizedRisk = 0;
                    setRiskPortfolioKeyList(Object.keys(data.result));
                    for (let [key, value] of Object.entries(data.result["risk_contribution"])) {
                      const normalizedRisk = (parseFloat(value["isolated_risk"] + parseFloat(value["risk_contributions"])) / data.result.portfolio_risk) * 100;
                      const normalizedMarketRisk = Math.max((parseFloat(value["market_contribution"]) / data.result["portfolio_risk"]) * 100,0)
                      minNormalizedRisk = Math.min(minNormalizedRisk,normalizedMarketRisk)
                      maxNormalizedRisk = Math.max(maxNormalizedRisk, normalizedRisk);
                      lyst.push({
                        sr: i,
                        symbol: key,
                        position_name: value["Name"],
                        market_value: value["Market Value"],
                        stock_volatility: value["individual stock_volatility"],
                        risk_contributions: parseFloat(value["risk_contributions"]),
                        market_contribution: Math.max(parseFloat(value["market_contribution"]),0),
                        isolated_risk: parseFloat(value["isolated_risk"]),
                        idiosyncratic_portion: parseFloat(value["idiosyncratic_portion"]),
                        vix_value: vix_value,
                        TradeDate: value["TradeDate"],
                        normalizedMarketRisk: Math.max((parseFloat(value["market_contribution"]) / data.result["portfolio_risk"]) * 100,0),
                        normalizedIdioRisk: (parseFloat(value["risk_contributions"]) / data.result["portfolio_risk"]) * 100,
                        normalizedIsoRisk: (parseFloat(value["isolated_risk"] + parseFloat(value["risk_contributions"])) / data.result["portfolio_risk"]) * 100,
                      });
                      i++;
                    }
                    lyst.sort((a, b) => (b.risk_contributions+b.idiosyncratic_portion) - (a.risk_contributions + a.idiosyncratic_portion));
                    setRiskCOntributionTableData([...lyst]);
                    setRiskCOntributionGraphData([...lyst.slice(0, 10)]);
                    setMaxNormalizedRisk(maxNormalizedRisk)
                    setPortfolioMarketValue(data.result["portfolio_market_value"]);
                    setMinNormalizedRisk(minNormalizedRisk);
                    setPortfolioRisk(data.result["portfolio_risk"]);
                    setHistoricalRisk(data.result["historical_market_risk"]);
                    console.log("vix_value", vix_value)
                    setIndexRisk(vix_value);
                    setTotalIndividualRiskContribution(data.result['total_individual_risk_contribution']);
                    setTimeout(() => {
                      captureAndDispatchData('Data Available', data, lyst ,data.result["historical_market_risk"], data.result["portfolio_risk"],data.result["portfolio_market_value"],vix_all_data);
                    }, 1000);
                    const formattedVixTicker = `${data.result["vix_ticker"].slice(1)} [${data.result["selected_index"]} Volatility]`;
                    setSelectedIndex(data.result["selected_index"]);
                    setSelectedVixTicker(formattedVixTicker);
                    setBdOpen(false);
                    TagManager.dataLayer({
                        dataLayer: {
                            event: 'User used Halo Risk Contribution'
                        },
                    });
                    setShow(false);
                } else if (data === false) {
                    setBdOpen(false);
                    setPopupState(true);
                    setShow(true);
                    setPopupMessage(
                        "No Portfolios are available for this user, redirecting you to portfolio upload page."
                    );
                    setAlertType("error");
                } else if (data === 0 || data === undefined) {
                    setBdOpen(false);
                    setPopupState(true);
                    setShow(true);
                    setPopupMessage(
                        "We are facing issues connecting our servers, please try again later"
                    );
                    setAlertType("error");
                    setPopupLoginRedirect(false);
                    return;
                } else if (data === 401) {
                    setBdOpen(false);
                    setPopupState(true);
                    setShow(true);
                    setPopupMessage(
                        "Your session has timed out, Please sign in again"
                    );
                    setAlertType("error");
                    setPopupLoginRedirect(true);
                }
            });
        }
    }

    const handleFileRead = async (file) => {
        const userUuidStored = localStorage.getItem('userUuid');
        if (userUuidStored) {
            const reader = new FileReader();
            reader.onloadend = (onLoadEndEvent) => {
                UploadCsvFile(onLoadEndEvent.target.result.split(",")[1], userUuidStored, requestURL, "Import Csv").then((data) => {
                    if (data !== false && data !== 0 && data !== 401 && data !== 404) {
                        setGotData(true);
                        localStorage.setItem('CsvData', JSON.stringify(data))
                        router.push('/tools/importsummary');
                    } else if (data === false) {
                        setBdOpen(false);
                        setGotData(true);
                        setCsvPopupState(true);
                    } else if (data === 0) {
                        setBdOpen(false);
                        setGotData(true);
                        setCsvPopupState(true);
                    }
                    else if (data === 401) {
                        setBdOpen(false);
                        setPopupState(true);
                        setPopupMessage(
                            "Your session timed out for security reasons. Please sign-in again."
                        );
                        setAlertType("error");
                    }
                    else if (data === 401) {
                        setBdOpen(false);
                        setPopupState(true);
                        setPopupMessage(
                            "Your session was terminated for security reasons. Please sign-in again."
                        );
                        setAlertType("error");
                        setPopupLoginRedirect(true);
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const onDrop = React.useCallback((event) => {
        setBdOpen(true);
        event.preventDefault();
        if (event.dataTransfer.items) {
            let file = event.dataTransfer.items[0].getAsFile();
            var fileExt = file.name.split('.').pop();
            var fileExt = file.name.split('.').pop();
            console.log(" file", file, fileExt);
            var fileExt = file.name.split('.').pop();
            console.log(" file", file, fileExt);
            if (fileExt !== "csv") {
                setFileError('File format is not recognized. Please upload a valid CSV file');
                setBdOpen(false);
                return;
            }
            handleFileRead(file);
            setSelectedFile(file);
            setFileError(null);
        }
    }, [router]);

    const onFileChange = (event) => {
        setBdOpen(true);
        const [file] = event.target.files;
        var fileExt = file.name.split('.').pop();
        if (fileExt !== "csv") {
            setFileError('File format is not recognized. Please upload a valid CSV file');
            setBdOpen(false);
            return;
        }
        handleFileRead(file);
        setSelectedFile(file);
        setFileError(null);
    };

    const element_1 = (
        <html>
            <body>
                <div style={styles.portfolioinfoBar}>
                    <p>Holdings: {riskCOntributionTableData.length}</p>
                    <p>Portfolio Value: ${" "}{Number(addZeroes(Number(parseFloat(PortfolioMarketValue).toFixed(2)))).toLocaleString()}</p>
                    <p>{getEDTDate()}</p>
                </div>
            </body>
        </html>
    );

    const element_2 = (
        <html>
            <body>
                <div>
                    <div style={styles.detailsHeader}>
                        <p>Portfolio Details</p>
                    </div>
                    <table>
                        <thead style={styles.tableheader}>
                            <tr>
                                <th style={styles.tableCell}>#</th>
                                <th style={styles.tableCell}>Symbol</th>
                                <th style={styles.tableCellPositionName}>Position Name</th>
                                <th style={styles.tableCell}>Quantity</th>
                                <th style={styles.tableCell}>Stock Volatility</th>
                                <th style={styles.tableCellNumber}>Market Value</th>
                                <th style={styles.tableCellNumber}>Market Weight</th>
                                <th style={styles.tableCellNumber}>Market Contribution</th>
                                <th style={styles.tableCellNumber}>Idiosyncratic Contribution</th>
                                <th style={styles.tableCellNumber}>Total Risk Contribution</th>
                                <th style={styles.tableCellNumber}>Diversified Risk</th>
                            </tr>
                        </thead>
                        <tbody style={styles.tablebody}>
                            {riskCOntributionTableData.map((row, index) => (
                                <tr key={index} style={styles.tableRow}>
                                    <td style={styles.tableCell}>{index + 1}</td>
                                    <td style={styles.tableCell}>{row.symbol}</td>
                                    <td style={styles.tableCellPositionName}>{row.position_name}</td>
                                    <td style={styles.tableCell}>{(row.stock_volatility).toFixed(2)}</td>
                                    <td style={styles.tableCellNumber}>{Number(
                                                addZeroes(Number(parseFloat(row.market_value).toFixed(2)))
                                            ).toLocaleString("en-US", currObj)}</td>
                                    <td style={styles.tableCellNumber}>{((row.market_value / PortfolioMarketValue) * 100).toFixed(2)}%</td>
                                    <td style={styles.tableCellNumber}>{row.market_contribution}</td>
                                    <td style={styles.tableCellNumber}>{row.idiosyncratic_portion}</td>
                                    <td style={styles.tableCellNumber}>{row.risk_contributions}</td>
                                    <td style={styles.tableCellNumber}>{row.isolated_risk}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={styles.summaryFooter}>
                        <p>Portfolio Total: </p>
                        <p style={{ fontSize: 8, color: '#081a66', marginLeft: 210 }}>{parseFloat(totalWeight).toFixed(2)}%</p>
                        <p style={{ fontSize: 8, color: '#081a66', marginLeft: 20 }}>${" "} {Number(
                            addZeroes(Number(parseFloat(PortfolioMarketValue).toFixed(2)))
                        ).toLocaleString("en-US", currObj)}</p>
                        <p style={{ fontSize: 8, color: '#081a66', marginLeft: 30 }}>{totalSums.marketContribution.toFixed(3)}</p>
                        <p style={{ fontSize: 8, color: '#081a66', marginLeft: 30 }}>{totalSums.idiosyncraticContribution.toFixed(4)}</p>
                        <p style={{ fontSize: 8, color: '#081a66', marginLeft: 30 }}>{Number(parseFloat(PortfolioRisk).toFixed(3))}</p>
                        <p style={{ fontSize: 8, color: '#081a66', marginLeft: 30 }}>{totalSums.diversifiedRisk.toFixed(3)}</p>
                    </div>
                    <div style={styles.Footnotes}>
                        <p style={{ fontSize: 8, color: '#081a66' }}>
                            <b>Portfolio Risk</b> is the annualized daily historical volatility of the portfolio over the last five years, which can be compared with the historical volatility of the S&P 500 market index.
                        </p>
                        <p style={{ fontSize: 8, color: '#081a66' }}>
                            <b>S&P 500 Risk</b> is the annualized daily historical volatility of the market index over the last five years, as indicated by the light blue horizontal line.
                        </p>
                        <p style={{ fontSize: 8, color: '#081a66' }}>
                            <b>Risk Contribution</b> measures how much of the portfolio’s risk is coming from a single position, including benefits from portfolio diversification.
                        </p>
                        <p style={{ fontSize: 8, color: '#081a66' }}>
                            <b>Standalone Risk</b> is the annualized daily historical volatility of a particular stock (or ETF) over the last five years.
                        </p>
                    </div>
                    <div style={styles.Faq}>
                        <p style={{ color: '#242424', fontWeight: 'bold' }}> 1. What is Adaptive’s Portfolio Risk Contribution tool?</p>
                        <div style={styles.FaqNotes}>
                            <p>Portfolio Risk Contribution attributes portfolio risk to individual holdings in a portfolio, which is a function of the historical volatility of the individual holdings, the market-value weight of the holdings in the portfolio, and the correlation of the holding to the rest of the portfolio. It helps you identify where risk is coming from.</p>
                            <div>
                                <p style={styles.listItem}>
                                    <span style={{ color: '#242424', fontWeight: 'bold' }}>• Bars Show Risk Contribution of Position.</span>  Each bar reflects how much of the overall portfolio’s volatility comes from a specific holding, which is a function in part of the weight of that holding in the portfolio. Bars for all portfolio positions should sum to 100%, though the total may be subject to rounding errors.
                                    There are some nuances. Please contact us for more technical information—bars are computed using not only the weight of the stock in the portfolio and the historical volatility of the stock, but also an adjustment based on the correlation of such stock with the rest of the portfolio. This calculates a “marginal” risk contribution, that is changes in the Portfolio Risk when adding an additional unit of said stock. Because of the correlation adjustments, a negatively correlated position will have a negative bar height signifying negative Risk Contribution—reducing the weight of a negatively correlated position, in other words will raise Portfolio Risk, and increasing the weight of a negatively correlated position will reduce Portfolio Risk. The portfolio’s overall risk may be lower than individual components thanks to the benefits of diversification, which is a powerful allocation strategy for reducing risk. Read more about ‘diversification’ at <a href="https://www.investopedia.com/terms/d/diversification.asp" target="_blank" style={{ color: '#ffa654', fontWeight: 'bold' }}>Investopedia</a> and <a href="https://en.wikipedia.org/wiki/Diversification_(finance)" target="_blank" style={{ color: '#ffa654', fontWeight: 'bold' }}>Wikipedia</a>.</p>
                                <p style={styles.listItem}>
                                    <span style={{ color: '#242424', fontWeight: 'bold' }}>• Dots Show Standalone Risk</span>. The dots show volatility of an individual stock (or ETF), as measured by the holding’s annualized daily historical volatility over the last five years. Dots, in contrast to bars, are not affected by a position’s weight in the portfolio.</p>
                                <p style={styles.listItem}>
                                    <span style={{ color: '#242424', fontWeight: 'bold' }}>• Horizontal Blue Line Shows Market Risk</span>. We currently use the S&P 500 annualized daily historical volatility over the last five years as our measure of market risk, though this may be refined further in the future. Read more about the S&P 500 at <a href="https://en.wikipedia.org/wiki/S%26P_500" target="_blank" style={{ color: '#ffa654', fontWeight: 'bold' }}>Wikipedia</a>, <a href="https://www.investopedia.com/terms/s/sp500.asp" target="_blank" style={{ color: '#ffa654', fontWeight: 'bold' }}>Investopedia</a>, and <a href="https://www.spglobal.com/spdji/en/indices/equity/sp-500/#overview" target="_blank" style={{ color: '#ffa654', fontWeight: 'bold' }}> S&P Dow Jones Indices.</a>
                                </p>
                            </div>
                            <p>Halo is the first marketplace dedicated to protective investment solutions.  <a href="https://haloinvesting.com/request-access/" target="_blank" style={{ color: '#ffa654', fontWeight: 'bold' }}> Reach out to learn how Halo helps financial advisors find investments with flexible return & protection options for client portfolios.</a></p>
                        </div>
                    </div>
                    <div style={styles.Footnotes}>
                        <p style={{ fontSize: 7, color: '#666666' }}>
                            Halo Investing is not a broker/dealer. Securities offered through Halo Securities LLC, a SEC-registered broker/dealer and member of FINRA/SIPC. Halo Securities LLC is affiliated with Halo Investing. Halo Securities LLC acts solely as distributor/selling agent and is not the guarantor of any structured note products. Check the background of Halo Securities LLC on FINRA BrokerCheck. 2023 copyright Halo Investing
                        </p><br></br>
                        <p style={{ fontSize: 7, color: '#666666' }}>
                            Adaptive Investment Solutions LLC is not a broker/dealer. Investment advice is offered through Adaptive Advisers LLC, a SEC-registered advisor which is affiliated with Adaptive Investment Solutions LLC. Adaptive Advisers LLC is not the guarantor of any downside protection. Check the background of Adaptive Advisers LLC on FINRA BrokerCheck. <br></br>2023 copyright Adaptive Investment Solutions LLC
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );

    const html_1 = ReactDOMServer.renderToStaticMarkup(element_1);
    const html_2 = ReactDOMServer.renderToStaticMarkup(element_2);
    const MyDocument = ({ chartDataURL }) => (
        <Document>
            <Page size="A4" style={styles.body}>
                <PDFImage src="Assets/Halo/Halo-logo.png" style={{ width: 80, height: 30 }} />
                <Text style={styles.poweredText}>
                    Powered by Adaptive <PDFLink style={styles.link} src="https://adaptive-investments.com">(adaptive-investments.com)</PDFLink>
                </Text>
                <Html resetStyles>{html_1}</Html>
                <PDFImage style={{ height: 270 }} src={chartDataURL} />
                <Html resetStyles>{html_2}</Html>
            </Page>
        </Document>
    );

    const handleDownload = () => {
        setBdOpen(true);
        domToImage.toPng(chartRef.current).then((dataUrl) => {
            setChartDataURL(dataUrl);

            const doc = <MyDocument chartDataURL={dataUrl} />;
            const pdfBlob = pdf(doc).toBlob();

            pdfBlob.then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'PortfolioReport.pdf';
                link.click();
                URL.revokeObjectURL(url);
                AddMiscellaneousLogs(FilteredPLI, userUuid, requestURL, "Download Result").then((data) => {
                    console.log("Logging Download Activity");
                })
                setBdOpen(false)
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'Halo Risk Report Downloaded',
                    },
                });
            });
        }).catch((error) => {
            setBdOpen(false)
            console.error("dom-to-image error:", error);
        });
    };

    React.useEffect(() => {
        const userUuidStored = localStorage.getItem('userUuid');
        const expirationDate = localStorage.getItem('uuidExpiration');

        if (expirationDate && new Date(expirationDate) < new Date()) {
            localStorage.removeItem('userUuid');
            localStorage.removeItem('uuidExpiration');
            setShowFormPopup(true);
        } else if (userUuidStored) {
            setUserUuid(userUuidStored);
            setShowFormPopup(false);
        } else {
            setShowFormPopup(true);
        }
    }, []);

    const handleClose = (uuid) => {
        setUserUuid(uuid);
        setShowFormPopup(false);
    };

    return (
        <>
            <PageLoader bdopen={bdopen} hostname={hostname} />
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title="Run Risk Contribution"
                alertType={alertType}
                content={popupMessage}
                loginRedirect={popupLoginRedierct}
            />
            {showFormPopup === true && (
                <div className="overlay">
                    <div className="pop-up apipop">
                        <RegistrationForm closePopup={handleClose} />
                    </div>
                </div>
            )}
            {
                csvPopupState ? (
                    <div className="popup">
                        <div className="error">
                            <div className="popup-object">
                                <div className="heading">
                                    <WarningIcon className="icon" style={{ color: "orange" }} />
                                    <span style={{ color: "#081A66" }}>CSV Import Failed</span>
                                    <Close className="icon" style={{ color: "error", cursor: "pointer" }} onClick={() => setCsvPopupState(false)} />
                                </div>
                                <div className="body-message">
                                    <p>
                                        CSV format not recognized.<a href="#" onClick={downloadCSVFile}> Download example CSV</a>, or enter manually.
                                    </p>
                                </div>
                                <button
                                    className="ai-btn primary solid"
                                    style={{ alignItems: "center" }}
                                    onClick={() => setCsvPopupState(false)}
                                >
                                    {" "}
                                    OK{" "}
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            <div className="sectiondivide pb0">
                <h3> Please enter or upload your portfolio </h3>
            </div>
            <div className="sectiondivide tablepart tables risktable pt0 halocard">
                <div className="collapse tickrdata">
                    <h4 onClick={() => setShow(!show)}>Portfolio Details {show && <span className="minus">-</span>} {!show && <span>+</span>}</h4>
                    {show && <div className="tablecon portfolioinp">
                        <div className='halotblscroll'>
                            <EditablePortfolioTable
                                tickerData={tickerData}
                                handleInputChange={handleInputChange}
                                handleDeleteClick={handleDeleteClick}
                            />
                        </div>
                        <div className='tikerdatabtn'>
                            <div className='left'>
                                <a className='ai-btn primary solid' onClick={handleAddClick}>Add ticker</a>
                            </div>
                            <div className='right'>
                                <a className='ai-btn primary solid' onClick={() => fetchRiskContribute(true)}>Calculate</a>
                                <a className='ai-btn primary solid' onClick={handleResetClick}>Reset</a>
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className='haloor'><span>OR</span></div>
                <div
                    className="upload-section"
                    id="upload-section"
                    onDrop={onDrop}
                    onDragOver={(event) => event.preventDefault()}
                >
                    <input
                        type="file"
                        id="file-upload"
                        accept=".csv"
                        onChange={onFileChange}
                        style={{ display: 'none' }}
                    />
                    <div class="text-container">
                        <label className="full-label" htmlFor="file-upload">
                            <img src="Assets/documents-file-excel.svg" alt="Click here to Upload Csv or Drag & Drop file here" />
                            <p> Drag & Drop portfolio CSV here <a href="#" onClick={downloadCSVFile}>(example CSV)</a> or click to upload.<br></br>
                                {selectedFile && <span className='c-secondary'>{selectedFile.name}</span>}
                            </p>
                        </label>
                        {fileError && <p className="file-error">{fileError}</p>}
                    </div>
                </div>
            </div>
            {riskCOntributionGraphData.length !== 0 &&
                <div className="sectiondivide pb0 sectioncol pt0i">
                    <div className='halonotice'>
                        Interested in managing this risk? Further information at <Link target='_blank' href='https://haloinvesting.com/request-access/'>https://haloinvesting.com/request-access/</Link>
                    </div>
                </div>
            }
            <div id='divToPrint'>
                <div className="sectiondivide pb0 sectioncol pt0i">
                    <div id='divToPrint' ref={chartRef}>
                        <div className="riskhead p0i">
                            <h2>Top 10 Risk Contribution</h2>
                            <div className="riskstate halorisk">
                                <div className="riskstate">
                                    <h3 id="portfoliorisk">{PortfolioRisk.toFixed(2)}</h3>
                                    <div className="lblrisk">Portfolio Volatility
                                        <TooltipComponent id={'Portfolio Risk'} />
                                    </div>
                                </div>
                                <div className="riskstate">
                                    <h3 id="portfoliorisk">{HistoricalRisk.toFixed(2)}</h3>
                                    <div className="lblrisk">Index Volatility
                                        <>
                                            &nbsp;<img src="Assets/risk-info.png" title= {`Historical ${selectedIndex} Volatility`}></img>
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className='riskmodes'>
                            <div><span className='risk'></span>Risk Contribution
                            </div>
                            <div><span className='position'></span>Position Risk
                            </div>
                            <div><span className='vix'></span>S&P 500 Risk</div>
                        </div> */}
                        <div className="riskchart">
                            <p className='chartlbl left'>Annualized Volatility</p>
                            {riskCOntributionGraphData && 
                            <RiskContributionGraph data={riskCOntributionGraphData}
                                maxNormalizedRisk={maxNormalizedRisk}
                                totals={{
                                    marketContributionTotal: parseFloat(totalSums.marketContribution.toFixed(3)),
                                    idiosyncraticPortionTotal: parseFloat(totalSums.idiosyncraticContribution.toFixed(4)),
                                    isolatedRiskTotal: parseFloat(totalSums.diversifiedRisk.toFixed(3))
                                }} hostname={hostname} 
                            />}
                            <p className='chartlbl right'>Pct Of Portfolio Volatility</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sectiondivide pb0 sectioncol pt0i">
                <div className="portfolio-table contributio-table">
                    <div className="table_holder table_head risk">
                        <h3 onClick={() => setShowTable(!showTable)}>Portfolio Details {showTable && <span className="minus">-</span>} {!showTable && <span>+</span>}</h3>
                        {showTable &&
                            <TableContainer className="table_height">
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell size="small">#</TableCell>
                                            <TableCell>Symbol</TableCell>
                                            <TableCell>Position Name</TableCell>
                                            <TableCell>Stock Volatility</TableCell>
                                            <TableCell>Market Value</TableCell>
                                            <TableCell>Market Weight</TableCell>
                                            <TableCell>Market Contribution</TableCell>
                                            <TableCell>Idiosyncratic Contribution</TableCell>
                                            <TableCell>Total Risk Contribution </TableCell>
                                            <TableCell>Diversified Risk</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {riskCOntributionTableData.map((value, i) => (
                                            <TableRow key={i} >
                                                <TableCell>{value.sr}</TableCell>
                                                <TableCell>{value.symbol}</TableCell>
                                                <TableCell>{value.position_name}</TableCell>
                                                <TableCell>{(value.stock_volatility).toFixed(2)}</TableCell>
                                                <TableCell>
                                                {Number(
                                                    addZeroes(Number(parseFloat(value.market_value).toFixed(2)))
                                                ).toLocaleString("en-US", currObj)}
                                                </TableCell>
                                                <TableCell>{((value.market_value / PortfolioMarketValue) * 100).toFixed(2)}%</TableCell>
                                                <TableCell>{value.market_contribution}</TableCell>
                                                <TableCell>{value.idiosyncratic_portion}</TableCell>
                                                <TableCell>{value.risk_contributions}</TableCell>
                                                <TableCell>{value.isolated_risk}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan="3">Portfolio Total:</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>{Number(
                                                addZeroes(Number(parseFloat(PortfolioMarketValue).toFixed(2)))
                                            ).toLocaleString("en-US", currObj)}</TableCell>
                                            <TableCell>100 %</TableCell>
                                            <TableCell>{totalSums.marketContribution.toFixed(3)}</TableCell>
                                            <TableCell>{totalSums.idiosyncraticContribution.toFixed(4)}</TableCell>
                                            <TableCell>{Number(parseFloat(PortfolioRisk).toFixed(3))} </TableCell>
                                            <TableCell>{totalSums.diversifiedRisk.toFixed(3)}</TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        }
                    </div>
                    {!show &&
                        <div className="sectiondivide pb0 sectioncol pt0i">
                            <button className='ai-btn primary solid' onClick={handleDownload}>Download PDF</button>
                        </div>
                    }
                </div>
            </div>
            <div className="sectiondivide sectioncol ptsec">
                <h3 className="sec-head">Risk Contribution FAQ (Frequently Asked Questions)</h3>
                <div className="faqcon">
                    <div className="faq" id="faq1">
                        <h4 onClick={() => setShow1(!show1)}>1. What is Adaptive’s Portfolio Risk Contribution tool?{show1 && <span className="minus">-</span>} {!show1 && <span>+</span>}</h4>
                        {show1 && <div className="content">
                            <p>Portfolio Risk Contribution attributes portfolio risk to individual holdings in a portfolio, which is a function of the historical volatility of the individual holdings, the market-value weight of the holdings in the portfolio, and the correlation of the holding to the rest of the portfolio. It helps you identify where risk is coming from.</p>
                            <ul>
                                <li><b>Bars Show Risk Contribution of Position</b>. Each bar reflects how much of the overall portfolio’s volatility comes from a specific holding, which is a function in part of the weight of that holding in the portfolio. Bars for all portfolio positions should sum to 100%, though the total may be subject to rounding errors.
                                    There are some nuances. Please contact us for more technical information—bars are computed using not only the weight of the stock in the portfolio and the historical volatility of the stock, but also an adjustment based on the correlation of such stock with the rest of the portfolio. This calculates a “marginal” risk contribution, that is changes in the Portfolio Risk when adding an additional unit of said stock. Because of the correlation adjustments, a negatively correlated position will have a negative bar height signifying negative Risk Contribution—reducing the weight of a negatively correlated position, in other words will raise Portfolio Risk, and increasing the weight of a negatively correlated position will reduce Portfolio Risk. The portfolio’s overall risk may be lower than individual components thanks to the benefits of diversification, which is a powerful allocation strategy for reducing risk. Read more about ‘diversification’ at <a href="https://www.investopedia.com/terms/d/diversification.asp" target="_blank" className="ai-link">Investopedia</a> and <a href="https://en.wikipedia.org/wiki/Diversification_(finance)" target="_blank" className="ai-link">Wikipedia</a>.
                                </li>
                                <li><b> Dots Show Standalone Risk</b>. The dots show volatility of an individual stock (or ETF), as measured by the holding’s annualized daily historical volatility over the last five years. Dots, in contrast to bars, are not affected by a position’s weight in the portfolio.</li>
                                <li><b>Horizontal Blue Line Shows Market Risk</b>. We currently use the S&P 500 annualized daily historical volatility over the last five years as our measure of market risk, though this may be refined further in the future. Read more about the S&P 500 at <a href="https://en.wikipedia.org/wiki/S%26P_500" target="_blank" className="ai-link">Wikipedia</a>, <a href="https://www.investopedia.com/terms/s/sp500.asp" target="_blank" className="ai-link">Investopedia</a>, and <a href="https://www.spglobal.com/spdji/en/indices/equity/sp-500/#overview" target="_blank" className="ai-link"> S&P Dow Jones Indices.</a>
                                </li>
                            </ul>
                            <p>Halo is the first marketplace dedicated to protective investment solutions.  <a href="https://haloinvesting.com/request-access/" target="_blank" className="ai-link"> Reach out to learn how Halo helps financial advisors find investments with flexible return & protection options for client portfolios.</a></p>
                        </div>}
                    </div>
                    <div className="faq" id="faq2">
                        <h4 onClick={() => setShow2(!show2)}>2. Why is understanding individual risk contribution important?{show2 && <span className="minus">-</span>} {!show2 && <span>+</span>}</h4>
                        {show2 && <div className="content">
                            <p>Understanding your portfolio&apos;s top risk contributors helps manage portfolio risk. Possible insights include:</p>
                            <ul>
                                <li><b>Diversification.</b> The portfolio’s overall risk may be lower than individual components thanks to the benefits of diversification, which is a powerful allocation strategy for reducing risk. Read more about the finance use of ‘diversification’ at <a href="https://www.investopedia.com/terms/d/diversification.asp" target="_blank" className="ai-link">Investopedia</a> and <a href="https://en.wikipedia.org/wiki/Diversification_(finance)" target="_blank" className="ai-link">Wikipedia</a>.</li>
                                <li><b>Standalone Risk and Weight.</b> Sometimes you will see that a more volatile position (higher dot) can contribute less to the overall portfolio risk (shorter bar) than a less volatile position which has a bigger Weight in the portfolio. Volatile Tesla (TSLA), for example, may not be a big source of portfolio risk if it is relatively a small holding compared to a less volatile holding such as Pfizer (PFE). Compare “Weight” and “Risk Contribution” to see if an individual position is responsible for more or less risk in the portfolio than its weighting would otherwise suggest—for instance, if Tesla (TSLA) is one quarter (Weight, 25%) of the portfolio, is it more or less than one quarter of the Risk Contribution? </li>
                            </ul>
                            <p>Halo is the first marketplace dedicated to protective investment solutions.  <a href="https://haloinvesting.com/request-access/" target="_blank" className="ai-link"> Reach out to learn how Halo helps financial advisors find investments with flexible return & protection options for client portfolios.</a></p>
                        </div>}
                    </div>
                    <div className="faq" id="faq3">
                        <h4 onClick={() => setShow3(!show3)}>3. What are protective investment solutions? {show3 && <span className="minus">-</span>} {!show3 && <span>+</span>}</h4>
                        {show3 && <div className="content">
                            <p>Protective investment solutions include Structured Notes, buffered ETFs, and annuities.</p>
                            <p>Halo is the first marketplace dedicated to protective investment solutions.  <a href="https://haloinvesting.com/request-access/" target="_blank" className="ai-link"> Reach out to learn how Halo helps financial advisors find investments with flexible return & protection options for client portfolios.</a> This includes: </p>
                            <ul>
                                <li>Tools to analyze, customize, and quickly execute protective investment solutions.</li>
                                <li>Experienced professionals at Halo provide ideas, education, and ongoing support.</li>
                                <li>Industry-leading education and thought leadership on Structured Notes.</li>
                            </ul>
                        </div>}
                    </div>
                    <div className="faq" id="faq4">
                        <h4 onClick={() => setShow4(!show4)}>4. What is “Powered by Adaptive” ?{show4 && <span className="minus">-</span>} {!show4 && <span>+</span>}</h4>
                        {show4 && <div className="content">
                            <p>Halo partner <a href="https://adaptive-investments.com/app/home" target="_blank" className="ai-link"> Adaptive Investment Solutions</a> is a powerful fintech platform for personalized portfolio solutions & risk analytics, including one-click downside protection, income generation, & tax-smart risk rebalancing. Adaptive’s one-of-a-kind mission is to smooth out the ride—and level the playing field—so investors of all sizes can realize financial wellness by getting & staying invested for long-term growth, all the while making the most of market downturns & income opportunities. </p>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default React.memo(HaloRiskContribution);
