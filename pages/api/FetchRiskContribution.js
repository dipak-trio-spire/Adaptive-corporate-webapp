export async function FetchRiskContribution(portfolio_name, portfolio_value) {
    const raw = JSON.stringify({
        portfolio_name: portfolio_name,
        portfolio_value: portfolio_value,
    });

    console.log("raw", raw);

    const requestOptions = {
        method: "POST",
        body: raw,
        headers: {
            "Content-Type": "application/json", 
        },
        redirect: "follow",
    };

    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_PORTFOLIO_RISK_CONTRIBUTION_API,
            requestOptions
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            return { success: false, error: errorData.error || "An error occurred" };
        }

        const data = await response.json();
        if (data.result !== "") {
            return { success: true, data }; // Standardizing the return value
        } else {
            console.log(data.error);
            return { success: false, error: data.error || "No result found" };
        }
    } catch (error) {
        if (error.name === "AbortError") {
            alert("The request timed out. Please try again.");
            window.location.reload();
        } else {
            console.error("Fetch error:", error);
            return { success: false, error: error.message || "An unexpected error occurred" };
        }
    }
}
