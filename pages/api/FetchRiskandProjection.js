export async function FetchRiskandProjection(portfolio_value, portfolio_name) {

    var raw = JSON.stringify({
        portfolio_name: portfolio_name, 
        portfolio_value: portfolio_value
    });

    var requestOptions = {
        method: "POST",
        body: raw,
        // headers: header,
        redirect: "follow",
    };

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_RISK_AND_PROJECTION,
            requestOptions
        );
        const data = await response.json();
        if (data["result"] !== "") {
            return data["result"];
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
