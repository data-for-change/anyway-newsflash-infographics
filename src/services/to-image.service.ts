import React from 'react';
import { saveAs } from 'file-saver';
import domtoimage from 'dom-to-image';

const widgetToJpeg = (widget: React.RefObject<HTMLDivElement>) => {
  if (widget.current) {
    domtoimage.toSvg(widget.current, { quality: 1 }).then(function (blob) {
      saveAs(blob, 'my-node.svg');
    });
  }
};

export default widgetToJpeg;
