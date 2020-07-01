import React, { FC } from 'react';
import DialogWithHeader from '../organisms/DialogWithHeader';
import { Text, TextType } from '../atoms';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
}

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
  return (
    <DialogWithHeader isShowing={isShowing} onClose={onClose} title="תודות">
      <article>
        הפרויקט פותח על ידי:
        <Text type={TextType.CONTENT}>{names}</Text>
      </article>
    </DialogWithHeader>
  );
};

export default ThankYouDialog;
