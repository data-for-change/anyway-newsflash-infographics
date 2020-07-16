import React, { FC } from 'react';
import DialogWithHeader from '../molecules/DialogWithHeader';
import { Text, TextType } from '../atoms';
import { Box } from '@material-ui/core';

const maxWidth = 'sm';

interface IProps {
  isShowing: boolean;
  onClose: () => any;
}

const AboutDialog: FC<IProps> = ({ isShowing, onClose }) => {
  return (
    <DialogWithHeader title="אודות" isShowing={isShowing} onClose={onClose} maxWidth={maxWidth}>
      <article>
        <Box mb={1}>
          <Text type={TextType.CONTENT}>
            האתגר הבא של ANYWAY הוא ליצור גנרטור אוטומטי שישרת ויעצים עיתונאים, בלוגרים, מובילי דעת קהל, מובילי קהילות
            וכו׳ בעידן עיתונות הדאטה.
          </Text>
        </Box>
        <Box mb={1}>
          <Text type={TextType.CONTENT}>
            האינפוגרפיקות שיווצרו ישתמשו בנתונים סטטיסטיים על מנת להעשיר את הדיווחים והכתבות. כל אינפוגרפיקה תיווצר
            במיוחד עבור דיווח בזמן אמת על ידיעה הקשורה לתאונת דרכים ותאפשר הבנה עמוקה יותר של הסיפור שתבוסס על נתונים
            היסטוריים.
          </Text>
        </Box>
        <Box>
          <Text type={TextType.CONTENT}>
            אנו מאמינים שבעקבות כך תהיה עליה בכמות וכן באיכות של כתבות המתייחסות לתאונות דרכים וכך תועלה המודעות
            הציבורית ויווצר לחץ על מקבלי ההחלטות ליזום שיפורים בתשתיות לאור חזון&nbsp;
            <a href="https://ecowiki.org.il/wiki/%D7%97%D7%96%D7%95%D7%9F_%D7%90%D7%A4%D7%A1_%D7%94%D7%A8%D7%95%D7%92%D7%99%D7%9D_%D7%91%D7%AA%D7%90%D7%95%D7%A0%D7%95%D7%AA_%D7%93%D7%A8%D7%9B%D7%99%D7%9D">
              אפס הרוגים בתאונות דרכים.
            </a>
          </Text>
        </Box>
      </article>
    </DialogWithHeader>
  );
};

export default AboutDialog;
