import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const Unmute = (props: SvgProps) => (
  <Svg
    width={props.width || 20} // Default width if not passed
    height={props.height || 20} // Default height if not passed
    viewBox="0 0 16 16" // Ensures correct scaling
    {...props} // Spread additional props
  >
    <Path
      fillRule="evenodd"
      d="M1.5 4.83h2.79L8.15 1l.85.35v13l-.85.33-3.86-3.85H1.5l-.5-.5v-5l.5-.5zM4.85 10 8 13.14V2.56L4.85 5.68l-.35.15H2v4h2.5l.35.17zM15 7.83a6.97 6.97 0 0 1-1.578 4.428l-.712-.71A5.975 5.975 0 0 0 14 7.83c0-1.4-.48-2.689-1.284-3.71l.712-.71A6.971 6.971 0 0 1 15 7.83zm-2 0a4.978 4.978 0 0 1-1.002 3.004l-.716-.716A3.982 3.982 0 0 0 12 7.83a3.98 3.98 0 0 0-.713-2.28l.716-.716c.626.835.997 1.872.997 2.996zm-2 0c0 .574-.16 1.11-.44 1.566l-.739-.738a1.993 1.993 0 0 0 .005-1.647l.739-.739c.276.454.435.988.435 1.558z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Unmute;
