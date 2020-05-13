import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';


const widgetToJpeg = (fileName: string, widgetElement: HTMLElement) => {
  html2canvas(widgetElement, {
    imageTimeout: 3000,
    ignoreElements: (AnyWayButtton) => false,
  })
    .then(function (canvas) {
      console.log(canvas);
      return canvas.toDataURL('image/png', 1.0);
    })
    .then(function (blob) {
      saveAs(blob, `${fileName}.png`);
    });
};

export default widgetToJpeg;
