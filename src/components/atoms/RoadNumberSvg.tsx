//preparation of svg template - temporary
const RoadNumberSvgImage = (roadNumber: number) => {
  return `
		<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   id="svg6542"
   version="1.1"
   viewBox="0 0 181.76876 132.55625"
   height="501"
   width="687">
  <defs
     id="defs6536" />
  <metadata
     id="metadata6539">
    <rdf:RDF>
      <cc:Work
         rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
        <dc:title></dc:title>
      </cc:Work>
    </rdf:RDF>
  </metadata>

  <g
     transform="translate(-26.506611,-24.923271)"
     id="layer1">
    <rect
       ry="23.8125"
       rx="23.8125"
       y="25.055563"
       x="26.638903"
       height="132.29167"
       width="181.50415"
       id="rect7087"
       style="opacity:1;fill:#ffffff;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:0.26458335;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <path
       id="rect7162"
       transform="matrix(0.26458334,0,0,0.26458334,26.638903,25.055563)"
       d="M 90,30 C 56.760001,30 30,56.760001 30,90 v 320 c 0,33.24 26.760001,60 60,60 h 506 c 33.24,0 60,-26.76 60,-60 V 90 C 656,56.760001 629.24,30 596,30 Z M 343,67 588,97 618,250 588,403 343,433 96,403 68,250 96,97 Z"
       style="opacity:1;fill:#ff0000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.5;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
    <g
       id="text7197"
       style="font-style:normal;font-variant:normal;font-weight:bold;font-stretch:normal;font-size:76.02970123px;line-height:125%;font-family:Helvetica;-inkscape-font-specification:'Helvetica Bold';text-align:center;letter-spacing:0px;word-spacing:0px;writing-mode:lr-tb;text-anchor:middle;fill:#ff0000;fill-opacity:1;stroke:none;stroke-width:0.26458335px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
       aria-label="90">
    </g>
  </g>
  <text x="50%" y ="50%" dominant-baseline="middle" text-anchor="middle" font-family="Verdana" font-size="300%" fill="red">${roadNumber}</text>
</svg>
	`;
};
export default RoadNumberSvgImage;
