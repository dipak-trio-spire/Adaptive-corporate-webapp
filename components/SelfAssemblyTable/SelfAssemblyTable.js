import { addZeroes } from "../../utilites/AddZeros";

function SelfAssemblyTable({ rows, rows2, gauranteeAssemblyTotal, marketProtectionTotal, IndexBeta, TrackingError, IndexR2, expectedPortfolioStockCount }) {

    var currObj = {
        style: "currency",
        currency: "USD",
    };

    const warningStyle = {
        color: '#60034c',
        fontWeight: 'bold',
        textAlign: 'left',
        padding: '5px',
        borderRadius: '5px 5px 0 0',
    };

    console.log("expectedPortfolioStockCount", expectedPortfolioStockCount, rows.length);

    const hasUnavailablePricesPortfolio = 
        rows.some(row => row.some(cell => cell === 'NA' || cell === '')) || 
        rows.length !== expectedPortfolioStockCount;

    // Check if any contract quantity is below 3 in rows2
    const hasFractionalContracts = rows2.some(row => parseFloat(row[2].replace(/,/g, '')) < 3);

    return (
        <>
            <div className="sectiondivide tablepart tables pt0 pb0">
                <div className="ai-guaranteed-results">
                    <div className="ai-guaranteed-table">
                        <div className="ai-card-header">
                            <h4>Portfolio Protection</h4>
                            <p>Put contracts for individual portfolio holdings, <br></br>with approximated strike price & expiration. <a className="ai-link" href="#faqsec" >Learn more.</a></p>
                        </div>
                        <div className="selfassambly-body">
                            <div className="ai-selfassembly-table">
                                <table>
                                    <thead>
                                        {/* Warning message row */}
                                        {hasUnavailablePricesPortfolio && (
                                            <tr>
                                                <td colSpan="5" style={warningStyle}>
                                                    WARNING: Some contract prices not available for selected protection period and protection level, or some stocks excluded due to small positions!
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <th>#</th>
                                            <th>Contract</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Display all rows */}
                                        {rows.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="ai-selfassembly-cost">
                                <p>Total Cost :<span className="price-Market"> {Number(
                                    addZeroes(
                                        Number(parseFloat(gauranteeAssemblyTotal).toFixed(2))
                                    )
                                ).toLocaleString("en-US", currObj)}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ai-affordable-results">
                    <div className="ai-guaranteed-table">
                        <div className="ai-card-header">
                            <h4>Market Protection</h4>
                            <p>Index options are often highly cost-effective, with a trade-off of tracking error. This free Adaptive tool scans for fit with cash-settled <a className="ai-link" target="_blank" href="https://www.cboe.com/tradable_products/sp_500/mini_spx_options/"> S&P 500,</a> <a className="ai-link" target="_blank" href="https://indexes.nasdaqomx.com/Index/Overview/XND"> Nasdaq 100, </a> & <a className="ai-link" target="_blank" href="https://www.cboe.com/tradable_products/ftse_russell/mini_russell_2000_index_options/"> Russell 2000. </a></p>
                            <p><a className="ai-link" target="_blank" href="https://app2.adaptive-investments.com/advisorsignup">Sign up for the Free Trial</a> for more features, including call writing for income.<a className="ai-link" href="#faqsec" >Learn more.</a></p>                
                        </div>
                        <div className="selfassambly-body">
                            <div className="ai-selfassembly-table">
                                <table>
                                    <thead>
                                        {/* Warning message row */}
                                        {hasFractionalContracts && (
                                            <tr>
                                                <td colSpan="5" style={warningStyle}>
                                                    NOTE: Fractional contracts displayed due to small account value. To access mini version of the popular index options that may be more suitable for small portfolios, <span><a className="ai-link" target="_blank" href="https://app2.adaptive-investments.com/advisorsignup">Sign up for the Free Trial</a></span>
                                                </td>
                                            </tr>
                                        )}
                                        <tr>
                                            <th>#</th>
                                            <th>Contract</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Display all rows */}
                                        {rows2.map((row, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex}>{cell}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="ai-selfassembly-cost">
                                <p>Total Cost :<span className="price-Guaranteed"> {Number(
                                    addZeroes(
                                        Number(parseFloat(marketProtectionTotal).toFixed(2))
                                    )
                                ).toLocaleString("en-US", currObj)}</span></p>
                                <p className="info">Beta {IndexBeta}; Tracking Error {TrackingError}; R-Squared {IndexR2}</p>
                                <p className="info"><a className="ai-link" target="_blank" href="https://app2.adaptive-investments.com/advisorsignup">Sign up for the Free Trial to</a> access call writing for income & other features.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelfAssemblyTable;
