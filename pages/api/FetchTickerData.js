export async function FetchTickerData() {

    var requestOptions = {
        method: "GET",
        redirect: "follow",
    };

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_TICKERS_API,
            requestOptions
        );
        const data = await response.json();
        console.log(" data", data)
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
