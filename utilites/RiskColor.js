export function GetRiskColor(message_status) {
    if (message_status === "Lower") {
        return { color: "#38BB55" };
    } else if (message_status === "Moderate") {
        return { color: "#FFA654" };
    } else if (message_status === "Higher") {
        return { color: "#ED6663" };
    } else if (message_status === "Much Higher") {
        return { color: "#AD0000" };
    }
}

export function GetRiskHeaderColor(risk_value) {
    if (risk_value < 15) {
        return { status_text:"LOW", 
        status_description_up:"The market is currently anticipating relatively small moves down or up.",
        status_description_down:"Downside protection costs are cheaper than historical averages.",
        status_color: { color: "#38BB55" }, color_hash: "#38BB55"};
    } else if (risk_value < 20 && risk_value >= 15) {
        return { status_text:"MEDIUM", 
        status_description_up:"The market is anticipating average moves down or up.",
        status_description_down:"Downside protection costs are in line with historical averages.",
        status_color: {color: "#FFA654" }, color_hash: "#FFA654"};
    } else if (risk_value < 30 && risk_value >= 20) {
        return { status_text:"HIGH", 
        status_description_up:"The market is anticipating larger than usual moves down or up.",
        status_description_down:"Downside protection costs are more expensive than historical averages.",
        status_color : { color: "#ED6663" }, color_hash: "#ED6663"};
    } else if (risk_value >= 30) {
        return { status_text:"VERY HIGH", 
        status_description_up:"The market is anticipating much larger than usual moves down or up.",
        status_description_down:"Downside protection costs are much more expensive than historical averages.",
        status_color: { color: "#AD0000" }, color_hash: "#AD0000"};
    }
}