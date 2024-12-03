import React, { useState } from 'react';
import "@/node_modules/slick-carousel/slick/slick.css";
import "@/node_modules/slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import CustomPopup from "@/components/Popup/Popup";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TagManager from "react-gtm-module";
import { addZeroes } from "../../utilites/AddZeros";
import { portfolios } from "../../utilites/Constants";
import PageLoader from '@/components/PageLoader/PageLoader';
import { FetchFactorAnalysis } from "@/pages/api/FetchFactorAnalysis";
import AddUser from "@/components/AddUser/AddUser";
import PortfolioDetailsTable from "../../components/PortfolioDetailsTable/PortfolioDetailsTable";
import TooltipComponent from '../TooltipComponent/TooltipComponent';

function FactorAnalysis({initPortfolio,initPortfolioValue,version}) {

    var currObj = {
        style: "currency",
        currency: "USD",
    };

    const [portfolio, setPortfolio] = React.useState(initPortfolio);
    const [show, setShow] = useState(true);
    const [show1, setShow1] = useState(true);
    const [show2, setShow2] = useState(true);
    const [faqshow,setfaqShow] = useState(false);
    const [faqshow2,setfaqShow2] = useState(false);
    const [faqshow3,setfaqShow3] = useState(false);
    const [faqshow4,setfaqShow4] = useState(false);
    const [Flag, setFlag] = React.useState(false);
    const [bdopen, setBdOpen] = React.useState(false);
    const [GotData, setGotData] = React.useState(false);
    const [popupState, setPopupState] = React.useState(false);
    const [popupMessage, setPopupMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("");
    const [FATable, setFATable] = React.useState([]);
    const [FactorTable, setFactorTable] = React.useState([]);
    const [HedgeableData, sethedgeabledata] = React.useState([]);
    const [UnhedgeableData, setunhedgeabledata] = React.useState([]);
    const [tabletabvalue, setTableTabValue] = React.useState("Hedgeable Assets");
    const [factortabvalue, setFactorTabValue] = React.useState("Factor Analysis");
    const [R2Benchmark, setR2Benchmark] = React.useState(0);
    const [R2Factor, setR2Factor] = React.useState(0);
    const [BetaBenchmark, setBetaBenchmark] = React.useState(0);
    const [BetaFactor, setBetaFactor] = React.useState([]);
    const [TEBenchmark, setTEBenchmark] = React.useState(0);
    const [TEFactor, setTEFactor] = React.useState(0);
    const [R2BenchmarkNum, setR2BenchmarkNum] = React.useState(25);
    const [R2FactorNum, setR2FactorNum] = React.useState(25);
    const [PortfolioTotalValue, setPortfolioTotalValue] = React.useState(Number(
        addZeroes(
            Number(parseFloat(initPortfolioValue).toFixed(2))
        )
        ).toLocaleString("en-US", currObj));
    const [FormatPortfolioValue, setFormatPortfolioValue] = React.useState(initPortfolioValue);
    const [DisableRunButton, setDisableRunButton] = React.useState(true);
    const [PortfolioRows, setPortfolioRows] = React.useState([]);
    const [ApiCount, setApiCount] = React.useState(0);
    const [showTooltip, setShowTooltip] = useState(false);


    const changePortfolio = (event) => {
        if (event.target.value === "") {
            setPopupState(true);
            setPopupMessage("Please select valid portfolio");
            setAlertType("warning");
            return;
        }
        setPortfolio(event.target.value);
        setBdOpen(true);
        setGotData(false);
        fetchFactorAnalysis(event.target.value,FormatPortfolioValue)
    };

    function changeValue(event, value) {
      let trimmedValue = value.trim();
      if (event.key === "Enter") {
        setShowTooltip(false);
            if (trimmedValue === "") {
                setPopupMessage(
                    "Please enter a valid value to proceed further."
                );
                setAlertType("ERROR");
                setPopupState(true);
                return;
            } else {
              let float_value = parseFloat(value.replace(/,/g, ''));
              if (float_value === 0 || isNaN(float_value)) {
                  setBdOpen(false);
                  setPopupMessage(
                      "Please enter a valid value to proceed further."
                  );
                  setAlertType("ERROR");
                  setPopupState(true);
                  return;
              }
            setBdOpen(true);
            setFormatPortfolioValue(float_value);
            setPortfolioTotalValue((Number(
                addZeroes(
                    Number(parseFloat(float_value).toFixed(2))
                )
            ).toLocaleString("en-US", currObj)));
            fetchFactorAnalysis(portfolio,float_value);
        }
      }
    }

    function handleChangeValue(event, value) {
        let text = event.target.value.replace(/[^\d\.]/gi, '');
        let lastCharIsAdot = text.substr(text.length - 1, 1) === ".";

        if (isNaN(text) || text === "0") {
            event.target.classList.remove('valid');
            event.target.classList.add('invalid');

        } else if (event.target.value === "") {
            setPortfolioTotalValue("");
        }
        else {
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

    function GetPortfolioTable(data) {
        try {
            var portfolio_lyst = [];
            for (let [key, value] of Object.entries(data)) {
                portfolio_lyst.push([
                    value.Ticker,
                    value.Name,
                    value.Allocation,
                    value.mutual_fund_ticker,
                    value.mutual_fund_name,
                    Number(addZeroes(Number(parseFloat(value['Market Value']).toFixed(2)))).toLocaleString("en-US", currObj)
                ]);
            }
            setPortfolioRows([...portfolio_lyst])
        } catch (e) {
        }
    }

    const fetchFactorAnalysis = (portfolio, FormatPortfolioValue) => {
        setBdOpen(true);
        FetchFactorAnalysis(portfolio, FormatPortfolioValue).then((data) => {
          if (data !== false && data !== 0 && data !== undefined && data !== 401) {
            setGotData(true);
            setFATable(data['factor_analysis']);
            setFactorTable(data['factor']);
            sethedgeabledata(data['recognised']);
            setunhedgeabledata(data['unrecognised']);
            setR2Benchmark(data['r2_benchmark'] === "N.A." ? data['r2_benchmark'] : (data['r2_benchmark'] * 100).toFixed(2) + "%");
            setR2BenchmarkNum(data['r2_benchmark'] * 100);
            setR2Factor(data['r2_factor'] === "N.A." ? data['r2_factor'] : (data['r2_factor'] * 100).toFixed(2) + "%");
            if (data['r2_factor'] !== 'N.A.') {
              console.log('data', data['r2_factor'])
              setR2FactorNum(data['r2_factor'] * 100);
            }
            setBetaBenchmark(parseFloat(data['beta_benchmark']).toFixed(2));
            formatBetaFactor(data['beta_factor']);
            setTEBenchmark(data['te_benchmark'] === "N.A." ? data['te_benchmark'] : (data['te_benchmark'] * 100).toFixed(2) + "%");
            setTEFactor(data['te_factor'] === "N.A." ? data['te_factor'] : (data['te_factor'] * 100).toFixed(2) + "%");
            GetPortfolioTable(data["recognised"]);
            TagManager.dataLayer({
              dataLayer: {
                event: 'User used Factor Analytics',
                selectedPortfolio: portfolio
              },
            });
            setBdOpen(false);
          } else if (data === false) {
            setBdOpen(false);
            setPopupState(true);
            setPopupMessage(
              "Unable to fetch data"
            );
            setAlertType("error");
          } else if (data === 0 || data === undefined) {
            setBdOpen(false);
            setPopupState(true);
            setPopupMessage(
              "We are facing issues connecting our servers, please try again later"
            );
            setAlertType("error");
            return;
          }
        });
      }

      if (Flag === false) {
        setFlag(true);
        fetchFactorAnalysis(portfolio, FormatPortfolioValue);
        }

      function handleTableTabChange(tabletabvalue) {
        setTableTabValue(tabletabvalue);
      }
    
      function handleFactorTableTabChange(tabletabvalue) {
        setFactorTabValue(tabletabvalue);
      }
    
      const headers = ["", "Portfolio", "Benchmark", "Factor"];
      const factor_headers = ["#", "Factor", "Weight", "Category"];
    
      const formatBetaFactor = (value) => {
        const formattedValue = value.split(',').map((num) => parseFloat(num).toFixed(2)).join(', ');
        setBetaFactor(formattedValue);
      };
    
      const updatedData = Object.entries(FATable).map(([key, value]) => {
        const updatedValue = Object.entries(value).reduce((acc, [k, v]) => {
          const newKey = k === "imp_vol" ? "Implied Volatility" : k === "hist_vol" ? "Historical Volatility" : k === "symbol" ? "Symbol" : k;
          if (newKey === "Implied Volatility" || newKey === "Historical Volatility") {
            v = v === "N.A." ? "N.A." : (parseFloat(v) * 100).toFixed(2) + "%";
          }
          return { ...acc, [newKey]: v };
        }, {});
        const newValue = { Symbol: value.Symbol || portfolio, ...updatedValue }
        return { [key]: newValue };
      });
    
      const uniqueKeys = Array.from(new Set(updatedData.flatMap(obj => Object.keys(obj[Object.keys(obj)[0]]))));
    
    
      const TwoCircles = ({ apart = 22 }) => {
        const svgWidth = 200;
        const circleRadius = 40;
    
        const circle1X = (svgWidth - apart) / 2;
        const circle2X = (svgWidth - apart) / 2 + apart;
    
        return (
          <svg width={svgWidth} height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx={circle1X} cy="45" r={circleRadius} fill="#60034c" stroke="#666666" strokeWidth="5" />
            <circle cx={circle2X} cy="45" r={circleRadius} fill="#60034c" stroke="#666666" strokeWidth="5" />
            <path
              d={`M${circle1X},45
                  m-${circleRadius},0
                  a${circleRadius},${circleRadius} 0 1,0 ${circleRadius * 2},0
                  a${circleRadius},${circleRadius} 0 1,0 -${circleRadius * 2},0
                  M${circle2X},45
                  m-${circleRadius},0
                  a${circleRadius},${circleRadius} 0 1,1 ${circleRadius * 2},0
                  a${circleRadius},${circleRadius} 0 1,1 -${circleRadius * 2},0`}
              fill="#ffffff"
              fill-rule="evenodd"
            />
          </svg>
        );
      };
    
    return (
        <>
            <PageLoader bdopen = {bdopen} />
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title="Factor Analysis"
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
                                // onChange={(event) => setPortfolioTotalValue(event.target.value)}
                                value={PortfolioTotalValue}
                                onKeyUp={(event) =>
                                    changeValue(event, event.target.value)
                                }
                            />
                            {showTooltip && <div className="custom-tooltip">Please hit Enter to proceed</div>}
                        </div>
                    </div>
                </div>
            </div>
            {GotData && (
                <>
                <div className="sectiondivide pb0 section-col">
                <div className="risk-cont portfolio_page-holder factoranalysis">
                <div className='factorexposure'>
                  <div className="portfolio-table contributio-table factortbl1">
                    <div className="table_holder table_head">
                      <div className="tabheader">
                        <ul className="subnavbar-menu fixed">
                          <li>
                            <a className={factortabvalue === "Factor Analysis" ? "SUBITEM-selected " : "SUBITEM"} onClick={() => handleFactorTableTabChange('Factor Analysis')}>Factor Analysis </a>
                          </li>
                          <li>
                            <a className={factortabvalue === "Factor" ? "SUBITEM-selected" : "SUBITEM"} onClick={() => handleFactorTableTabChange('Factor')}>Factor</a>
                          </li>
                        </ul> {show && <span onClick={() => setShow(!show)} className="minus">-</span>} {!show && <span onClick={() => setShow(!show)}>+</span>}
                      </div>
                      {show &&
                        <>
                          {factortabvalue === "Factor Analysis" &&
                            <TableContainer className="table_height">
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    {headers.map((header, index) => (
                                      <TableCell key={index}>{header}</TableCell>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {uniqueKeys.map((key, index) => (
                                    <TableRow key={index}>
                                      <TableCell>{key}</TableCell>
                                      {updatedData.map((obj, i) => {
                                        const subObj = obj[Object.keys(obj)[0]];
                                        return <TableCell key={i}>{subObj[key]}</TableCell>;
                                      })}
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              <TableFooter>
                                <TableRow>
                                </TableRow>
                              </TableFooter>
                            </TableContainer>
                          }
                          {factortabvalue === "Factor" &&
                            <TableContainer className="table_height">
                              <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                  <TableRow>
                                    {factor_headers.map((header, index) => (
                                      <TableCell key={index}>{header}</TableCell>
                                    ))}
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {Object.values(FactorTable).map((item, index) => (
                                    <TableRow key={item.number}>
                                      <TableCell>{index + 1}</TableCell>
                                      <TableCell>{item.Ticker}</TableCell>
                                      <TableCell>{(parseFloat(item.Weight) * 100).toFixed(2) + "%"}</TableCell>
                                      <TableCell>{item.Description}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                              <TableFooter>
                                <TableRow>
                                </TableRow>
                              </TableFooter>
                            </TableContainer>
                          }
                        </>
                      }
                    </div>
                  </div>
                  <div className="portriskgrid">
                    <h3 onClick={() => setShow1(!show1)}>Benchmark & Factor Analysis {show1 && <span className="minus">-</span>} {!show1 && <span>+</span>}</h3>
                    {show1 &&
                      <div className='errorgrid'>
                        <div className='trackingerror'>
                          <h3>Benchmark Portfolio</h3>
                          <TwoCircles apart={(100 - R2BenchmarkNum)} />
                          <div className='errolist'>
                            <div className='tagspan'>
                              <h4>R-Squared</h4>
                              <span className='tag primary'>{R2Benchmark}</span>
                            </div>
                            <div className='tagspan'>
                              <h4>Tracking Error</h4>
                              <span className='tag secondary'>{TEBenchmark}</span>
                            </div>
                            <div className='tagspan'>
                              <h4>Beta</h4>
                              <span className='tag gray'>{BetaBenchmark}</span>
                            </div>
                          </div>
                        </div>
                        <div className='trackingerror'>
                          <h3>Factor Portfolio</h3>
                          <TwoCircles apart={100 - R2FactorNum} />
                          <div className='errolist'>
                            <div className='tagspan'>
                              <h4>R-Squared</h4>
                              <span className='tag primary'>{R2Factor}</span>
                            </div>
                            <div className='tagspan'>
                              <h4>Tracking Error</h4>
                              <span className='tag secondary'>{TEFactor}</span>
                            </div>
                            <div className='tagspan'>
                              <h4>Beta</h4>
                              <span className='tag gray'>{BetaFactor}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
                </div>
                </div>
                <div className="sectiondivide pt0 pb0 section-col">
                    <PortfolioDetailsTable PortfolioRows={PortfolioRows} />
                </div>
                </>
            )}
            {version === 2 &&
                <div className="sectiondivide section-col ptsec">
                    <div className="getalerts">
                        <div>
                            <h3>Want to see downside protection personalized for your own portfolios? Request a pilot account to access our breakthrough technology.</h3>
                        </div>
                        <div className="forwardtest">
                            <div className="main-header signupform ">
                                <AddUser singupFor="forwardtest" buttonText="Request Account" />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {version === 1 && 
            <>
            <div className="sectiondivide section-col ptsec">
            <h3 className="sec-head">Because buy-and-hold doesn&apos;t work for everyone all the time.</h3>
            <div className="iconcon">
                <div className="iconset">
                    <span>
                        <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5831 31.6255L34.5831 46.5005C33.0831 48.0005 32.3331 49.8755 32.3331 52.0005C32.3331 54.2505 33.2081 56.1255 34.7081 57.6255C36.2081 59.1255 38.0831 60.0005 40.3331 60.0005C42.5831 60.0005 44.4581 59.1255 45.9581 57.6255C47.4581 56.1255 48.2081 54.2505 48.3331 52.0005C48.2081 49.7505 47.4581 47.8755 45.9581 46.3755C44.4581 44.8755 42.5831 44.1255 40.3331 44.0005C38.7081 44.0005 37.3331 44.5005 36.0831 45.2505L24.0831 30.2505C23.5831 30.0005 23.0831 30.0005 22.5831 30.2505C22.2081 30.7505 22.2081 31.1255 22.5831 31.6255ZM40.3331 58.0005C38.5831 58.0005 37.2081 57.3755 36.0831 56.2505C34.9581 55.1255 34.3331 53.7505 34.3331 52.0005C34.3331 50.1255 35.0831 48.6255 36.5831 47.3755H36.4581C37.5831 46.5005 38.8331 46.0005 40.3331 46.0005C41.9581 46.1255 43.3331 46.7505 44.5831 47.7505C45.5831 49.0005 46.2081 50.3755 46.3331 52.0005C46.2081 53.7505 45.5831 55.1255 44.5831 56.2505C43.3331 57.3755 41.9581 58.0005 40.3331 58.0005ZM38.3331 24.0005C38.3331 25.2505 39.0831 26.0005 40.3331 26.0005C41.5831 26.0005 42.2081 25.2505 42.3331 24.0005C42.2081 22.7505 41.5831 22.1255 40.3331 22.0005C39.0831 22.1255 38.3331 22.7505 38.3331 24.0005ZM59.3331 31.0005C59.2081 29.7505 58.5831 29.1255 57.3331 29.0005C56.0831 29.1255 55.3331 29.7505 55.3331 31.0005C55.3331 32.2505 56.0831 33.0005 57.3331 33.0005C58.5831 33.0005 59.2081 32.2505 59.3331 31.0005ZM62.3331 48.0005C62.3331 49.2505 63.0831 50.0005 64.3331 50.0005C65.5831 50.0005 66.2081 49.2505 66.3331 48.0005C66.2081 46.7505 65.5831 46.1255 64.3331 46.0005C63.0831 46.1255 62.3331 46.7505 62.3331 48.0005ZM18.3331 48.0005C18.2081 46.7505 17.5831 46.1255 16.3331 46.0005C15.0831 46.1255 14.3331 46.7505 14.3331 48.0005C14.3331 49.2505 15.0831 50.0005 16.3331 50.0005C17.5831 50.0005 18.2081 49.2505 18.3331 48.0005ZM13.5831 68.0005H67.0831C69.2081 68.0005 70.8331 67.1255 71.9581 65.2505C74.7081 60.1255 76.2081 54.3755 76.3331 48.0005C76.2081 41.3755 74.5831 35.3755 71.4581 29.8755C68.2081 24.5005 63.8331 20.1255 58.4581 16.8755C52.9581 13.7505 46.9581 12.1255 40.3331 12.0005C33.5831 12.1255 27.5831 13.7505 22.2081 16.8755C16.7081 20.1255 12.4581 24.5005 9.20813 29.8755C5.95813 35.3755 4.33313 41.3755 4.33313 48.0005C4.33313 54.3755 5.83313 60.1255 8.70813 65.2505C9.70813 67.1255 11.3331 68.0005 13.5831 68.0005ZM6.33313 48.0005H6.20813C6.20813 41.7505 7.83313 36.0005 10.8331 30.8755C13.8331 25.7505 17.9581 21.6255 23.0831 18.6255C28.2081 15.6255 33.9581 14.1255 40.2081 14.0005C46.5831 14.1255 52.3331 15.6255 57.4581 18.6255C62.5831 21.6255 66.7081 25.7505 69.7081 30.8755C72.7081 36.0005 74.2081 41.7505 74.3331 48.0005C74.2081 54.0005 72.8331 59.5005 70.2081 64.2505C69.4581 65.3755 68.4581 66.0005 67.0831 66.0005H13.5831C12.0831 66.0005 11.0831 65.3755 10.4581 64.2505C7.70813 59.5005 6.33313 54.0005 6.33313 48.0005Z" fill="#60034c" />
                        </svg>
                    </span>
                    <h5>Excessive or unwanted risk.</h5>
                </div>
                <div className="iconset">
                    <span>
                        <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.3809 38.0005H68.5059C69.5059 38.0005 70.1309 37.3755 70.2559 36.1255L70.3809 36.0005C70.2559 30.7505 69.0059 26.1255 66.5059 21.8755C64.0059 17.6255 60.7559 14.3755 56.5059 11.8755C52.2559 9.37549 47.6309 8.12549 42.3809 8.00049H42.2559C41.0059 8.12549 40.3809 8.75049 40.3809 9.87549V36.0005C40.3809 37.2505 41.1309 38.0005 42.3809 38.0005ZM68.3809 36.0005H42.3809V10.0005C49.6309 10.2505 55.7559 12.7505 60.7559 17.6255C65.6309 22.6255 68.1309 28.7505 68.3809 36.0005ZM34.3809 14.2505C34.2559 13.0005 33.5059 12.2505 32.1309 12.2505C24.6309 13.5005 18.6309 16.7505 13.8809 22.2505C9.00586 27.7505 6.50586 34.2505 6.38086 42.0005C6.38086 47.6255 7.75586 52.6255 10.5059 57.1255C13.1309 61.6255 16.7559 65.2505 21.2559 67.8755C25.7559 70.6255 30.7559 72.0005 36.3809 72.0005C42.8809 72.0005 48.7559 70.1255 53.7559 66.5005C54.7559 65.6255 54.7559 64.6255 54.0059 63.6255L34.3809 44.0005V14.2505ZM33.0059 45.3755L52.5059 64.8755C47.7559 68.1255 42.3809 69.8755 36.3809 70.0005C31.1309 70.0005 26.3809 68.6255 22.2559 66.1255C18.0059 63.7505 14.6309 60.3755 12.2559 56.1255C9.75586 52.0005 8.38086 47.2505 8.38086 42.0005C8.50586 34.8755 10.7559 28.7505 15.2559 23.6255C19.7559 18.6255 25.3809 15.5005 32.3809 14.2505V44.0005C32.3809 44.6255 32.5059 45.1255 33.0059 45.3755ZM64.8809 63.8755C69.8809 59.2505 72.8809 53.3755 74.1309 46.1255C74.1309 44.8755 73.3809 44.2505 72.1309 44.0005H47.2559C46.2559 44.1255 45.6309 44.5005 45.3809 45.2505C45.0059 46.0005 45.1309 46.7505 45.7559 47.3755L62.2559 63.8755C63.0059 64.6255 63.8809 64.6255 64.8809 63.8755ZM63.6309 62.3755L47.2559 46.0005H72.1309C71.0059 52.5005 68.1309 58.0005 63.6309 62.3755Z" fill="#60034c" />
                        </svg>
                    </span>
                    <h5>Concentrated positions.</h5>
                </div>
                <div className="iconset">
                    <span>
                        <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.4286 59.0005V13.0005C10.3036 12.5005 9.92859 12.1255 9.42859 12.0005C8.80359 12.1255 8.42859 12.5005 8.42859 13.0005V59.0005C8.42859 61.6255 9.30359 63.7505 11.0536 65.3755C12.6786 67.1255 14.8036 68.0005 17.4286 68.0005H71.4286C71.9286 68.0005 72.3036 67.6255 72.4286 67.0005C72.3036 66.5005 71.9286 66.1255 71.4286 66.0005H17.4286C15.4286 66.0005 13.6786 65.2505 12.4286 64.0005C11.1786 62.7505 10.4286 61.0005 10.4286 59.0005ZM52.4286 52.0005H67.4286C67.9286 52.0005 68.3036 51.6255 68.4286 51.0005V35.8755C68.3036 35.3755 67.9286 35.0005 67.4286 34.8755C66.8036 35.0005 66.4286 35.3755 66.4286 35.8755V48.6255L45.1786 27.2505C44.6786 27.0005 44.1786 27.0005 43.6786 27.2505L32.4286 38.6255L21.1786 27.2505C20.6786 27.0005 20.1786 27.0005 19.6786 27.2505C19.3036 27.7505 19.3036 28.2505 19.6786 28.7505L31.6786 40.7505C32.1786 41.1255 32.6786 41.1255 33.1786 40.7505L44.4286 29.3755L65.0536 50.0005H52.4286C51.8036 50.1255 51.4286 50.5005 51.4286 51.0005C51.4286 51.6255 51.8036 52.0005 52.4286 52.0005Z" fill="#60034c" />
                        </svg>
                    </span>
                    <h5>Panic or fear of market downturns.</h5>
                </div>
                <div className="iconset">
                    <span>
                        <svg width="81" height="80" viewBox="0 0 81 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75.3513 25.7505C76.1013 26.6255 76.4763 27.5005 76.4763 28.5005C76.4763 29.5005 76.1013 30.3755 75.3513 31.1255L48.8513 57.6255C48.6013 57.8755 48.4763 57.8755 48.2263 57.8755L37.9763 60.0005H36.2263H34.4763C34.2263 60.0005 33.9763 60.0005 33.7263 59.7505L30.4763 56.3755L27.2263 59.7505C26.4763 60.2505 25.9763 60.1255 25.6013 59.3755L21.4763 49.6255L17.3513 59.3755C17.1013 59.8755 16.8513 60.0005 16.4763 60.0005H13.4763C12.8513 60.0005 12.4763 59.6255 12.4763 59.0005C12.4763 58.5005 12.8513 58.1255 13.4763 58.0005H15.8513L19.6013 48.8755C19.9763 48.1255 20.6013 47.7505 21.4763 47.7505C22.2263 47.7505 22.8513 48.1255 23.3513 48.8755L26.8513 57.2505L29.1013 55.0005C29.9763 54.2505 30.8513 54.2505 31.8513 55.0005L34.8513 58.0005H36.4763L38.6013 48.2505C38.6013 48.0005 38.6013 47.8755 38.8513 47.6255L65.3513 21.1255C66.1013 20.3755 66.9763 20.0005 67.9763 20.0005C68.9763 20.0005 69.8513 20.3755 70.7263 21.1255L75.3513 25.7505ZM47.6013 56.0005L67.3513 36.2505L60.2263 29.1255L40.4763 48.8755L38.7263 57.7505L47.6013 56.0005ZM73.9763 29.7505C74.6013 29.0005 74.6013 28.1255 73.9763 27.2505L69.2263 22.5005C68.3513 21.8755 67.6013 21.8755 66.8513 22.5005L61.6013 27.7505L68.7263 34.8755L73.9763 29.7505ZM51.4763 62.0005C51.9763 62.1255 52.3513 62.5005 52.4763 63.0005V64.0005C52.3513 66.2505 51.6013 68.1255 50.1013 69.6255C48.6013 71.1255 46.7263 72.0005 44.4763 72.0005H12.4763C10.2263 72.0005 8.35126 71.1255 6.85126 69.6255C5.35126 68.1255 4.47626 66.2505 4.47626 64.0005V16.0005C4.47626 13.7505 5.35126 11.8755 6.85126 10.3755C8.35126 8.87549 10.2263 8.12549 12.4763 8.00049H30.8513C31.8513 8.00049 32.8513 8.37549 33.6013 9.12549L51.3513 26.8755C52.1013 27.6255 52.4763 28.6255 52.4763 29.6255C52.4763 29.8755 52.3513 30.0005 52.1013 30.0005H35.4763C33.9763 30.0005 32.8513 29.5005 31.9763 28.5005C30.9763 27.6255 30.4763 26.5005 30.4763 25.0005V10.0005H12.4763C10.7263 10.1255 9.35126 10.7505 8.22626 11.7505C7.10126 13.0005 6.47626 14.3755 6.47626 16.0005V64.0005C6.47626 65.7505 7.10126 67.1255 8.22626 68.2505C9.35126 69.3755 10.7263 70.0005 12.4763 70.0005H44.4763C46.1013 70.0005 47.4763 69.3755 48.7263 68.2505C49.7263 67.1255 50.3513 65.7505 50.4763 64.0005V63.0005C50.4763 62.5005 50.8513 62.1255 51.4763 62.0005ZM32.4763 10.8755V25.0005C32.6013 26.8755 33.6013 27.8755 35.4763 28.0005H49.6013L32.4763 10.8755Z" fill="#60034c" />
                        </svg>
                    </span>
                    <h5>Risk management.</h5>
                </div>
            </div>
        </div>
        <div className="sectiondivide sectioncol ptsec">
            <p>What are publicly traded options saying about expectations for market calm or market danger ? Check Adaptive’s new <Link className="ai-link" href="/tools/rw">Risk Weather tool.</Link></p>
        </div>
        </>
        }
        {version === 1 && 
        <>
                <div className="sectiondivide section-col ptsec" id="faqsec">
                <h3 className="sec-head">Factor Analysis FAQ (Frequently Asked Questions)</h3>
                <div className="faqcon">
                      <div className="faq" id="faqshow">
                          <h4 onClick={() => setfaqShow(!faqshow)}>1. What is Adaptive’s Factor Analysis? {faqshow && <span className="minus">-</span>} {!faqshow && <span>+</span>}</h4>
                          {faqshow && <div className="content">
                              <p>Adaptive Factor Analysis looks for underlying  risk drivers in the form of market indexes in a portfolio of US stocks and ETFs to identify a market index (or a combination of indexes) which “fit” or explain the performance of the portfolio.</p>
                              <p>For example the behavior of a mixed basket of large-cap stocks would likely be somewhat similar to the S&P 500 which is an index of 500 large-cap stocks. This is useful for downside protection, because it’s often less expensive to hedge a liquid market index such as the S&P 500 as compared to hedging the individual positions in a portfolio of large-cap stocks. Knowing the S&P 500 is a pretty good fit, in other words, can lead to significant savings for downside protection. Combining liquid market indexes can also be useful to get a better fit, for instance, recognizing that there is a value or growth tilt, or large-cap or small-cap tilt, to a portfolio.</p>
                              <p>Adaptive’s Factor Analysis employs a number of underlying market indexes which tend to have fairly active futures, ETFs, and associated options contracts, for cost-effective, actionable portfolio hedging:</p>
                              <ul>
                                <li><b>Benchmark Portfolio </b>refers to the S&P 500 index as a point of comparison for the portfolio being analyzed. </li>
                                <li>“<b>Factor Portfolio</b>” refers to a potential basket of market indexes, and associated ETF’s as a point of comparison for the portfolio being analyzed. Basket candidates include:
                                  <ul>
                                    <li><b>^GSPC, the S&P 500 index.</b> This is a common ticker symbol for the S&P 500 index, distinct from an investable implementation of the index in the form of an ETF such as SPY. The S&P 500 is made up of stocks with large market capitalization (“large cap”)—read more about the S&P 500 index at <a className="ai-link" href="https://en.wikipedia.org/wiki/S%26P_500">Wikipedia</a>, <a className="ai-link" href="https://www.investopedia.com/terms/s/sp500.asp">Investopedia</a>, and <a className="ai-link" href="https://www.spglobal.com/spdji/en/indices/equity/sp-500/#overview">S&P Dow Jones Indices</a>.</li>
                                    <li><b>^RUT, the Russell 2000 index.</b>A measure of exposure to US stocks with relatively small market capitalization (“small cap”). Like ^GSPC, this is an index, not an ETF. Read more about the Russell 2000 index at <a className="ai-link" href="https://en.wikipedia.org/wiki/Russell_2000_Index" >Wikipedia</a>, <a className="ai-link" href="https://www.investopedia.com/terms/r/russell2000.asp#:~:text=Investopedia%20%2F%20Matthew%20Collins-,What%20Is%20the%20Russell%202000%20Index%3F,in%20the%20Russell%203000%20Index.">Investopedia</a>, and <a className="ai-link" href="https://www.ftserussell.com/products/indices/russell-us">Russell US Indexes</a>.</li>
                                    <li>
                                      <b>IWD, the iShares Russell 1000 Value ETF.</b>This investable ETF is based on the Russell 1000 Value index US value stocks. Read more about the Russell 1000 Value index at <a className="ai-link" href="https://en.wikipedia.org/wiki/Russell_1000_Index" >Wikipedia</a> and <a className="ai-link" href="https://www.investopedia.com/terms/r/russell_1000index.asp">Investopedia</a>; read more about the Russell 1000 Value ETF at iShares.com: <a className="ai-link" href="https://www.ishares.com/us/products/239708/ishares-russell-1000-value-etf">iShares Russell 1000 Value ETF.</a>.</li>
                                    <li>
                                      <b>IWF, the iShares Russell 1000 Growth ETF.</b> A measure of exposure to US growth stocks. Read more about the Russell 1000 Growth index at <a className="ai-link" href="https://en.wikipedia.org/wiki/Russell_1000_Index" >Wikipedia</a>, <a className="ai-link" href="https://www.investopedia.com/terms/r/russell_1000index.asp">Investopedia</a>; read more about the Russell 1000 growth ETF at iShares.com: <a className="ai-link" href="https://www.ishares.com/us/products/239706/ishares-russell-1000-growth-etf">iShares Russell 1000 Growth ETF</a>.
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                          </div>}
                      </div>
                      <div className="faq" id="faq2">
                            <h4 onClick={() => setfaqShow2(!faqshow2)}>2. What are the measures of risk and fit in Adaptive’s Factor Analysis? {faqshow2 && <span className="minus">-</span>} {!faqshow2 && <span>+</span>}</h4>
                            {faqshow2 && <div className="content">
                                <p>Adaptive’s Factor Analysis relies on a range of market data and statistical analysis: </p>
                                <ul>
                                  <li><b>Historical Volatility.</b> This backward-looking measure of risk is based on the standard deviation of historical negative daily returns below the mean of a given stock or index. Read more about historical volatility at <a className="ai-link" href="https://en.wikipedia.org/wiki/Volatility_(finance)#:~:text=Historic%20volatility%20measures%20a%20time,in%20particular%2C%20an%20option)." >Wikipedia</a> and <a className="ai-link" href="https://www.investopedia.com/terms/h/historicalvolatility.asp#:~:text=Historical%20volatility%20(HV)%20is%20a,in%20the%20given%20time%20period.">Investopedia</a>.</li>
                                  <li><b>Implied Volatility.</b>This forward-looking measure of risk is derived from market prices for stock and index options, which theoretically reflect the market’s expectations for the magnitude of changes in the underlying price of an asset. Possible distortions include market-moving events such as a scheduled release of quarterly earnings. The VIX, currently used as Adaptive’s measure of <a className="ai-link" href="https://adaptive-investments.com/tools/rw" >Market Weather</a>, is an estimation of average implied volatility of the constituents of S&P 500 market index. Read more about implied volatility at <a className="ai-link" href="https://en.wikipedia.org/wiki/Implied_volatility#:~:text=In%20financial%20mathematics%2C%20the%20implied,market%20price%20of%20said%20option." >Wikipedia</a> and <a className="ai-link" href="https://www.investopedia.com/terms/i/iv.asp">Investopedia</a>.</li>
                                </ul>
                                <p>Adaptive’s Factor Analysis uses three primary measures of “fit” to the portfolio under analysis:</p>
                                <ul>
                                  <li><b>Beta.</b>A sensitivity of  portfolioʼs return on one of the four factors (also known as “factor returns”). For example if the portfolio’s beta on a factor is 0.5, it means when the factor’s price rises or falls by 1% then the portfolio’s value will rise or fall by 0.5%. Beta is calculated based on daily log returns over the past five years. Beta is also used to calculate the so-called ‘hedge ratio’ for sizing market index puts. Read more about the finance use of ‘beta’ at <a className="ai-link" href="https://en.wikipedia.org/wiki/Beta_(finance)" >Wikipedia</a> and <a className="ai-link" href="https://www.investopedia.com/terms/b/beta.asp">Investopedia</a>.</li>
                                  <li><b>R-squared.</b>A measure of how much of a portfolio’s performance can be explained by the returns from the factors. If a portfolio’s total return precisely matches that of the factors, its R-squared is 1.00. If a portfolio’s return bears no relationship to the returns of the factors, its R-squared would be zero. R-squared is computed from a regression of daily portfolio returns against the factors over the past five years. Read more about R-squared at Investopedia and <a className="ai-link" href="https://en.wikipedia.org/wiki/Coefficient_of_determination#:~:text=In%20statistics%2C%20the%20coefficient%20of,the%20independent%20variable(s)." >Wikipedia</a> and <a className="ai-link" href="https://www.investopedia.com/terms/r/r-squared.asp">Investopedia</a>.</li>
                                  <li><b>Tracking Error.</b>A measure of precision between factors and an analyzed portfolio, where less error is a more precise approximation. Even highly liquid ETF’s inevitably exhibit some degree of tracking error as compared to the index which they intend to track, separate from any fees or transaction costs. Read more about tracking error at Investopedia and <a className="ai-link" href="https://en.wikipedia.org/wiki/Tracking_error#:~:text=In%20finance%2C%20tracking%20error%20or,to%20which%20it%20is%20benchmarked." >Wikipedia</a> and <a className="ai-link" href="https://www.investopedia.com/terms/t/trackingerror.asp#:~:text=Tracking%20error%20is%20the%20divergence,an%20unexpected%20profit%20or%20loss.">Investopedia</a>.</li>
                                </ul>
                            </div>}
                      </div>
                      <div className="faq" id="faq3">
                            <h4 onClick={() => setfaqShow3(!faqshow3)}>3. Why is understanding the risk factors important for risk management? {faqshow3 && <span className="minus">-</span>} {!faqshow3 && <span>+</span>}</h4>
                            {faqshow3 && <div className="content">
                                <p>Alternative market “factor” hedging strategies using a basket of liquid market indexes which is often more cost-effective than hedging a portfolio’s individual equity positions, albeit with measurable trade-offs in tracking error and correlation. See more in “<a href="#faqsec">What is Adaptive’s Factor Analysis?</a>”</p>
                            </div>}
                      </div>
                      <div className="faq" id="faq4">
                            <h4 onClick={() => setfaqShow4(!faqshow4)}>4. What is downside protection? {faqshow4 && <span className="minus">-</span>} {!faqshow4 && <span>+</span>}</h4>
                            {faqshow4 && <div className="content">
                                <p>Downside protection, often called a portfolio hedge, is a general term for investments and other agreements which pay off in market and portfolio declines. Common forms include ‘put options’ and futures contracts which require special expertise and trading permissions.</p>
                                <p>Downside protection can limit potential losses, thus reducing the overall risk of a portfolio even while staying invested for potential growth.</p>
                                <p>The cost of downside protection is a drag on a portfolio’s performance, compared to an unprotected portfolio. At the same time downside protection can sometimes lead to improved risk-adjusted returns as compared to buy-and-hold without protection, if protection proceeds are reinvested at lower prices in a portfolio which is growing over the long term.</p>
                            </div>}
                      </div>
                </div>
            </div>
        </>
        }
        </>
    )
}
export default React.memo(FactorAnalysis);