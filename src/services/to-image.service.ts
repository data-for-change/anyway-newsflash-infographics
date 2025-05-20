import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
import html2canvas from 'html2canvas';

const DEFAULT_SCALE = 4;
const CANVAS_SIZE = 3000;

const removeMapControllers = (el: Document) => {
  const elementList = el.querySelectorAll(
    '.leaflet-control-container, .gmnoprint, .gm-fullscreen-control, .gm-iv-address, .gm-style-cc',
  );
  Array.from(elementList).forEach((el) => el.remove());
};

const resizeCanvas = (originalCanvas: HTMLCanvasElement, targetWidth: number, targetHeight: number): HTMLCanvasElement => {
  const resizedCanvas = document.createElement('canvas');
  resizedCanvas.width = targetWidth;
  resizedCanvas.height = targetHeight;
  const ctx = resizedCanvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(originalCanvas, 0, 0, targetWidth, targetHeight);
  }
  return resizedCanvas;
};

export const widgetToImageH2I = (fileName: string, widgetElement: HTMLElement) => {
  usingHtml2Image(fileName, widgetElement);
};

// https://github.com/bubkoo/html-to-image
const usingHtml2Image = (fileName: string, widgetElement: HTMLElement) => {
  const canvasWidth = CANVAS_SIZE;
  const canvasHeight = CANVAS_SIZE;

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
      const resizedCanvas = resizeCanvas(canvas, CANVAS_SIZE, CANVAS_SIZE);
      return resizedCanvas.toDataURL('image/png', 1.0);
    })
    .then(function (blob: any) {
      saveAs(blob, `${fileName}.png`);
    });
};
