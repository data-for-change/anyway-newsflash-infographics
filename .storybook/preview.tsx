import { Box } from '@mui/material';
import { ThemeProvider, StyledEngineProvider, createTheme, styled } from '@mui/material/styles';
import React, { Suspense } from 'react';
import OverlayLoader from '../src/components/molecules/OverlayLoader';
import { defaultThemeOptions } from '../src/style/theme';

const customTheme = createTheme(defaultThemeOptions);

const PREFIX = 'StoryApp';
const classes = {
  rtl: `${PREFIX}-rtl`,
};
const StyledBox = styled(Box)({
  [`&.${classes.rtl}`]: {
    direction: 'rtl',
  },
});

function StoryApp(Story) {
  return (
    <Suspense fallback={<OverlayLoader show />}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={customTheme}>
          <StyledBox className={classes.rtl}>
            <Story />
          </StyledBox>
        </ThemeProvider>
      </StyledEngineProvider>
    </Suspense>
  );
}
export const decorators = [StoryApp];
