import * as React from 'react';
import { Box } from '@mui/material';
import makeStyles from '@mui/material/styles/makeStyles';
import WidgetsTemplate from '../WidgetsTemplate';

export default {
  title: 'Components/organisms/WidgetsTemplate',
};

const useStyles = makeStyles({
  mainBox: {
    height: 'inherit',
  },

  widgetBox: {
    height: 'inherit',
    overflow: 'auto',
  },
});

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <WidgetsTemplate />
      </Box>
    </Box>
  );
};

export const common = () => <App />;
