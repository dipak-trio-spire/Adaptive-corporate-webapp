export async function UploadCsvFile(file, uuid, request_source, action) {

    var raw = JSON.stringify({
        file: file,
        uuid: uuid,
        request_source: request_source,
        action: action
    });

    var requestOptions = {
        method: "POST",
        body: raw,
        redirect: "follow",
    };

    try {

        const response = await fetch(
            process.env.NEXT_PUBLIC_FETCH_HALO_CSV_IMPORT_API,
            requestOptions
        );
        const data = await response.json();
        console.log(" data", data);
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
