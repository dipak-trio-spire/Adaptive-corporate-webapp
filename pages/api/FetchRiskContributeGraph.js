
export async function FetchRiskContributeGraph() {
    
    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_RISK_GRAPH_DATA_API,
            requestOptions
        );
        if (response.message === "Internal server error") {
            alert("We are facing server issues");
        } else if (response.message === "The incoming token has expired") {
            alert("Your session has expired please log-in again");
        } else {
            const data = await response.json();
            if (data["result"] !== "") {
                return data["result"];
            } else {
                return false;
            }
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
