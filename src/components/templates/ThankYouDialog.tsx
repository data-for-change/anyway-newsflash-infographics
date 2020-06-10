import React, { FC } from 'react';
import SectionDialog from '../organisms/SectionDialog';
import { Text, TextType } from '../atoms';

interface IProps {}

const ThankYouDialog: FC<IProps> = () => {
  const namesArr = ['יובל בר לוי', 'מיקי שטנגר','יעל לוריא', 'מיטל לזרוביץ׳','דניאל שלי', 'סרגי בקר', 'דרור רשף', 'אדל אנגל', 'כרמל פרדיס', 'עתליה אלון','יוגב בוארון בן-הר', 'אייל שער', 'אייל לוי'];
  const sortedNames = namesArr.sort((a, b) => a.split(' ')[1].localeCompare(b.split(' ')[1], 'he'));
  const names = sortedNames.join(", ")
  return (
    <SectionDialog title="תודות">
      <Text type={TextType.CONTENT}>
        הפרויקט פותח על ידי:
        <p>{names}</p>
      </Text>
    </SectionDialog>
  );
};

export default ThankYouDialog;
