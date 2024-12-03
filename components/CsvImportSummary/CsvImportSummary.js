import React from 'react';
import { useRouter } from 'next/router';
import { Tab, Tabs } from "react-bootstrap";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { addZeroes } from "../../utilites/AddZeros";
import CustomPopup from "../../components/Popup/Popup";
import PageLoader from '@/components/PageLoader/PageLoader';

function CsvImportSummary({ hostname }) {

    var currObj = {
        style: "currency",
        currency: "USD",
    };

    const router = useRouter();
    const [data, setData] = React.useState(null);
    const [bdopen, setBdOpen] = React.useState(false);
    const [popupState, setPopupState] = React.useState(false);
    const [popupMessage, setPopupMessage] = React.useState("");
    const [alertType, setAlertType] = React.useState("");

    React.useEffect(() => {
        const CsvData = localStorage.getItem('CsvData')

        if (CsvData) {
            setData(JSON.parse(CsvData))
            // localStorage.removeItem('CsvData')
        }
    }, [])

    const importData = async () => {
        setBdOpen(true)
        localStorage.setItem('ShowRiskData', 'true')
        router.push('/tools/riskcontribution');
    }

    const cancelImport = async () => {
        setBdOpen(true)
        router.push('/tools/riskcontribution');
    }

    return (
        <>
            <PageLoader bdopen={bdopen} hostname={hostname} />
            <CustomPopup
                trigger={popupState}
                setTrigger={setPopupState}
                title="Import Summary"
                alertType={alertType}
                content={popupMessage}
            />
            {data && (
                <div className="sectiondivide section-col">
                    <div className="import-info">
                        <div><text>IMPORT SUMMARY: &nbsp;</text>
                            {data["recognised"].length} assets recognized and {data["un_recognised"].length} not
                            recognized
                        </div>
                        <a className='ai-btn primary solid' onClick={importData} >Import</a>
                        <a className='ai-btn primary solid' onClick={cancelImport} >Cancel</a>
                    </div>
                    <Tabs
                        defaultActiveKey="recognize"
                        id="csv-stocks"
                        className="ai-tabs"
                    >
                        <Tab eventKey="recognize" title="Assets Recognized">
                            <div className="">
                                <TableContainer className="table_height">
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Symbol</TableCell>
                                                <TableCell>Position Name</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell>Last Price</TableCell>
                                                <TableCell>Market Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data["recognised"].map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.symbol}</TableCell>
                                                    <TableCell>{item.company_name}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>{Number(
                                                        addZeroes(Number(parseFloat(item.buyprice).toFixed(2)))
                                                    ).toLocaleString("en-US", currObj)}
                                                    </TableCell>
                                                    <TableCell>{Number(
                                                        addZeroes(Number(parseFloat(item.buyprice * item.quantity).toFixed(2)))
                                                    ).toLocaleString("en-US", currObj)}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title="Assets Not Recognized">
                            <div className="">
                                <TableContainer className="table_height">
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Symbol</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell></TableCell>
                                                {/* <TableCell>Market Value</TableCell> */}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data["un_recognised"].map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>{item.symbol}</TableCell>
                                                    <TableCell>{item.quantity}</TableCell>
                                                    <TableCell>
                                                        {item.status === 'insufficient data' ? 'Insufficient Data' :
                                                            item.status === 'unrecognised' ? 'Not Recognized' :
                                                                'Unknown Status'}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Tab>
                    </Tabs>
                    <div className='importbtn'>
                        <a className='ai-btn primary solid' onClick={importData}>Import</a>
                        <a className='ai-btn primary solid' onClick={cancelImport}>Cancel</a>
                    </div>
                </div>
            )}
        </>
    );
}

export default React.memo(CsvImportSummary);
