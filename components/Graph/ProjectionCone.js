import React from "react";
import MultilineChart from "./views/MultilineChart/ProjectionMultilineChart";
import Legend from "./components/Legend";
import "../../styles/ProjectionCone.module.css";

function ProjectionCone(props) {
  var array1 = [];
  var array2 = [];
  var array3 = [];
  var array4 = [];
  var array5 = [];

  const defaults = {
    data: {
      dates: [],
      upper_bound: [],
      lower_bound: [],
      portfolio_value: [],
      protection_value: [],
    },
  };
  var arrayOfObject = [];
  arrayOfObject = [];
  if (Object.keys(props.data).length === 0 || props.data.dates.length === 0) {
    array1 = [];
    array2 = [];
    array3 = [];
    array4 = [];
    array5 = [];
    arrayOfObject = [];
  } else {
    array1 = props.data.dates;
    array2 = props.data.upper_bound;
    array3 = props.data.lower_bound;
    array4 = props.portfolioValue;
    array5 = props.protectedValue;
  }

  arrayOfObject = array1.map(function (value, index) {
    return {
      date: value,
      upper_bound: array2[index],
      lower_bound: array3[index],
      portfolio_value: array4[index],
      protection_value: array5[index],
    };
  });

  const upper_bound_data = {
    name: "Upper Projection",
    color: "#ADE8BE",
    items: arrayOfObject.map((d) => ({
      value: d.upper_bound,
      date: new Date(d.date),
      label: d.upper_bound
    })),
  };

  const lower_bound_data = {
    name: "Lower Projection",
    color: "#D1D1D1",
    items: arrayOfObject.map((d) => ({
      value: d.lower_bound,
      date: new Date(d.date),
      label: d.lower_bound
    })),
  };

  const portfolio_value = {
    name: "Current Value",
    color: "#60034c",
    items: arrayOfObject.map((d) => ({
      value: d.portfolio_value,
      date: new Date(d.date),
      label: d.portfolio_value
    })),
  };
  const protection_value = {
    name: "Protected Value",
    color: "#d53e4f",
    items: arrayOfObject.map((d) => ({
      value: d.protection_value,
      date: new Date(d.date),
      label: d.protection_value
    })),
  };

  const chartData = [
    upper_bound_data,    
    lower_bound_data,
    portfolio_value,
    protection_value,    
  ];
  
  function getArrayMax(array) {
    return Math.max.apply(null, array);
  }
  function getArrayMin(array) {
    return Math.min.apply(null, array);
  }
  const legendData = [upper_bound_data, lower_bound_data];
  return (
    <div className="ProjectionApp">
      {Object.keys(props.data).length === 0 || props.data.dates.length === 0 ? (
        <div></div>
      ) : (
        <div>
          <div className="port_val"><span>Portfolio Value</span></div>
          <div className="port_date"><span>Projected Dates</span></div>
          {/* <div className="porfoliovaluesline"></div> */}
          <div className="porfoliovalues">
            {/* <div className="max_val">PORTFOLIO VALUE</div> */}
            <div className="max_val">
              ${getArrayMax(array2).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
            <div className="start_val">
              Starting Value
            </div>
            <div className="min_val">
              ${getArrayMin(array3).toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
            </div>
          </div>
          <div className="chartimg">
            <MultilineChart data={chartData} is_backtest={false} />
          </div>
        </div>
      )}
    </div>
  );
}

ProjectionCone.defaultProps = {
  data: {
    dates: [],
    lower_bound: [],
    upper_bound: [],
    // portfolio_value: [],
    // protection_value: []
  },
};

export default ProjectionCone;
