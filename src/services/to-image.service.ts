import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import { cardHeight, cardWidth } from '../style';

const SCALE = 2;

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

// Uses canvas. OK for Html/SVG, buggy for maps
// https://github.com/tsayen/dom-to-image
const usingDomToImage = (fileName: string, widgetElement: HTMLElement) => {
  const filter = (widgetElement: any) => {
    return widgetElement.tagName !== 'BUTTON';
  };
  const style = {
    transform: `scale(${SCALE})`,
    transformOrigin: '100% 0%',
    borderRadius: '4px',
  };
  domtoimage
    .toBlob(widgetElement, {
      height: cardHeight * SCALE,
      width: cardWidth * SCALE,
      filter: filter,
      style,
    })
    .then(function (blob: any) {
      window.saveAs(blob, `${fileName}.png`);
    });
};

export default widgetToImage;
