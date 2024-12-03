import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import CustomPopup from "../../components/Popup/Popup";
import { AddThirdPartyUser } from '@/pages/api/AddThirdPartyUser';

const RegistrationForm = ({ closePopup }) => {
    const [selectedTab, setSelectedTab] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [firm, setFirm] = useState('');
    const [popupState, setPopupState] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userUuid = uuidv4();
        localStorage.setItem('userUuid', userUuid);

        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 6);
        localStorage.setItem('uuidExpiration', expirationDate.toISOString());

        const payload = {
            uuid: userUuid,
            name: name,
            email_id: email,
            adaptive_client: 'halo',
            user_type: selectedTab,
            ...(selectedTab === 'Advisor' && { firm_name: firm }),
        };

        AddThirdPartyUser(payload).then((data) => {
            if (data !== false && data !== 0 && data !== undefined && data !== null) {
                console.log("Thank you for registration");
            }
            else if (data === false || data === 0 || data === undefined) {
                setPopupState(true);
                setPopupMessage(
                    "There was an issue while registration, Please try again later."
                );
                setAlertType("error");
            }
        })

        setName('');
        setEmail('');
        setFirm('');
        setSelectedTab(null);
        closePopup(userUuid);
    };

    return (
        <div>
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title="Error"
                alertType={alertType}
                content={popupMessage}
            />
            <div className="popupselecttext">
                <h1>Welcome to Halo</h1>
            </div>
            {!selectedTab && (
                <div className='halopopup'>
                    <p>Please let us know if you are an individual investor or a registered investment advisor (RIA)</p>
                    <div className='userselector'>
                        <Link href="javascript:;" onClick={() => setSelectedTab('Investor')}>
                            <img
                                src="/Assets/investor.svg"
                                alt="Investor"
                            />
                            <span>Investor</span>
                        </Link>
                        <Link href="javascript:;" onClick={() => setSelectedTab('Advisor')}>
                            <img
                                src="/Assets/advisor.svg"
                                alt="Advisor"
                            />
                            <span>Advisor</span>
                        </Link>
                    </div>
                </div>
            )}
            {selectedTab && (
                <form onSubmit={handleSubmit} className='popuptext'>
                    {selectedTab === 'Investor' && (
                        <p>Please provide your name and email address below.</p>
                    )}
                    {selectedTab === 'Advisor' && (
                        <p>Please provide your name, email address, and firm name below.</p>
                    )}
                    <div className='inputcon'>
                        <input
                            className="input-gray"
                            placeholder="Your name *"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className='inputcon'>
                        <input
                            className="input-gray"
                            placeholder="Enter your email address *"
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    {selectedTab === 'Advisor' && (
                        <>
                            <div className='inputcon'>
                                <input
                                    className="input-gray"
                                    placeholder="Firm name *"
                                    type="text"
                                    id="firm"
                                    value={firm}
                                    onChange={(e) => setFirm(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                    )}
                    <button type="submit" className='ai-btn primary solid'>Submit</button>
                </form>
            )}
        </div>
    );
};

export default RegistrationForm;
