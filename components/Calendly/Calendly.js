import { PopupButton } from "react-calendly";

export default function Calendly() {
  return (
    <PopupButton className="calendy"
        url="https://calendly.com/adaptiveinvestments/adaptive-investment-solutions-demo" 
        rootElement={document.getElementById("__next")}
        text="Calendy"
        img=""
    />
  );
}
