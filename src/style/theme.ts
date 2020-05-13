import { ThemeOptions } from '@material-ui/core';

const defaultThemeOptions: ThemeOptions = {
  palette: {},
  typography: {
    fontFamily: [
      'Alef',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    body1: {
      fontSize: 14,
      fontWeight: 700,
    },
  },
};

export { defaultThemeOptions };
