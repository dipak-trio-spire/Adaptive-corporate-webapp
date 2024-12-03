import React from "react";
import PropTypes from "prop-types";

const Overlay = React.forwardRef(({ width, height, children }, ref) => (
  <g>
    {children}
    <rect ref={ref} width={width} height={height} opacity={0} />
  </g>
));

Overlay.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
Overlay.displayName = "Overlay"

export default Overlay;
