import React from "react";
import CustomPopup from "../Popup/Popup";
import { AddLeads } from "@/pages/api/AddLeads";
import { UpdateLeads } from "@/pages/api/UpdateLeads";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TagManager from "react-gtm-module";
import PageLoader from '@/components/PageLoader/PageLoader';

export default function AddUser(props) {

    const [popupState, setPopupState] = React.useState(false);
    const [popupMessage, setPopupMessage] = React.useState("");
    const [popupTitle, setPopupTitle] = React.useState("");
    const [alertType, setAlertType] = React.useState("");
    const [EmailId, setEmailId] = React.useState("");
    const [InvalidMessage, setInvalidMessage] = React.useState("");
    const [showPopup, setShowPopup] = React.useState(false);
    const [UserType, setUserType] = React.useState("");
    const [FullName, setFullName] = React.useState("");
    const [FirmName, setFirmName] = React.useState("");
    const [About, setAbout] = React.useState("");
    const [AdvisorFlag, setAdvisorFlag] = React.useState(false);
    const [PopupValidationError, setPopupValidationError] = React.useState([]);
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [interest, setInterest] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [errors, setErrors] = React.useState({});
    const [bdopen, setBdOpen] = React.useState(false);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const validateUserForm = () => {
        const errors = {};
        if (firstName.trim() === "") {
            errors.firstName = "First name is required";
        }
        if (lastName.trim() === "") {
            errors.lastName = "Last name is required";
        }
        if (UserType.trim() === "") {
            errors.UserType = "User type is required";
        }
        if (interest.trim() === "") {
            errors.interest = "Interest is required";
        }
        if (EmailId.trim() === "") {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailId)) {
            errors.email = "Email is invalid";
        }
        // if (phone.trim() === "") {
        //     errors.phone = "Phone number is required";
        // }
        return errors;
    };

    const handleUserDetailsSubmit = (e) => {
        e.preventDefault();
        const errors = validateUserForm();
        if (Object.keys(errors).length === 0) {
            setBdOpen(true);
            let page = window.location.href;
            AddLeads(EmailId, page, UserType, false, false,
                firstName, lastName, phone, interest, About).then((data) => {
                    if (data !== undefined && data !== 0 && data !== false) {
                        TagManager.dataLayer({
                            dataLayer: {
                                event: 'User Signup'
                            },
                        });
                        setFirstName("");
                        setLastName("");
                        setEmailId("");
                        setInterest("");
                        setPhone("");
                        setErrors({});
                        setUserType("");
                        setAbout("");

                        sleep(200).then(() => {
                            setBdOpen(false);
                            setPopupMessage("Thank you for reaching out, we will be in touch soon.")
                            setPopupState(true)
                            setPopupTitle("Signup Success")
                            setAlertType("success")
                        })
                    } else {
                        setBdOpen(false);
                        setPopupMessage(
                            "Unable to add details. Please try again later or contact support@adaptive-investments.com."
                        );
                        setPopupState(true);
                        setPopupTitle("Error");
                        setAlertType("Error");
                    }
                })
        } else {
            setBdOpen(false);
            setErrors(errors);
        }
    }

    const validateSignup = () => {
        let validFormFlag = true;
        if (!EmailId) {
            validFormFlag = false;
            setInvalidMessage("Please enter your email id")
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(EmailId)) {
            validFormFlag = false;
            setInvalidMessage('Invalid email address')
        }
        return validFormFlag;
    };

    const validatePopup = () => {
        let validPopupFlag = true;
        let error = {};
        if (!FullName) {
            validPopupFlag = false
            error.fullname = "Please enter your full name";
        }
        if (UserType.length === 0 && UserType === "") {
            alert(UserType)
            validPopupFlag = false
            error.usertype = "Please select your user type";
        }
        setPopupValidationError(error);
        return validPopupFlag
    }

    const submitSignup = () => {
        if (validateSignup()) {
            let page = window.location.href;
            if (props.singupFor === 'risk') {
                AddLeads(EmailId, page, UserType, props.updates.dailyUpdates, props.updates.statusUpdates).then((data) => {
                    if (data[0]) {
                        setShowPopup(true);
                        TagManager.dataLayer({
                            dataLayer: {
                                event: 'User Signup'
                            },
                        });
                    }
                })
            }
            else if (props.singupFor === 'shieldpricer' || props.singupFor === 'riskcontribute' || props.singupFor === 'forwardtest') {
                AddLeads(EmailId, page, UserType).then((data) => {
                    if (data[0]) {
                        setShowPopup(true);
                        TagManager.dataLayer({
                            dataLayer: {
                                event: 'User Signup'
                            },
                        });
                    }
                })
            }
        }
    }

    const SubmitPopup = (e) => {
        e.preventDefault();
        if (validatePopup()) {
            UpdateLeads(
                EmailId,
                UserType,
                FullName,
                FirmName,
                About
            ).then((data) => {
                closePopup()
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'User Shared Additional Information'
                    },
                });
            });
        }
    };

    const changeUserType = (usertype) => {
        setUserType(usertype);
        if (usertype === "Advisor") {
            setShowPopup(true);
            setAdvisorFlag(true);
        }
        else {
            setAdvisorFlag(false);
            setShowPopup(true);
        }
    }

    const closePopup = () => {
        setShowPopup(false);
        setEmailId("");
        setUserType("");
        setFullName("");
        setFirmName("");
        setAdvisorFlag(false);
        setAbout("");
        props.onChange(true)

    }

    function showAdvisorFields() {
        if (AdvisorFlag === true) {
            return (
                <>
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
                </>
            )
        }
        else {
            return (
                <>
                    <textarea
                        type="text"
                        className="input-type-text-area-lg"
                        placeholder="How did you hear about us?&#10;Other Comments?"
                        onChange={(event) => setAbout(event.target.value)}
                    />
                </>
            )
        }
    }

    return (
        <>
            <PageLoader bdopen = {bdopen}/>
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title={popupTitle}
                content={popupMessage}
                alertType={alertType}
            />
            <>
                {props.singupFor === "risk" && (
                    <div className="riskalert">
                        <div className="main-header signupform">
                            <form>
                                <input className="input-type-text-area-sm" type="text" placeholder="Enter your email" onChange={(event) => setEmailId(event.target.value)} value={EmailId} />
                                <p className="invalidMessage">{InvalidMessage}</p>
                            </form>
                            <div className="buttondiv">
                                <button className="button" onClick={() => submitSignup()} >
                                    {props.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {(props.singupFor === "shieldpricer" || props.singupFor === 'riskcontribute' || props.singupFor === 'forwardtest') && (
                    <div className="riskalert">
                        <div className="main-header signupform">
                            <form>
                                <input className="input-type-text-area-sm" type="text" placeholder="Enter your email" onChange={(event) => setEmailId(event.target.value)} value={EmailId} />
                                <p className="invalidMessage">{InvalidMessage}</p>
                            </form>
                            <div className="buttondiv bigbtn">
                                <button className="button" onClick={() => submitSignup()}>
                                    {props.buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showPopup === true && (
                    <div className="overlay">
                        <div className="pop-up">
                            <button
                                className="close-button"
                                onClick={() => {
                                    closePopup()
                                }}
                            >
                                X
                            </button>
                            <form onSubmit={SubmitPopup}>
                                <div className="tickcon"><img className="tick" src="Assets/tick-mark.png" alt=""></img></div>
                                <div className="popuptext">
                                    <div className="userselection">
                                        <h3>Thank You !</h3>
                                        <p>You have signed up for announcements.</p>
                                    </div>
                                    <hr></hr>
                                    <div className="userselection">
                                        <p>Would you like to tell us more?</p>
                                        <div className="main-header">
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
                                    <p className="invalidMessage">{PopupValidationError.usertype}</p>
                                    <div className="userform">
                                        <div className="inputcon">
                                            <input
                                                type="text"
                                                className="input-type-text-area-sm"
                                                placeholder="Full name"
                                                onChange={(event) => setFullName(event.target.value)}
                                            />
                                            <p className="invalidMessage">{PopupValidationError.fullname}</p>
                                        </div>
                                        {showAdvisorFields()}
                                    </div>
                                    <button className="button">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
                {props.showDetailsForm === true && (
                    <div className="sectiondivide ShieldCard footersection" id="joinbeta">
                        <div className="innercontent">
                            <h3 className="sec-head">Ready to protect your wealth? Let’s talk.</h3>
                            <div className="contactfooter">
                                <form onSubmit={handleUserDetailsSubmit}>
                                    <div className="userform">
                                        <div className="doubleinput">
                                            <div className="inputcon">
                                                <label>First name*</label>
                                                <input
                                                    type="text"
                                                    className="input-gray"
                                                    placeholder="First Name"
                                                    value={firstName}
                                                    onChange={(event) => setFirstName(event.target.value)}
                                                />
                                                {errors.firstName && <p className="invalidMessage">{errors.firstName}</p>}
                                            </div>
                                            <div className="inputcon">
                                                <label>last name*</label>
                                                <input
                                                    type="text"
                                                    className="input-gray"
                                                    placeholder="Last Name"
                                                    value={lastName}
                                                    onChange={(event) => setLastName(event.target.value)}
                                                />
                                                {errors.lastName && <p className="invalidMessage">{errors.lastName}</p>}
                                            </div>
                                        </div>
                                        <div className="doubleinput">
                                            <div className="inputcon">
                                                <label>Email*</label>
                                                <input
                                                    type="text"
                                                    className="input-gray"
                                                    placeholder="Email"
                                                    value={EmailId}
                                                    onChange={(event) => setEmailId(event.target.value)}
                                                />
                                                {errors.email && <p className="invalidMessage">{errors.email}</p>}
                                            </div>
                                            <div className="inputcon">
                                                <label>Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="input-gray"
                                                    placeholder="Phone No"
                                                    value={phone}
                                                    onChange={(event) => setPhone(event.target.value)}
                                                />
                                                {/* {errors.phone && <p className="invalidMessage">{errors.phone}</p>} */}
                                            </div>
                                        </div>
                                        <div className="doubleinput">
                                            <div className="inputcon">
                                                <label>I am*</label>
                                                <Select
                                                    value={UserType}
                                                    className="input-mui-lg"
                                                    onChange={(e) => setUserType(e.target.value)}
                                                >
                                                    <MenuItem value="">Select user type</MenuItem>
                                                    <MenuItem value="Investor">Investor</MenuItem>
                                                    <MenuItem value="Advisor">Advisor</MenuItem>
                                                    <MenuItem value="Enterprise">Enterprise</MenuItem>
                                                </Select>
                                                {errors.UserType && <p className="invalidMessage">{errors.UserType}</p>}
                                            </div>
                                            <div className="inputcon">
                                                <label>I am interested in*</label>
                                                <Select
                                                    value={interest}
                                                    className="input-mui-lg"
                                                    onChange={(e) => setInterest(e.target.value)}
                                                >
                                                    <MenuItem value="">Select interest</MenuItem>
                                                    <MenuItem value="pilot account">Pilot Account</MenuItem>
                                                    <MenuItem value="demo">Demo</MenuItem>
                                                </Select>
                                                {errors.interest && <p className="invalidMessage">{errors.interest}</p>}
                                            </div>
                                        </div>
                                        <textarea
                                            type="text"
                                            className="input-gray"
                                            value={About}
                                            placeholder="How did you hear about us?"
                                            onChange={(event) => setAbout(event.target.value)}
                                        />
                                        <button className="button">Submit</button>
                                    </div>                                    
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </>
    );
}
