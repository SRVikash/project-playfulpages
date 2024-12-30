import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Mute = (props: SvgProps) => (
  <Svg
    width={props.width || 20} // Default width if not passed
    height={props.height || 20} // Default height if not passed
    viewBox="0 0 48 48" // The viewBox defines the internal SVG canvas
    {...props} // Spread additional props
  >
    <Path fill="none" d="M0 0h48v48H0z" />
    <Path d="M8 42.828 18.448 32.38l11.647 9.32V20.733L42.828 8 40 5.172l-9.905 9.905V5.375L17.397 15.539h-7.303v16h3.538L5.172 40 8 42.828zm18.095-9.452-4.8-3.842 4.8-4.801v8.643zm-12-13.837h4.707l7.293-5.838v5.376l-8.462 8.462h-3.538v-8z" />
  </Svg>
);

export default Mute;
