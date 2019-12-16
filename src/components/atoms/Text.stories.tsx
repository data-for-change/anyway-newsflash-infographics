import React from 'react';
import {Text, TextType} from './Text';

export default {
  title: 'Text',
};

export const textByTypes = () => (
  <div>
    <Text type={TextType.PAGE_TITLE}>Page Title</Text>
    <Text type={TextType.CONTENT_TITLE}>Content Title</Text>
    <Text type={TextType.CONTENT}>Atomic design is a mental model to help you think of user interfaces as a
      cohesive whole and a collection of parts at the same time.
      Through the comparison to atoms, molecules, and organisms, we can think of the design of our UI as
      a composition of self-containing modules put together.</Text>
  </div>
);
