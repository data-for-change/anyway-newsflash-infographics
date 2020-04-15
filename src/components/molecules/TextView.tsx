import React, { FunctionComponent } from 'react';
import { IWidgetCountBySeverity } from '../../models/WidgetData';
import { Text, TextType } from '../atoms';
interface IProps {
  data: IWidgetCountBySeverity[];
}

const TextView: FunctionComponent<IProps> = (props) => {
  //hardcoded, waiting for data changes from the server
  return (
    <>
      <Text type={TextType.CONTENT}>
        `בין השנים {'2015-2019'} במקטע מצפה שלם - צומת שדי שבכביש {'90'} התרחשו{'266 '}תאונות`
      </Text>
      <Text type={TextType.CONTENT}>
        {' '}
        {'קטלניות'}
        {' 13'}
      </Text>
      <Text type={TextType.CONTENT}>
        {'קשות'}
        {' 16'}
      </Text>
      <Text type={TextType.CONTENT}>
        {'קלות'}
        {' 225'}
      </Text>
    </>
  );
};
export default TextView;
