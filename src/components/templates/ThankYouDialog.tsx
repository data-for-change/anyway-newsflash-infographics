import React, { FC, useState } from 'react';
import { Text, TextType, Dialog, AnywayAppBar } from '../atoms';
import { Box, makeStyles, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { highlightDarkColor, closeButtonColor, cardWidth } from '../../style';

interface IProps {}
const useStyles = makeStyles({
  dialog: {
    width: cardWidth,
  },
  bar: {
    height: '24px',
    display: 'flex',
    width: 'inherit',
    color: highlightDarkColor,
    padding: '16px 0',
    justifyContent: 'space-between',
  },
  close: {
    color: closeButtonColor,
  },
});
const ThankYouDialog: FC<IProps> = () => {
  const [isShowing, setIsShowing] = useState(false);
  const classes = useStyles();
  const toggle = () => {
    setIsShowing(!isShowing);
  };
  const namesArr = [
    'יובל בר לוי',
    'מיקי שטנגר',
    'יעל לוריא',
    'מיטל לזרוביץ׳',
    'דניאל שלי',
    'סרגי בקר',
    'דרור רשף',
    'אדל אנגל',
    'כרמל פרדיס',
    'עתליה אלון',
    'יוגב בוארון בן-הר',
    'אייל שער',
    'אייל לוי',
  ];
  const sortedNames = namesArr.sort((a, b) => a.split(' ')[1].localeCompare(b.split(' ')[1], 'he'));
  const names = sortedNames.join(', ');
  return (
    <>
      <Box onClick={toggle}>תודות</Box>

      <Dialog isShowing={isShowing} onClose={toggle}>
        <Box className={classes.dialog}>
          <AnywayAppBar>
            <Box className={classes.bar}>
              תודות
              <IconButton onClick={toggle} className={classes.close}>
                <CloseIcon>close the dialog</CloseIcon>
              </IconButton>
            </Box>
          </AnywayAppBar>
          <Box display="flex" flexDirection="column" p={2}>
            <Text type={TextType.CONTENT}>
              הפרויקט פותח על ידי:
              <p>{names}</p>
            </Text>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default ThankYouDialog;
