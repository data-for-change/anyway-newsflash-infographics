import React, { Suspense } from 'react';
import { Box, ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import OverlayLoader from '../src/components/molecules/OverlayLoader';
import { defaultThemeOptions } from '../src/style/theme';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

const customTheme = createTheme(defaultThemeOptions);
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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={customTheme}>
          <Box className={classes.rtl}>
            <Story />
          </Box>
        </ThemeProvider>
      </StyledEngineProvider>
    </Suspense>
  );
}
export const decorators = [StoryApp];
