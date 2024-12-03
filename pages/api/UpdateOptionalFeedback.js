export async function UpdateOptionalFeedback(email_id = "", phone_number = "", optional_feedback1 = "", optional_feedback2 = "") {
  var raw = ""
  if (email_id === "") {
    raw = JSON.stringify({
      optional_feedback1: optional_feedback1,
      optional_feedback2: optional_feedback2,
      phone_number: phone_number
    });
  } else {
    raw = JSON.stringify({
      email_id: email_id,
      optional_feedback1: optional_feedback1,
      optional_feedback2: optional_feedback2
    });
  }
  var requestOptions = {
    method: "POST",
    body: raw,
    redirect: "follow"
  };
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_UPDATE_OPTIONAL_FEEDBACK,
      requestOptions
    );
    if (!response.ok) {
      console.log("Could not add your feedback");
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
