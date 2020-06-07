import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { cardHeight } from '../style';

const removeMapControllers = (el: HTMLDocument) => {
  const elementList = el.querySelectorAll(
    '.leaflet-control-container, .gmnoprint, .gm-fullscreen-control, .gm-iv-address, .gm-style-cc',
  );
  Array.from(elementList).forEach((el) => el.remove());
};
const widgetToImage = (fileName: string, widgetElement: HTMLElement) => {
  const containMap = widgetElement.querySelector('canvas, .leaflet-container');
  console.log(`Download image using ${containMap ? 'Html2Canvas' : 'DomToImage'}`);
  if (containMap) {
    usingHtml2Canvas(fileName, widgetElement);
  } else {
    usingDomToImage(fileName, widgetElement);
  }
};
// Uses canvas. OK for maps, buggy for other elements
// https://github.com/niklasvh/html2canvas
const usingHtml2Canvas = (fileName: string, widgetElement: HTMLElement) => {
  html2canvas(widgetElement, {
    useCORS: true, // to allow loading maps
    imageTimeout: 3000,
    onclone: (el) => removeMapControllers(el),
  })
    .then(function (canvas) {
      console.log(canvas);
      return canvas.toDataURL('image/png', 1.0);
    })
    .then(function (blob) {
      saveAs(blob, `${fileName}.png`);
    });
};
// Uses canvas. OK for Html/SVG, buggy for maps
// https://github.com/tsayen/dom-to-image
const usingDomToImage = (fileName: string, widgetElement: HTMLElement) => {
  const filter = (widgetElement: any) => {
    return widgetElement.tagName !== 'BUTTON';
  };
  domtoimage.toBlob(widgetElement, { height: cardHeight, filter: filter }).then(function (blob: any) {
    window.saveAs(blob, `${fileName}.png`);
  });
};

export default widgetToImage;
