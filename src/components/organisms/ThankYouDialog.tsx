import React, { FC } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { Text, TextType } from '../atoms';
import { fontFamilyString } from '../../style';
import { makeStyles } from '@material-ui/core';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
}

const useStyles = makeStyles({
  content: {
    fontFamily: fontFamilyString,
    '& p': {
      marginBottom: '10px',
    },
  },
});

const ThankYouDialog: FC<IProps> = ({ isShowing, onClose }) => {
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
  const classes = useStyles();
  return (
    <DialogWithHeader isShowing={isShowing} onClose={onClose} title="תודות">
      <article className={classes.content}>
        <p>הפרויקט פותח על ידי:</p>
        <Text type={TextType.CONTENT}>{names}</Text>
      </article>
    </DialogWithHeader>
  );
};

export default ThankYouDialog;
