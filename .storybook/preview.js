import React, { Suspense } from 'react';
import { Box, createStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import OverlayLoader from '../src/components/molecules/OverlayLoader';
import { defaultThemeOptions } from '../src/style/theme';

const customTheme = createMuiTheme(defaultThemeOptions);
const useStyles = makeStyles(() =>
  createStyles({
    rtl: {
      direction: 'rtl',
    },
  }),
);

function StoryApp(Story) {
  const classes = useStyles();

  return (
    <Suspense fallback={<OverlayLoader show />}>
      <ThemeProvider theme={customTheme}>
        <Box className={classes.rtl}>
          <Story />
        </Box>
      </ThemeProvider>
    </Suspense>
  );
}
export const decorators = [StoryApp];
