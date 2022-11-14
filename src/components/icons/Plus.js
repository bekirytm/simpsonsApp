import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
function SvgPlus(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={192}
      height={192}
      viewBox="0 0 256 256"
      {...props}>
      <Path fill="none" d="M0 0h256v256H0z" />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M40 128h176M128 40v176"
      />
    </Svg>
  );
}
export default SvgPlus;
