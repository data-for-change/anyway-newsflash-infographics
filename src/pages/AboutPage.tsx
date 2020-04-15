import React, { FunctionComponent } from 'react';
import { Text, TextType } from '../components/atoms';

interface IProps {}

const AboutPage: FunctionComponent<IProps> = () => {
  return (
    <div>
      <Text type={TextType.PAGE_TITLE}>About</Text>
      <Text type={TextType.CONTENT_TITLE}>ANYWAY’s Infographics Generator - Our Next Challenge</Text>
      <Text type={TextType.CONTENT}>
        ANYWAY’s next challenge is to form an automatic generator of infographics to empower and serve journalists,
        bloggers, public opinion leaders, community leaders etc. in the era of data journalism.
      </Text>
      <Text type={TextType.CONTENT}>
        The generated infographics will enhance reporting and news writing with the use of statistics. Each infographic
        will be created for a real-time road accident related news flash and will provide a deeper insight into the
        story based on historical data. This, we believe, will increase both the quantity and quality of articles
        dealing with road accidents, and will result in raising public awareness and creating pressure on decision
        makers to initiate infrastructure improvements in light of Vision Zero.
      </Text>
    </div>
  );
};

export default AboutPage;
