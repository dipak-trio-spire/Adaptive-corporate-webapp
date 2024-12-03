export async function AddRequestDemo(name, firm_name, email_id = "", phone_number = "",source_page) {
 var raw = ""
  if(email_id === ""){
    raw = JSON.stringify({
      name: name,
      company_name: firm_name,
      phone_number: phone_number,
      source_page: source_page
    });
  }else{
    raw = JSON.stringify({
      name: name,
      company_name: firm_name,
      email_id:email_id,
      phone_number: phone_number,
      source_page: source_page,
      demo_flag: true
    });
  }

  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow"
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_ADD_REQUEST_DEMO,
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
