import React, { useState } from 'react';
// import { makeStyles } from "@material-ui/core/styles";
import CustomPopup from "../../components/Popup/Popup";
import TagManager from "react-gtm-module";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FetchInteractiveMarketShieldPlus } from "@/pages/api/FetchInteractiveMarketShieldPlus";
import PageLoader from '@/components/PageLoader/PageLoader';

export default function MarketShieldPlus(props) {

  // const useStyles = makeStyles((theme) => ({
  //   button: {
  //     color: "white",
  //     marginTop: "2px",
  //   },
  //   checkbox_button: {
  //     color: "#60034c",
  //     width: "14px",
  //     height: "14px",
  //   },
  //   backdrop: {
  //     zIndex: theme.zIndex.drawer + 1,
  //     color: "#fff",
  //   },
  // }));

  // const classes = useStyles();

  const [bdopen, setBdOpen] = React.useState(false);
  const [popupState, setPopupState] = React.useState(false);
  const [popupMessage, setPopupMessage] = React.useState("");
  const [popupTitle, setPopupTitle] = React.useState("");
  const [alertType, setAlertType] = React.useState("");
  const [show, setShow] = useState(true);
  const [Level, setLevel] = React.useState(0);
  const [periodSelected, setPeriodSelected] = React.useState(0);
  const [apiRequest, setApiRequest] = React.useState();
  const [apiResponse, setApiResponse] = React.useState();
  const [tickerList, setTickerList] = React.useState([{ 'ticker': '', 'quantity': '' }]);
  const [FormValidationErrors, setFormValidationErrors] = React.useState({});
  const [MarketShieldData, setMarketShieldData] = React.useState([]);
  const [tickerErrorList, setTickerErrorList] = React.useState([{ 'tickerError': '', 'quantityError': '' }]);
  const [isRequestCopied, setRequestCopied] = useState(false);
  const [isResonseCopied, setResonseCopied] = useState(false);
  const responseKeys = ['protected_portfolio', 'total_portfolio_value', 'unrecognized_tickers', 'underlying_price', 'index_beta', 'index_r2', 'tracking_error'];

  const levels = [
    { percent: 0, level: "Select" },
    { percent: 0.8, level: "80%" },
    { percent: 0.85, level: "85%" },
    { percent: 0.9, level: "90%" },
    { percent: 0.95, level: "95%" },
    { percent: 1, level: "100%" },
  ];

  const durations = [
    { period: 0, duration: "Select" },
    { period: 'week', duration: "Weekly" },
    { period: 'week_2', duration: "2 Weeks" },
    { period: 'week_3', duration: "3 Weeks" },
    { period: 'month', duration: "1 Month" },
    { period: 'month_2', duration: "2 Months" },
    { period: 'quarter', duration: "3 Months" },
    { period: 'half_year', duration: "6 Months" },
    { period: 'year', duration: "Year" },
  ];

  const changeLevel = (percent) => {
    if (percent === 0 || percent === "0") {
      FormValidationErrors.Level = "Please select valid percent";
      setLevel("");
      return;
    }
    setLevel(percent);
    if (MarketShieldData.length !== 0) {
      GenerateResponse(MarketShieldData, percent, periodSelected);
    }
  };

  const changeDuration = (period) => {
    if (period === 0 || period === "0") {
      FormValidationErrors.periodSelected = ("Please select valid duration");
      setPeriodSelected("");
      return;
    }
    setPeriodSelected(period);
    if (MarketShieldData.length !== 0) {
      GenerateResponse(MarketShieldData, Level, period);
    }
  };

  const validateForm = (tickerList) => {
    let validFlag = true;
    let lyst = [...tickerErrorList]

    if (Object.keys(tickerList).length > 1) {
      tickerList.forEach(item => {
        Object.keys(item).forEach(key => {
          if (item[key] === "" || item[key] === null || Object.keys(item[key]).length === 0) {
            delete item[key];
          }
        });
      });

      tickerList = tickerList.filter(item => Object.keys(item).length > 0);
    }

    let error = {};
    for (let i = 0; i < tickerList.length; i++) {
      if (!tickerList[i].ticker) {
        validFlag = false;
        lyst[i].tickerError = "Please enter valid ticker";
      }
      else {
        if (tickerList[i].ticker && !(/^[A-Za-z][A-Za-z.]+$/.test(tickerList[i].ticker))) {
          validFlag = false;
          lyst[i].tickerError = "Please enter valid ticker. Valid characters are: A-Z, a-z, period(.)";
        }
        else {
          lyst[i].tickerError = "";
        }
      }
      if (!tickerList[i].quantity) {
        validFlag = false;
        lyst[i].quantityError = "Please enter valid quantity";
      }
      else {
        if (/^\d*\.?\d*$/.test(tickerList[i].quantity)) {
          lyst[i].quantityError = "";
        }
        else {
          validFlag = false;
          lyst[i].quantityError = "Please enter valid numeric value";
        }

      }
    }
    if (!Level) {
      validFlag = false;
      error.Level = "Please select valid protection level";
    }
    if (!periodSelected) {
      validFlag = false;
      error.periodSelected = "Please select valid protection period";
    }
    setFormValidationErrors(error);
    setTickerErrorList(lyst);

    return {
      validFlag: validFlag,
      pli: tickerList
    }
  }

  const handleAddRow = () => {
    setTickerList([...tickerList, { 'ticker': '', 'quantity': '' }]);
    setTickerErrorList([...tickerErrorList, { 'tickerError': '', 'quantityError': '' }])
  }

  const handleInputchange = (e, index) => {
    const list = [...tickerList]
    list[index][e.target.name] = e.target.value.toUpperCase()
    setTickerList(list)
    setMarketShieldData([]);
  }

  const handleRequestCopy = (copytext) => {
    setRequestCopied(true);
    if (isResonseCopied) {
      setResonseCopied(false);
    }
    navigator.clipboard.writeText(copytext);
  }

  const handleResponseCopy = (copytext) => {
    setResonseCopied(true);
    if (isRequestCopied) {
      setRequestCopied(false);
    }
    navigator.clipboard.writeText(copytext);
  }


  async function GenerateResponse(market_data, level, period) {

    const Response = Object.keys(market_data)
      .filter(key => responseKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = market_data[key];
        return obj;
      }, {});

    if (market_data["ChoosenOption"] !== undefined) {
      Response['result'] = market_data["ChoosenOption"][period][level];
    }
    Response['email_id'] = props.userData.emailId;
    Response['full_name'] = props.userData.fullName;
    Response['phone_number'] = props.userData.phoneNumber;
    setApiResponse(JSON.stringify(Response, null, 4));
  }

  const FetchInteractiveMarketShieldPl = (e) => {
    e.preventDefault();
    const { validFlag, pli } = validateForm(tickerList);

    if (validFlag) {
      if (pli.length > 0) {
        let raw = JSON.stringify({
          email_id: props.userData.emailId,
          full_name: props.userData.fullName,
          phone_number: props.userData.phoneNumber,
          pli: pli,
        }, null, 4);
        setApiRequest(raw);
        setBdOpen(true);
        console.log("raw", raw);
        FetchInteractiveMarketShieldPlus(raw).then((market_data) => {
          console.log(" market data", market_data);
          if (market_data !== false && market_data !== 0 && market_data !== undefined) {
            setMarketShieldData(market_data);
            GenerateResponse(market_data, Level, periodSelected);
            setBdOpen(false);
            TagManager.dataLayer({
              dataLayer: {
                event: 'Interactive API Used',
                apiName: 'Market Shield Plus'
              },
            });
          }
          else if (market_data === false) {
            setBdOpen(false);
            setPopupMessage(
              "Unable to show the data. Please try again later"
            );
            setPopupState(true);
            setPopupTitle("Error");
            setAlertType("Error");
          } else if (market_data === 0) {
            setBdOpen(false);
            setPopupState(true);
            setPopupTitle("Error");
            setAlertType("Error");
            setPopupMessage(
              "This is a technology preview. The service is not available during some market data updates. Please try again in 30 minutes."
            );
          }
        })
      }
    }
  }

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
      <div className='apidata'>
        <div className='portfoliolbl'>
          <label>Protection Period</label>
          <div className='inputcon'>
            <Select
              labelId="portfolio-protection-period"
              id="portfolio-protection-period"
              className="input-mui"
              value={periodSelected}
              onChange={(event) => changeDuration(event.target.value)}
            >
              {durations.map((value, i) => (
                <MenuItem key = {i} value={value.period}>{value.duration}</MenuItem>
              ))}
            </Select>
            <p className="error-message">
              {FormValidationErrors.periodSelected}
            </p>
          </div>
        </div>
        <div className='portfoliolbl'>
          <label>Protection Level</label>
          <div className='inputcon'>
            <Select
              labelId="portfolio-protection-lavel"
              id="portfolio-protection-lavel"
              className="input-mui"
              value={Level}
              onChange={(event) => changeLevel(event.target.value)}
            >
              {levels.map((value, i) => (
                <MenuItem key = {i} value={value.percent}>{value.level}</MenuItem>
              ))}
            </Select>
            <p className="error-message">
              {FormValidationErrors.Level}
            </p>
          </div>
        </div>
        <div className="collapse portfoliodata">
          <h4 onClick={() => setShow(!show)}>Portfolio Details {show && <span className="minus">-</span>} {!show && <span>+</span>}</h4>
          {show && <div className="tablecon portfolioinp">
            <table className='tikerdata'>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Qty</th>
                </tr>
              </thead>
              <tbody>
                {tickerList.map((row, i) => {
                  return (
                    <tr key = {i}>
                      <td>
                        <input placeholder='Ticker Symbol' className="input-gray" name='ticker' onChange={(e) => handleInputchange(e, i)}></input>
                        <p className='error-message'>{tickerErrorList[i].tickerError}</p>
                      </td>
                      <td/>
                      <td>
                        <input placeholder='Quantity' className="input-gray" name='quantity' onChange={(e) => handleInputchange(e, i)}></input>
                        <p className='error-message'>{tickerErrorList[i].quantityError}</p>
                      </td>
                      {/* <td><a className='removeticker'><img src='/Assets/trash.svg' /></a></td> */}
                    </tr>
                  )
                })}
                <tr><td colSpan={2} className="pt20"><a className='ai-btn primary line' onClick={handleAddRow}>Add ticker</a></td></tr>
            ``  </tbody>
            </table>

          </div>
          }
        </div>
        <a className='ai-btn primary solid' onClick={FetchInteractiveMarketShieldPl}>Post result</a>
      </div>

      <div className='apioutput'>
        <div className='code'>
          <label>Request</label>
          <div className='ovauto'>
            <pre
              name="apiRequest"
              placeholder=""
              className="ai-form-value"
              readOnly
            >{apiRequest}</pre>
          </div>
          <button className='ai-btn secondary solid' onClick={() => handleRequestCopy(apiRequest)}><img src="/Assets/copy.svg" />{isRequestCopied ? 'Copied' : 'Copy'}</button>
        </div>
        <div className='code'>
          <label>Output</label>
          <div className='ovauto'>
            <pre
              name="apiResponse"
              placeholder=""
              className="ai-form-value"
              readOnly
            >{apiResponse}</pre>
          </div>
          <button className='ai-btn secondary solid' onClick={() => handleResponseCopy(apiResponse)}><img src="/Assets/copy.svg" />{isResonseCopied ? 'Copied' : 'Copy'}</button>
        </div>
      </div>
    </>
  );
}
