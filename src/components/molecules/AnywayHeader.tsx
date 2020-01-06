import React, { FunctionComponent, useMemo, CSSProperties } from "react";
import { AnywayAppBar } from "../atoms/AnywayAppBar";
import { AnywayLogo } from "../atoms/AnywayLogo";
import { SignInIcon } from "../atoms/SignInIcon";

export const AnywayHeader: FunctionComponent = () => {
  const appBarStyle = useMemo<CSSProperties>(
    () => ({
      backgroundColor: "#fafafa",
      height: "6vh",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingLeft: "2vw",
      paddingRight: "2vw"
    }),
    []
  );

  return (
    <AnywayAppBar style={appBarStyle}>
      <AnywayLogo height={"30px"} />
      <SignInIcon />
    </AnywayAppBar>
  );
};
