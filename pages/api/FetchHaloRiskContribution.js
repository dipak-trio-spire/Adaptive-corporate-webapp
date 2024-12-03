export async function FetchHaloRiskContribution(pli, uuid, request_source, action) {

    var raw = JSON.stringify({
        pli: pli,
        uuid: uuid,
        request_source: request_source,
        action: action
    });

    console.log(raw);
    var requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow",
    };

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_HALO_RISK_CONTRIBUTION_API,
            requestOptions
        );
        const data = await response.json();
        if (data["result"] !== "") {
            return data;
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
