import { saveAs } from 'file-saver'
import domtoimage from 'dom-to-image'

const widgetToJpeg = (node: any) => {
    if (node.current) {
        domtoimage.toSvg(node.current, { quality: 1 }).then(function(blob) {
            saveAs(blob, 'my-node.svg')
        })
    }
};

export default widgetToJpeg
