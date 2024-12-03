import pako from 'pako';

export async function FetchForwardSimulation(portfolio_name, portfolio_value, simulation_period, protection_period, protection_level, number_of_paths) {

    const Token = sessionStorage.getItem("Token");

    const header = { Authorization: Token, 'Accept-Encoding': 'gzip' };

    var raw = JSON.stringify({
        portfolio_name: portfolio_name,
        portfolio_value: portfolio_value,
        simulation_period: simulation_period,
        protection_period: protection_period,
        protection_level: protection_level,
        number_of_paths: number_of_paths,
    });
    console.log(" raw", raw)

    var requestOptions = {
        method: "POST",
        headers: header,
        body: raw,
        redirect: "follow",
    };
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_FORWARD_TEST_API,
            requestOptions
        );
        if (response.message === "Internal server error") {
            alert("We are facing server issues");
        } else if (response.message === "The incoming token has expired") {
            alert("Your session has expired please log-in again");
        } else {

            const rawData = await response.text();
            const compressedData = atob(rawData)
            const uint8Array = new Uint8Array(compressedData.length);
            for (let i = 0; i < compressedData.length; i++) {
                uint8Array[i] = compressedData.charCodeAt(i);
            }
            const uncompressedData = pako.inflate(uint8Array, { to: 'string' });
            const data = JSON.parse(uncompressedData);

            if (data !== "") {
                return data;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log("ERRR", error);
        if (error.name === "AbortError") {
            console.log("The request timed out, Please try again");
        }
        else {
            return 0
        }
    }
}
