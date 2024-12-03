export async function FetchSelfAssemblyData(raw) {

    var requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow",
    };

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_SELF_ASSEMBLY_DATA,
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
