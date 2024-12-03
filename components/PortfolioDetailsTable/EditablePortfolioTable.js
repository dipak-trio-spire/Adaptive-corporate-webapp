import React from 'react';
import IconButton from '@mui/material/IconButton';

const EditablePortfolioTable = ({ tickerData, handleInputChange, handleDeleteClick }) => (
    <table className='tikerdata'>
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Position Name</th>
                <th>Quantity</th>
                <th>Market Value</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            {tickerData.map((tickerObj, index) => (
                <tr key={index}>
                    <td>
                        <input
                            placeholder='Enter Symbol'
                            className="input-gray"
                            name="symbol"
                            value={tickerObj.symbol}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                    </td>
                    <td>
                        <input
                            placeholder='Position Name'
                            className="input-gray"
                            name="company_name"
                            value={tickerObj.company_name}
                            disabled={true}
                        />
                    </td>
                    <td>
                        <input
                            placeholder='Enter Quantity'
                            className="input-gray"
                            type="number"
                            name="quantity"
                            value={tickerObj.quantity}
                            onChange={(e) => handleInputChange(e, index)}
                        />
                        {tickerObj.message && <span className='invalidMessage'>{tickerObj.message}</span>}
                    </td>
                    <td>
                        <input
                            placeholder='Market Value'
                            className="input-gray"
                            name="market_value"
                            value={tickerObj.format_market_value}
                            disabled={true}
                        />
                    </td>
                    <td>
                        <IconButton
                            style={{ paddingTop: '20px' }}
                            aria-label="delete"
                            color="secondary"
                            onClick={() => handleDeleteClick(index)}
                        ><img src="Assets/delete.svg"></img></IconButton>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default EditablePortfolioTable;
