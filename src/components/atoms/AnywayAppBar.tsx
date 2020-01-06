import React, { FunctionComponent, useMemo, CSSProperties } from "react";
import AppBar, { AppBarProps } from "@material-ui/core/AppBar";

interface AnywayAppBarProps {
  style: CSSProperties;
}

export const AnywayAppBar: FunctionComponent<AnywayAppBarProps> = ({
  children,
  style
}) => {
  const appBarProps = useMemo<AppBarProps>(
    () => ({
      position: "static",
      style
    }),
    [style]
  );

  return <AppBar {...appBarProps}>{children}</AppBar>;
};
