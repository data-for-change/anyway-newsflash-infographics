import React, { useEffect } from 'react';
// note - params may be added to future use
const PopUpRedirect: React.FC = () => {
  useEffect(() => {
    // get the URL parameters which will include the auth token
    const params = window.location.search;
    if (window.opener) {
      // send them to the opening window
      window.opener.postMessage(params, window.location.origin);
      // close the popup
      window.close();
    }
  });
  // some text to show the user
  return <p>Please wait...</p>;
};

export default PopUpRedirect;
