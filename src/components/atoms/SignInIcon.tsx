import React, { useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

export const SignInIcon = () => {
  const divStyle = useMemo(
    () => ({
      marginRight: "1vw"
    }),
    []
  );

  const iconStyle = useMemo(
    () => ({
      color: "#555"
    }),
    []
  );

  return (
    <div style={divStyle}>
      <FontAwesomeIcon icon={faSignInAlt} style={iconStyle} />
    </div>
  );
};
