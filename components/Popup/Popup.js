import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import "./Popup.css";

export default function Popup(props) {
  var alertType = props.alertType;

  const alertColor = {
    error: "error",
    warning: "warning",
    success: "success",
  };

  const colors = alertColor[alertType];
  return props.trigger ? (
    <div className="popup">
      <div className={alertType}>
        <div className="popup-object">
          <div className="heading">
            <span>{props.title}</span>
            <InfoOutlinedIcon className="icon" style={{ color: colors }} />
          </div>
          <div className="body-message">
            <p> {props.content}</p>
          </div>
          <button
            className="ai-btn primary solid"
            onClick={() => props.setTrigger(false)}
          >
            {" "}
            OK{" "}
          </button>
          {props.children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
