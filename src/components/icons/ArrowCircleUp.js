import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
function SvgArrowCircleUp(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={192}
      height={192}
      viewBox="0 0 256 256"
      {...props}>
      <Path fill="none" d="M0 0h256v256H0z" />
      <Circle
        cx={128}
        cy={128}
        r={96}
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={16}
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M94.1 121.9L128 88l33.9 33.9M128 168V88"
      />
    </Svg>
  );
}
export default SvgArrowCircleUp;
