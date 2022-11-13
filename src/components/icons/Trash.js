import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
function SvgTrash(props) {
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
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={16}
        d="M216 56H40M104 104v64M152 104v64M200 56v152a8 8 0 01-8 8H64a8 8 0 01-8-8V56M168 56V40a16 16 0 00-16-16h-48a16 16 0 00-16 16v16"
      />
    </Svg>
  );
}
export default SvgTrash;
