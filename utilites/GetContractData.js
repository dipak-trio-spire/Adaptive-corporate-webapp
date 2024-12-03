import { addZeroes } from "./AddZeros";
import { formatContract } from './FormatContract';

const formatOptionContract = (data) => {
    const { symbol, expirationdate, strikeprice, CallPut } = data;
    const formattedDate = new Date(expirationdate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        timeZone: "UTC" 
    }).replace(',', '');

    return `${symbol} ${formattedDate} $${Number(strikeprice).toFixed(2)} ${CallPut.toUpperCase()}`;
};

export async function GetContractData(selected_mkt_data) {
    try {
        if (!selected_mkt_data || typeof selected_mkt_data !== 'object') {
            throw new Error("Invalid market data received");
        }

        var marketProtectionList = [];
        var portfolioProtectionList = [];
        var MarketTotalValue = 0;
        var PortfolioTotalValue = 0;
        var currObj = {
            style: "currency",
            currency: "USD",
        };

        // Index option handling
        const indexOption = selected_mkt_data["index_option"];
        if (indexOption) {
            const indexOptionCost = parseFloat(indexOption.Cost) || 0;
            marketProtectionList.push([
                1,
                formatOptionContract(indexOption),
                Number(indexOption.Quantity.toFixed(2)).toLocaleString("en-US"),
                Number(addZeroes(indexOption.ask.toFixed(2))).toLocaleString("en-US", currObj),
                Number(addZeroes((indexOptionCost).toFixed(2))).toLocaleString("en-US", currObj)
            ]);
            MarketTotalValue += indexOptionCost; 
        }

        // Stock options handling
        const stockOptions = selected_mkt_data["stock_options"];
        if (stockOptions && Array.isArray(stockOptions)) {
            stockOptions.forEach((option, index) => {
                const optionCost = parseFloat(option.Cost) || 0; 
                portfolioProtectionList.push([
                    index + 1,
                    formatOptionContract(option),
                    Number(option.Quantity.toFixed(2)).toLocaleString("en-US"),
                    Number(addZeroes(option.ask.toFixed(2))).toLocaleString("en-US", currObj),
                    Number(addZeroes((optionCost).toFixed(2))).toLocaleString("en-US", currObj)
                ]);
                PortfolioTotalValue += optionCost;
            });
        }

        PortfolioTotalValue = parseFloat(PortfolioTotalValue.toFixed(2));
        MarketTotalValue = parseFloat(MarketTotalValue.toFixed(2));
    } catch (e) {
        console.log(e.message);
    }

    return [portfolioProtectionList, marketProtectionList, PortfolioTotalValue, MarketTotalValue];
}
