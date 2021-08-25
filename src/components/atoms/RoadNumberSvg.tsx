import React, { FC } from 'react';
import { roadIconFont } from 'style';

const WIDTH = '56px';
const HEIGHT = '40px';

interface IProps {
  roadNumber: number;
  iconStyle: { color: string; size: number };
}

const RoadNumberSvgImage: FC<IProps> = ({ roadNumber, iconStyle }) => {
  const { color, size } = iconStyle;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 181.76876 132.55625"
      height={HEIGHT}
      width={WIDTH}
    >
      <metadata xmlns="http://www.w3.org/2000/svg"></metadata>
      <rect
        style={{
          opacity: 1,
          fill: '#ffffff',
          fillOpacity: 1,
          fillRule: 'nonzero',
          stroke: '#000000',
          strokeWidth: 0.26458335,
          strokeLinejoin: 'miter',
          strokeMiterlimit: 4,
          strokeDasharray: 'none',
          strokeOpacity: 1,
        }}
        id="rect7087"
        width="181.50415"
        height="132.29167"
        x="0.13229166"
        y="0.13229197"
        rx="23.8125"
        ry="23.8125"
      />
      <path
        style={{ fill: color }}
        d="m 23.944793,8.0697922 c -8.79475,0 -15.8750008,7.0802508 -15.8750008,15.8750008 v 84.666667 c 0,8.79475 7.0802508,15.875 15.8750008,15.875 H 157.82396 c 8.79475,0 15.875,-7.08025 15.875,-15.875 V 23.944793 c 0,-8.79475 -7.08025,-15.8750008 -15.875,-15.8750008 z m 66.939585,9.7895838 64.822922,7.9375 7.9375,40.481251 -7.9375,40.481253 -64.822922,7.9375 -65.352085,-7.9375 -7.408334,-40.481253 7.408334,-40.481251 z"
      />
      <g>
        <text
          x="50%"
          y="56%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontFamily={roadIconFont}
          fontSize={size}
          fontWeight="800"
          fill={color}
        >
          {roadNumber}
        </text>
      </g>
    </svg>
  );
};
export default RoadNumberSvgImage;
