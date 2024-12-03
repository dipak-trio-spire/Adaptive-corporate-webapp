export async function AddLeads(
  EmailId, page, UserType = "", DailyUpdates = false, 
  StatusUpdates = false, first_name = "", 
  last_name = "", phone_number = "",
  interested_in="",
  description=""
  ) {

  var raw = JSON.stringify({
    email_id: EmailId,
    source_page: page,
    user_type: UserType,
    daily_updates: DailyUpdates,
    status_updates: StatusUpdates,
    first_name: first_name,
    last_name: last_name,
    phone_number: phone_number,
    interested_in: interested_in,
    // description: description
    
  });
  console.log(raw);

  var addLeads = {
    method: "POST",
    body: raw,
    redirect: "follow"
  };

  const apiGatewayUrl = process.env.NEXT_PUBLIC_ADD_LEAD

  console.log("url111", apiGatewayUrl);
  const response = await fetch(
    /*process.env.REACT_APP_PORTFOLIO_API,*/
    /*'https://62ayc3l0fc.execute-api.us-east-1.amazonaws.com/Stage/corporate-lead',*/
    process.env.NEXT_PUBLIC_ADD_LEAD,
    addLeads
  );
  console.log("url", process.env.NEXT_PUBLIC_ADD_LEAD);
  if (!response.ok) {
    alert("Could not add your email");
  } else {
    const message = await response.json();
    if (message["result"] !== "") {
      console.log(message["result"]);
      return message["result"];
    } else {
      console.log(message["error"]);
      alert("Could not add this email");
      return "";
    }
  }
}
