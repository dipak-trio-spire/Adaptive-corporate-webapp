import React from "react";
import VIXMultilineChart from "./views/MultilineChart/VIXMultilineChart";
import "@/styles/VIXGraph.module.css";
import { newLocalDate } from "@/utilites/ConvertDate";

export default function VIXGraph(props) {
  var array1 = [];
  var array2 = [];
  
  var arrayOfObject = [];
  if (props.vix_data === undefined) {
    array1 = [];
    array2 = [];
    arrayOfObject = [];
  } else if (props.vix_data !== undefined) {
    array1 = props.vix_data.tradedate;
    array2 = props.vix_data.closeprice;
  }

  arrayOfObject = array1.map(function (value, index) {
    return {
      date: value,
      vix: array2[index],
      vix_label: array2[index],
    };
  });

  const vix = {
    name: "VIX",
    color: "#60034C",
    items: arrayOfObject.map((d) => ({
      value: d.vix,
      date: newLocalDate(d.date),
      label: d.vix_label,
    })),
    lowerbound : props.lowerbound
  };

  const chartData = [vix];

  return (
    <div className="App">
      {props.data.length === 0 ? (
        <div></div>
      ) : (
        <div>
          <VIXMultilineChart data={chartData}/>
        </div>
      )}
    </div>
  );
}

VIXGraph.defaultProps = {
  data: {
    tradedate: [],
    vix: [],
  },
};
