import React, { FC } from 'react';
import { roadIconFont } from '../../style';

const WIDTH = '56px';
const HEIGHT = '40px';

interface IProps {
  roadNumber: number;
  roadColor: string;
}
//need to emprove scg icon(background color)
const RoadNumberSvgImage: FC<IProps> = ({ roadNumber, roadColor }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width={WIDTH}
      height={HEIGHT}
      viewBox="0 0 640.000000 467.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <metadata xmlns="http://www.w3.org/2000/svg">
        Created by potrace 1.16, written by Peter Selinger 2001-2019
      </metadata>
      <g transform="translate(0.000000,467.000000) scale(0.100000,-0.100000)" stroke="none">
        <path d="M635 4649 c-297 -72 -544 -321 -615 -619 -19 -83 -20 -115 -20 -1695 0 -1568 1 -1612 20 -1692 73 -307 315 -550 620 -623 84 -20 106 -20 2560 -20 2454 0 2476 0 2560 20 305 73 547 316 620 623 19 80 20 124 20 1692 0 1568 -1 1612 -20 1692 -73 307 -315 550 -620 623 -84 20 -105 20 -2565 19 -2423 0 -2482 -1 -2560 -20z m5145 -17 c100 -31 232 -101 307 -162 125 -103 228 -262 275 -426 l23 -79 0 -1630 0 -1630 -23 -79 c-83 -287 -301 -505 -588 -588 l-79 -23 -2495 0 -2495 0 -79 23 c-287 83 -505 301 -588 588 l-23 79 0 1630 0 1630 23 78 c41 144 115 270 217 372 124 124 281 206 453 235 26 4 1161 7 2522 6 l2475 -1 75 -23z" />
        <path
          d="M696 4365 c-187 -52 -341 -207 -391 -395 -22 -83 -22 -3187 0 -3270 23 -89 75 -179 140 -245 70 -71 143 -115 239 -144 l68 -21 2447 0 c2114 0 2453 2 2501 15 189 50 345 206 395 395 13 47 15 281 15 1635 0 1354 -2 1588 -15 1635 -50 189 -206 345 -395 395 -79 21 -4927 21 -5004 0z m2812 -360 c733 -90 1040 -128 1472 -180 256 -31 474 -60 485 -64 18 -8 36 -86 159 -717 l139 -708 -139 -709 c-123 -632 -141 -710 -159 -718 -11 -4 -229 -33 -485 -64 -256 -31 -663 -80 -905 -110 -242 -30 -539 -66 -660 -81 l-220 -26 -875 107 c-1373 167 -1411 172 -1419 181 -4 5 -65 326 -136 714 l-128 705 128 705 c71 388 134 710 140 715 7 6 196 32 421 59 225 28 726 89 1114 137 388 47 722 87 743 88 21 0 167 -15 325 -34z"
          fill={roadColor}
        />
      </g>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily={roadIconFont}
        fontSize="250"
        fill={roadColor}
      >
        {roadNumber}
      </text>
    </svg>
  );
};
export default RoadNumberSvgImage;
