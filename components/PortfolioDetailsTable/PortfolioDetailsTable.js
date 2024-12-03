import { useState } from 'react';

function PortfolioDetailsTable({ PortfolioRows }) {
    const [showcollapse, setShowcollapse] = useState(false);
    return (
        <>
            <div className="collapse">
                <h4 onClick={() => setShowcollapse(!showcollapse)}>Portfolio Details {showcollapse && <span className="minus">-</span>} {!showcollapse && <span>+</span>}</h4>
                {showcollapse && <div className="tablecon portfolioinp">
                    <table>
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th className="bigth">Name</th>
                                <th>Allocation</th>
                                <th>Mutual Fund</th>
                                <th className="bigth">Mutual Fund Name</th>
                                <th className="bigth">Market Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {PortfolioRows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}><input className="input-gray" disabled={true} placeholder={cell}></input></td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        {/* <tfoot>
                                    <tr>
                                        <td colSpan="5"><button className="ai-btn secondary solid">Recalculate</button><span className="infowarning"><img src="Assets/warn.svg"/>Press Recalculate in order to view results for updated portfolio contents</span></td>
                                    </tr>  
                                </tfoot> */}
                    </table>
                </div>}
            </div>
        </>
    );
};

export default PortfolioDetailsTable;