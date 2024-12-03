
export async function AddThirdPartyUser(payload) {
    var raw = JSON.stringify(
        payload
    )

    var requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow"
    };
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_HALO_ADD_USER_API,
            requestOptions
        );
        if (!response.ok) {
            console.log("Could not add your request for demo");
            return false;
        } else {
            const message = await response.json();
            if (message["result"] !== "") {
                return message["result"];
            } else {
                console.log(message["error"]);
                return false
            }
        }
    } catch (error) {
        if (error.name === "AbortError") {
            return 0
        }
        else {
            return 0
        }
    }
}
