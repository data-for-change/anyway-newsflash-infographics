import { toBlob } from 'html-to-image';
import { saveAs } from 'file-saver';

const DEFAULT_SCALE = 1;

const widgetToImage = (fileName: string, widgetElement: HTMLElement, scale = DEFAULT_SCALE) => {
  usingHtmlToImage(fileName, widgetElement, scale);
};

// Uses SVG foreignObject. Works with canvas and HTML/SVG
// https://github.com/bubkoo/html-to-image#how-it-works
const usingHtmlToImage = (fileName: string, widgetElement: HTMLElement, scale: number) => {
  const leafletControls = [
    'leaflet-control-container',
    'gmnoprint',
    'gm-fullscreen-control',
    'gm-iv-address',
    'gm-style-cc',
  ];

  const filter = (widgetElement: any) => {
    return widgetElement.tagName !== 'BUTTON' && !leafletControls.includes(widgetElement.className);
  };

  const style = {
    transform: `scale(${scale})`,
    transformOrigin: '100% 0%',
  };
  toBlob(widgetElement, {
    filter: filter,
    style,
  }).then(function (blob: any) {
    saveAs(blob, `${fileName}.png`);
  });
};

export default widgetToImage;
