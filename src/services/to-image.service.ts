import React from 'react'
import { saveAs } from 'file-saver'
// import domtoimage from 'dom-to-image'
import html2canvas from 'html2canvas';
// const widgetToJpeg = (widget: React.RefObject<HTMLDivElement>) => {
//     if (widget.current) {
//         domtoimage.toSvg(widget.current, { quality: 1 })
//         .then(function(blob) {
//           console.log( blob );
//           saveAs(blob, 'my-chart.svg');
//         })
//     }
// };

const widgetToJpeg = ( widget: React.RefObject<HTMLDivElement> ) => {

  if (widget.current) {
    html2canvas(widget.current, {
      useCORS: true,
      imageTimeout: 3000,
      ignoreElements: (AnyWayButtton) => false,
    })
      .then(function (canvas) {
        console.log(canvas);
        return canvas.toDataURL('image/png', 1.0);
      })
      .then(function (blob) {
        saveAs(blob, 'my-chart.png');
      });
  }
};

export default widgetToJpeg;
