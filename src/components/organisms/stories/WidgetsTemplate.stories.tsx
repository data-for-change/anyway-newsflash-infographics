import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import WidgetsTemplate from '../WidgetsTemplate';

const PREFIX = 'WidgetsTemplate';

const classes = {
  mainBox: `${PREFIX}-mainBox`,
  widgetBox: `${PREFIX}-widgetBox`,
};

export default {
  title: 'Components/organisms/WidgetsTemplate',
};

const App: React.FC = () => {
  return (
    <Box display="flex" flexGrow={1} className={classes.mainBox}>
      <Box flexGrow={5} className={classes.widgetBox} position="relative">
        <WidgetsTemplate />
      </Box>
    </Box>
  );
};

const StyledApp = styled(App)({
  [`& .${classes.mainBox}`]: {
    height: 'inherit',
  },

  [`& .${classes.widgetBox}`]: {
    height: 'inherit',
    overflow: 'auto',
  },
});

export const common = () => <StyledApp />;
