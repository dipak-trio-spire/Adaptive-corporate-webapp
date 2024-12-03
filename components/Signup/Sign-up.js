// import styles from '@/styles/Sign-up.module.css';
import React from "react";
import { AddLeads } from "@/pages/api/AddLeads";
import { UpdateLeads } from "@/pages/api/UpdateLeads";
import TagManager from "react-gtm-module";

export default function Signup(props) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [EmailId, setEmailId] = React.useState("");
  const [UserType, setUserType] = React.useState("");
  const [FullName, setFullName] = React.useState("");
  const [FirmName, setFirmName] = React.useState("");
  const [About, setAbout] = React.useState("");
  const [AdvisorFlag, setAdvisorFlag] = React.useState(false);
  const [InvalidMessage, setInvalidMessage] = React.useState("");

  const refreshPage = () => {
    window.location.reload();
  };

  const SubmitForm = (e) => {
    let page = window.location.href;
    e.preventDefault();
    if (ValidateEmail()) {
      if (AddLeads(EmailId, page, UserType) === "Email already exists") {
        setInvalidMessage("Email entered already exists in the system")
      }
      else {
        //setUserType("Investor");
        setInvalidMessage("");
        setShowPopup(true);
        TagManager.dataLayer({
          dataLayer: {
            event: 'User Signup'
          },
        });
      }
    }
    else {
      setInvalidMessage("Please enter correct email");
    }
  };

  const SubmitPopup = (e) => {
    e.preventDefault();
    console.log(EmailId, UserType, FullName, FirmName, About);
    UpdateLeads(
      EmailId,
      UserType,
      FullName,
      FirmName,
      About
    ).then((data) => {
      console.log(data);
      refreshPage();
      TagManager.dataLayer({
        dataLayer: {
          event: 'User Shared Additional Information'
        },
      });
    });
  };

  const changeUserType = (usertype) => {
    setUserType(usertype);
    if (usertype === "Advisor") {
      setShowPopup(false);
      setAdvisorFlag(true);
    }
    else {
      setAdvisorFlag(false);
      setShowPopup(true);
    }
  }

  const ValidateEmail = () => {
    let validFormFlag = false;
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailId)) {
      validFormFlag = true;
    }
    return validFormFlag;
  };

  return (
    <div className="main-header signupform">
      <form onSubmit={SubmitForm}>
        <input
          className="input-type-text-area-sm"
          type="text"
          placeholder="Enter your email"
          onChange={(event) => setEmailId(event.target.value)}
        />
        <p className="invalidMessage">{InvalidMessage}</p>
      </form>
      <div className="buttondiv">
        <button onClick={SubmitForm} className="button">
          Sign Up
        </button>
        {showPopup === true && (
          <div className="overlay">
            <div className="pop-up">
              <button
                className="close-button"
                onClick={() => {
                  setShowPopup(false);
                  refreshPage();
                }}
              >
                X
              </button>
              <form onSubmit={SubmitPopup}>
                <div className="tickcon"><img className="tick" src="/Assets/tick-mark.png"></img></div>
                <div className="popuptext">
                  <div className="userselection">
                    <h3>Thank You !</h3>
                    <p>You have signed up for announcements.</p>
                  </div>
                  <hr></hr>
                  <div className="userselection">
                    <p>Would you like to tell us more?</p>
                    <div
                      className="main-header"
                    >
                      <div className="inpcon">
                        <div className="inputbox">
                          <input
                            type="radio"
                            name="radio"
                            checked={UserType === "Investor"}
                            value="Investor"
                            onChange={(event) =>
                              changeUserType(event.target.value)
                            }
                          />
                          <label for="investor">I am an Investor</label>
                        </div>
                        <div className="inputbox">
                          <input
                            type="radio"
                            name="radio"
                            checked={UserType === "Advisor"}
                            value="Advisor"
                            onChange={(event) =>
                              changeUserType(event.target.value)
                            }
                          />
                          <label for="advisor">I am an Advisor</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="input-type-text-area-sm"
                    placeholder="Full name"
                    onChange={(event) => setFullName(event.target.value)}
                  />
                  <textarea
                    type="text"
                    className="input-type-text-area-lg"
                    placeholder="How did you hear about us?&#10;Other Comments?"
                    onChange={(event) => setAbout(event.target.value)}
                  />
                  <button className="button">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {AdvisorFlag === true && (
          <div className="overlay">
            <div className="pop-up">
              <button
                className="close-button"
                onClick={() => {
                  setShowPopup(false);
                  refreshPage();
                }}
              >
                X
              </button>
              <form onSubmit={SubmitPopup}>
                <div className="tickcon"><img className="tick" src="/Assets/tick-mark.png"></img></div>
                <div className="popuptext">
                  <h3>Thank You !</h3>
                  <p>You have signed up for announcements.</p>
                  <hr></hr>
                  <p>Would you like to tell us more?</p>
                  <div
                    className="main-header"
                  >
                    <div className="inpcon">
                      <div className="inputbox">
                        <input
                          type="radio"
                          name="radio"
                          checked={UserType === "Investor"}
                          value="Investor"
                          onChange={(event) =>
                            changeUserType(event.target.value)
                          }
                        />
                        <label for="investor">I am an Investor</label>
                      </div>
                      <div className="inputbox">
                        <input
                          type="radio"
                          name="radio"
                          checked={UserType === "Advisor"}
                          value="Advisor"
                          onChange={(event) =>
                            changeUserType(event.target.value)
                          }
                        />
                        <label for="advisor">I am an Advisor</label>
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="input-type-text-area-sm"
                    placeholder="Your name"
                    onChange={(event) => setFullName(event.target.value)}
                  />
                  <input
                    type="text"
                    className="input-type-text-area-sm"
                    placeholder="Your firm name"
                    onChange={(event) => setFirmName(event.target.value)}
                  />
                  <textarea
                    type="text"
                    className="input-type-text-area-lg"
                    placeholder="Message to us"
                    onChange={(event) => setAbout(event.target.value)}
                  />
                  <button className="button">Submit</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
