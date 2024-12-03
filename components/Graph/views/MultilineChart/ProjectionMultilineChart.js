import React from "react";
import PropTypes from "prop-types";
import { MultiLineDataPropTypes } from "../../utils/propTypes";
import { Line, Axis, GridLine, Overlay, Tooltip, AreaProjectionCone } from "../../components";
import useController from "./MultilineChart.controller";
import useDimensions from "../../utils/useDimensions";

const MultilineChart = ({ data = [], margin = {} }) => {
  const overlayRef2 = React.useRef(null);
  const [containerRef, { svgWidth, svgHeight, width, height }] = useDimensions({
    maxHeight: 400,
    margin,
  });
  const controller = useController({ data, width, height });

  let upperBoundMax = Math.max(...data[0].items.map(item => item.value));
  let lowerBoundMin = Math.min(...data[1].items.map(item => item.value));

  const { yTickFormat, xScale, yScale, yScaleForAxis, xNewTickFormat } =
    controller;

  return (
    <div ref={containerRef}>
      <svg width={svgWidth} height={svgHeight}>
        <g transform={`translate(${margin.left},${margin.top})`}>
          <Line
            key="upper-bound-max-line"
            data={[{ date: xScale.domain()[0], value: upperBoundMax }, { date: xScale.domain()[1], value: upperBoundMax }]}
            xScale={xScale}
            yScale={yScale}
            color="black"
            lineWidth={1}
            strokeDasharray="3,3"
          />
          <Line
            key="lower-bound-min-line"
            data={[{ date: xScale.domain()[0], value: lowerBoundMin }, { date: xScale.domain()[1], value: lowerBoundMin }]}
            xScale={xScale}
            yScale={yScale}
            color="black"
            lineWidth={1}
            strokeDasharray="3,3"
          />
          <GridLine
            className="graphline"
            type="vertical"
            scale={xScale}
            ticks={5}
            size={height}
            transform={`translate(0, ${height})`}
          />
          <GridLine
            className="graphline"
            type="horizontal"
            scale={yScaleForAxis}
            ticks={2}
            size={width}
          />
          <GridLine
            type="horizontal"
            className="baseGridLine"
            scale={yScale}
            ticks={1}
            size={width}
            disableAnimation
          />
          {data.map(({ name, items = [], color }) => (
            <Line
              key={name}
              data={items}
              xScale={xScale}
              yScale={yScale}
              color={color}
              lineWidth={1}
              opacity_a={0}
            />
          ))}
          <AreaProjectionCone
            className="graphline1"
            data={data[0].items}
            xScale={xScale}
            yScale={yScale}
            lowerBound={data[0].items[0].value}
            color="#ADE8BE"
          />
          <AreaProjectionCone
            className="graphline2"
            data={data[1].items}
            xScale={xScale}
            yScale={yScale}
            lowerBound={data[0].items[0].value}
            color="#D1D1D1"
          />
          <AreaProjectionCone
            className="graphline3"
            data={data[2].items}
            xScale={xScale}
            yScale={yScale}
            lowerBound={data[3].items[0].value}
            color="#d53e4f"
            opacity={0.7}
          />
          <Overlay ref={overlayRef2} width={width} height={height}>
            <Axis
              type="bottom"
              className="axisX"
              anchorEl={overlayRef2.current}
              scale={xScale}
              transform={`translate(10, ${height - height / 6})`}
              ticks={5}
              tickFormat={xNewTickFormat}
            />
            <Tooltip
              className="tooltip"
              anchorEl={overlayRef2.current}
              width={width}
              height={height}
              margin={margin}
              xScale={xScale}
              yScale={yScale}
              data={data}
            />
          </Overlay>
        </g>
      </svg>
    </div>
  );
};

MultilineChart.propTypes = {
  data: MultiLineDataPropTypes,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number,
  }),
};

MultilineChart.defaultProps = {
  data: [],
  margin: {
    top: 30,
    right: 30,
    bottom: 30,
    left: 60,
  },
};

export default MultilineChart;
