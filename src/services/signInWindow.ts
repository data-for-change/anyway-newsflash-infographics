import {loginPopUpDim} from "../utils/utils";

let windowObjectReference :Window | null =null;
let previousUrl :string;

const receiveMessage = () => {
//change window in order to re-rednder -todo try to find better way to do it
    window.location.assign(`/?updateUser=true`);
};
  export const openSignInWindow :Function = (url :string, name :string) => {
  // remove any existing event listeners
  window.removeEventListener('message', receiveMessage);

  const left = (window.screen.width - loginPopUpDim.width) / 2;
  const top = (window.screen.height - loginPopUpDim.height) / 4;
  const strWindowFeatures =
    `toolbar=no, menubar=no, width=+${loginPopUpDim.width}, height=+${loginPopUpDim.height}, top= +${top}, left=+${left}`;

  if (windowObjectReference === null || windowObjectReference.closed) {
    /* if the pointer to the window object in memory does not exist
     or if such pointer exists but the window was closed */
    windowObjectReference = window.open(url, name, strWindowFeatures);
  } else if (previousUrl !== url) {
    /* if the resource to load is different,
     then we load it in the already opened secondary window and then
     we bring such window back on top/in front of its parent window. */
    windowObjectReference = window.open(url, name, strWindowFeatures);
    windowObjectReference!.focus();
  } else {
    /* else the window reference must exist and the window
     is not closed; therefore, we can bring it back on top of any other
     window with the focus() method. There would be no need to re-create
     the window or to reload the referenced resource. */
    windowObjectReference.focus();
  }

  // add the listener for receiving a message from the popup
  window.addEventListener('message', event => receiveMessage(), false);
  // assign the previous URL
  previousUrl = url;
};
