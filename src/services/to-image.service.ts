import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

const DEFAULT_SCALE = 1;

const removeMapControllers = (el: HTMLDocument) => {
  const elementList = el.querySelectorAll(
    '.leaflet-control-container, .gmnoprint, .gm-fullscreen-control, .gm-iv-address, .gm-style-cc',
  );
  Array.from(elementList).forEach((el) => el.remove());
};
const widgetToImage = (fileName: string, widgetElement: HTMLElement, scale = DEFAULT_SCALE) => {
  const containMap = widgetElement.querySelector('canvas, .leaflet-container');
  console.log(`Download image using ${containMap ? 'Html2Canvas' : 'DomToImage'}`);
  if (containMap) {
    usingHtml2Canvas(fileName, widgetElement, scale);
  } else {
    usingDomToImage(fileName, widgetElement, scale);
  }
};
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
    .then(function (blob) {
      saveAs(blob, `${fileName}.png`);
    });
};
// Uses SVG foreignObject. OK for Html/SVG, buggy for maps
// https://github.com/tsayen/dom-to-image#how-it-works
const usingDomToImage = (fileName: string, widgetElement: HTMLElement, scale: number) => {
  const filter = (widgetElement: any) => {
    return widgetElement.tagName !== 'BUTTON';
  };
  const style = {
    transform: `scale(${scale})`,
    transformOrigin: '100% 0%',
  };
  domtoimage
    .toBlob(widgetElement, {
      filter: filter,
      style,
    })
    .then(function (blob: any) {
      window.saveAs(blob, `${fileName}.png`);
    });
};

export default widgetToImage;
