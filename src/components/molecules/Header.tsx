import React, {FunctionComponent} from "react";
import {AnywayAppBar} from "../atoms/AnywayAppBar";
import {AnywayLogo} from "../atoms/AnywayLogo";
import {SignInIcon} from "../atoms/SignInIcon";

export const Header: FunctionComponent = () => {
  
  return (
    <AnywayAppBar>
      <AnywayLogo height={"30px"}/>
      <SignInIcon/>
    </AnywayAppBar>
  );
};
