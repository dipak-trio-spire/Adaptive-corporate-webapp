import React from "react";
import { AddRequestDemo } from "@/pages/api/AddRequestDemo";
import { UpdateOptionalFeedback } from "@/pages/api/UpdateOptionalFeedback";
import TagManager from "react-gtm-module";

export default function RequestDemo() {
  const myStyle={
        backgroundImage: "url('Assets/demo_bg.png')",
        backgroundPosition: 'left center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
    };
  const lineStyle={
        backgroundImage: "url('Assets/line_bg.png')",
        backgroundPosition: 'center',
        backgroundSize: 'calc(100% - 140px)',
        backgroundRepeat: 'repeat-y',
    };

  const [stage,setStage] = React.useState(1);
  const [fullName, setFullName] = React.useState("");
  const [firmName, setFirmName] = React.useState("");
  const [emailId, setEmailId] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [requestDemoFormErrors, setRequestDemoFormErrors] = React.useState({});
  const [contactType,setContactType] = React.useState("Email");
  const [sourcePage,setSourcePage] = React.useState(window.location.href);
  const [optionalFeedback1,setOptionalFeedback1] = React.useState("");
  const [optionalFeedback2,setOptionalFeedback2] = React.useState("");

  React.useEffect(() => {
    if(contactType === "Email"){
      setPhoneNumber("");
    }else if(contactType === "Phone"){
      setEmailId("");
    }
  }, [contactType]);

  const validateRequestDemoForm = () => {
    let validRequestFlag = true;
    let error = {};
    if (!fullName) {
      validRequestFlag = false;
      error.fullName = "Please enter full name";
    }
    if (!firmName) {
      validRequestFlag = false;
      error.firmName = "Please enter firm name";
    }
    if(!contactType){
      validRequestFlag = false;
      error.contactType = "Please select one contact medium";
    }
    if(contactType === "Email" && !emailId){
      validRequestFlag = false;
      error.contactTypeFiled = "Please enter your email id";
    }
    if(contactType === "Phone" && !phoneNumber){
      validRequestFlag = false;
      error.contactTypeFiled = "Please enter your phone number";
    }

    if (fullName && !(/^[A-Za-z][A-Za-z ,._'-]+$/.test(fullName))) {
      validRequestFlag = false;
      error.fullName = "Please enter your valid name.\nValid characters are: A-Z,a-b,space, comma, apostrophe, hyphen, underscore, dot";
    }

    if (firmName && !(/^[A-Za-z][A-Za-z ,._'-]+$/.test(firmName))) {
      validRequestFlag = false;
      error.firmName = "Please enter your valid name.\nValid characters are: A-Z,a-b,space, comma, apostrophe, hyphen, underscore, dot";
    }
    
    setRequestDemoFormErrors(error);
    return validRequestFlag;
  };

  const contactTypeField = () => {
    if(contactType === "Email"){
      return <input type="text" className="input-type-text-area-sm" placeholder="Enter your email address *" onChange={(event) => setEmailId(event.target.value)}/>
    }
    else{
      return <input type="text" className="input-type-text-area-sm" placeholder="Enter your phone number  *" onChange={(event) => setPhoneNumber(event.target.value)}/>
    }
  }

  function submitRequestDemo(){
    if(validateRequestDemoForm()){
      AddRequestDemo(fullName,firmName,emailId,phoneNumber,sourcePage).then((data) =>{
        console.log("response",data);
        if(data === "succesfully_added"){
          setStage(2);
          TagManager.dataLayer({
            dataLayer: {
              event: 'User Requested Demo'
            },
          });
        }
      })
    }
  }
  
  const submitOptionalFeedback = () =>{
    UpdateOptionalFeedback(emailId,phoneNumber,optionalFeedback1,optionalFeedback2).then((data) =>{
      TagManager.dataLayer({
        dataLayer: {
          event: 'User Shared Feedback'
        },
      });
    })
  }

  return (
    <div> 
      <div style={myStyle} className="linesection">
        <div className="sectiondivide section1 demoscreen" style={lineStyle}>        
          {stage === 1 && (
            <div className="context">
            <h1>Request a Demo</h1>
            <p>
              We develop technologies to make high-end investment tools
              easy-to-use and cost-effective for advisors and clients, including
              tax-smart rebalancing and downside protection. <span>*</span>
            </p>
            <form className="demoform">
              <div className="doubleinput">
                <div className="inputsection">
                  <input type="text" className="input-type-text-area-sm" placeholder="Your name *" onChange={(event) => setFullName(event.target.value)}/>
                  <div className="error-message">
                    <p className="invalidMessage">{requestDemoFormErrors.fullName}</p>
                  </div>
                </div>
                <div className="inputsection">
                  <input type="text" className="input-type-text-area-sm" placeholder="Your firm name" onChange={(event) => setFirmName(event.target.value)}/>
                  <div className="error-message">
                    <p className="invalidMessage">{requestDemoFormErrors.firmName}</p>
                  </div>
                </div>
              </div>
              <div className="userselection contactselection">
                <p>Please tell us how to contact you? *</p>
                <div className="inpcon">
                    <div className="inputbox">
                      <input
                        type="radio"
                        name="contacttype"
                        value="Email"
                        checked={contactType==="Email"}
                        onClick={(event) => setContactType(event.target.value)}
                      />
                      <label for="Email">Email</label>
                    </div>
                    <div className="inputbox">
                      <input
                        type="radio"
                        name="contacttype"
                        value="Phone"
                        checked={contactType==="Phone"}
                        onClick={(event) => setContactType(event.target.value)}
                      />
                      <label for="Phone">Phone Number</label>
                    </div>
                    <div className="error-message">
                      <p className="invalidMessage">{requestDemoFormErrors.contactType}</p>
                    </div>
                </div>
                {contactTypeField()}
                <div className="error-message">
                  <p className="invalidMessage">{requestDemoFormErrors.contactTypeFiled}</p>
                </div>
              </div>
              <div className="buttonsection">
                <a className="button" onClick={() => submitRequestDemo()}>Submit</a>
              </div>
            </form>
          </div>
          )}
          {stage === 2 && (
            <div className="context">
              <h1 className="c-primary pagehead">Thank you! <br></br>
              <span>We will contact you soon to schedule a demo.</span></h1>
              <h4>
                Would you like to tell us more about how the Shield could be useful to you.
              </h4>
              <form className="demoform">
                <div className="userselection">
                  <p>Please tell us what aspects of Adaptive Shield are interesting to you</p>
                  <textarea
                        type="text"
                        className="input-type-text-area-lg"
                        placeholder="(Optional)"
                        onChange={(event) => setOptionalFeedback1(event.target.value)}
                  />
                </div>
                <div className="userselection">
                  <p>How do you currently think you might use Adaptive Shield?</p>
                  <textarea
                        type="text"
                        className="input-type-text-area-lg"
                        placeholder="(Optional)"
                        onChange={(event) => setOptionalFeedback2(event.target.value)}
                  />
                </div>
                <div className="buttonsection">
                  <button className="button secondary">Dismiss</button>
                  <button className="button" onClick={() => submitOptionalFeedback()}>Submit</button>
                </div>
              </form>
            </div>
          )}
          <div className="image">
            <img src="Assets/adaptive_mockup.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
