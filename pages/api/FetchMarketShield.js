export async function FetchMarketShield(portfolio_value, portfolio_name, protection_period) {

    var raw = JSON.stringify({
        portfolio_name: portfolio_name,
        portfolio_value: portfolio_value,
        protection_period: protection_period
    });

    console.log(" raw in ms", raw)
    var requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow",
    };

    // return false;

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_MARKET_SHIELD_DATA,
            requestOptions
        );
        const data = await response.json();
        if (data["result"] !== "") {
            return data["result"];
            // return false;
        } else {
            console.log(data["error"]);
            return false;
        }
    } catch (error) {
        if (error.name === "AbortError") {
            alert("The request timed out, Please try again");
            window.location.reload();
        }
        else {
            return 0
        }
    }
}
