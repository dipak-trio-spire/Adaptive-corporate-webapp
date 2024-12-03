import React from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

const Area = ({ xScale, yScale, color, color2, data, disableAnimation, lowerBound, opacity, color_intensity, ...props }) => {
  
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (disableAnimation) {
      d3.select(ref.current).attr("opacity", 0.5);
      return;
    }
    d3.select(ref.current)
      .transition()
      .duration(750)
      .ease(d3.easeBackIn)
      .attr("opacity", 0.5);
  }, [disableAnimation]);

  const d = React.useMemo(() => {
    const area = d3
      .area()
      .x(({ date }) => xScale(date))
      .y1(({ value }) => yScale(value))
      .y0(({}) => yScale(lowerBound));

    return area(data);
  }, [xScale, yScale, data]);

  return (
    <>
      <path
        ref={ref}
        d={d}
        fill={`url(#gradient-${color})`}
        opacity={0.5}
        {...props}
      />
      <defs>
        <linearGradient
          id={`gradient-${color}`}
          x1="20%"
          x2="0%"
          y1="20%"
          y2="100%"
        >
          <stop offset="10%" stopColor={color} />
          <stop offset="90%" stopColor={color2} />
        </linearGradient>
      </defs>
    </>
  );
};

Area.propTypes = {
  xScale: PropTypes.func.isRequired,
  yScale: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.date,
      value: PropTypes.number
    })
  ),
  color: PropTypes.string,
  disableAnimation: PropTypes.bool
};

Area.defaultProps = {
  data: [],
  color: "white",
  disableAnimation: false
};

export default Area;
