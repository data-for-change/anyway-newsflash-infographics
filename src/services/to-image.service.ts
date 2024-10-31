import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';

const DEFAULT_SCALE = 3;

const removeMapControllers = (el: Document) => {
  const elementList = el.querySelectorAll(
    '.leaflet-control-container, .gmnoprint, .gm-fullscreen-control, .gm-iv-address, .gm-style-cc',
  );
  Array.from(elementList).forEach((el) => el.remove());
};

export const widgetToImageH2I = (fileName: string, widgetElement: HTMLElement) => {
  usingHtml2Image(fileName, widgetElement);
};

// https://github.com/bubkoo/html-to-image
const usingHtml2Image = (fileName: string, widgetElement: HTMLElement, scale = DEFAULT_SCALE) => {
  const canvasWidth = widgetElement.offsetWidth * scale;
  const canvasHeight = widgetElement.offsetHeight * scale;

  htmlToImage.toPng(widgetElement, {
    canvasWidth,
    canvasHeight,
  })
  .then(function (blob: any) {
    saveAs(blob, `${fileName}.png`);
  });
};

export const widgetToImageH2C = (fileName: string, widgetElement: HTMLElement, scale = DEFAULT_SCALE) => {
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
