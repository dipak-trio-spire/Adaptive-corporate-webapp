import { addZeroes } from "./AddZeros";

export async function GetPortfolioTable(data) {
    var currObj = {
        style: "currency",
        currency: "USD",
    };
    try {
        var portfolio_lyst = [];
        console.log("data", data);

        for (var i = 0; i < data.length; i++) {
            // Calculating market value
            const marketValue = Number(parseFloat(data[i]["value_dist"]).toFixed(2));

            portfolio_lyst.push([
                data[i]["symbol"], // Symbol (e.g., AAPL, AMZN)
                data[i]["name"], // Name (e.g., Apple Inc, Amazon.com Inc.)
                (data[i]["weight"] * 100).toFixed(0) + "%", // Weight as percentage
                data[i]["mutual_fund_ticker"] ? data[i]["mutual_fund_ticker"] : '', // Mutual Fund Ticker (if available)
                data[i]["mutual_fund_name"] ? data[i]["mutual_fund_name"] : '', // Mutual Fund Name (if available)
                Number(addZeroes(marketValue)).toLocaleString("en-US", currObj), // Market Value formatted
                data[i]["quantity"].toFixed(2) // Quantity rounded to 2 decimal places
            ]);
        }
        return portfolio_lyst;
    } catch (e) {
        console.log(e.message);
    }
}
