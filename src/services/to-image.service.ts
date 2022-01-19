import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const DEFAULT_SCALE = 1;

const removeMapControllers = (el: Document) => {
  const elementList = el.querySelectorAll(
    '.leaflet-control-container, .gmnoprint, .gm-fullscreen-control, .gm-iv-address, .gm-style-cc',
  );
  Array.from(elementList).forEach((el) => el.remove());
};

const widgetToImage = (fileName: string, widgetElement: HTMLElement, scale = DEFAULT_SCALE) => {
  usingHtml2Canvas(fileName, widgetElement, scale);
};

// https://github.com/niklasvh/html2canvas 
// upgrade versions carefully
const usingHtml2Canvas = (fileName: string, widgetElement: HTMLElement, scale: number) => {

  html2canvas(widgetElement, {
    useCORS: true, // to allow loading maps
    imageTimeout: 3000,
    scale,
    onclone: (el) => removeMapControllers(el),
  })
    .then(function (canvas) {
      return canvas.toDataURL('image/png', 1.0);
    })
    .then(function (blob: any) {
      saveAs(blob, `${fileName}.png`);
    });
};

export default widgetToImage;