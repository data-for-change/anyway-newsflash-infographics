import React from 'react';
import { Text, TextType } from '../components/atoms';

interface IProps {}

const ThankYouPage: React.FC<IProps> = () => {
  return (
    <div>
      <Text type={TextType.PAGE_TITLE}>Thank You</Text>
      <Text type={TextType.CONTENT_TITLE}>This project was developed by:</Text>
      <Text type={TextType.CONTENT}>
        Yuval Bar Lavi, Miki Stanger, Meital Lazarovich, Daniel Shely, Sergey Bekker, Dror Reshef, Adele Angel, Carmel
        Paradis, Dror Reshef, Atalya Alon
      </Text>
    </div>
  );
};

export default ThankYouPage;
