import React, { FC } from 'react';
import SectionDialog from '../organisms/SectionDialog';
import { Text, TextType } from '../atoms';

interface IProps {}

const AboutDialog: FC<IProps> = () => {
  return (
    <SectionDialog title="אודות">
      <Text type={TextType.CONTENT}>
      לורם איפסום דולור סיט אמט,
       קונסקטורר אדיפיסינג אלית צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק. קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים.
       קלאצי לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית. סת אלמנקום ניסי נון ניבאה. דס איאקוליס וולופטה דיאם.
      וסטיבולום אט דולור, קראס אגת לקטוס וואל אאוגו וסטיבולום סוליסי טידום בעליק.
      </Text>
    </SectionDialog>
  );
};

export default AboutDialog;
