import * as React from 'react';
import HeadOnCollisionsComparisonWidget from '../HeadOnCollisionsComparisonWidget';

export default {
  title: 'Components/molecules/widgets/HeadOnCollisionsComparisonWidget',
};

const data = {
  items: {
    specific_road_segment_fatal_accidents: [
      { desc: '\u05d7\u05d6\u05d9\u05ea\u05d9\u05d5\u05ea', count: 170 },
      { desc: '\u05d0\u05d7\u05e8\u05d5\u05ea', count: 150 },
    ],
    all_roads_fatal_accidents: [
      { desc: '\u05d7\u05d6\u05d9\u05ea\u05d9\u05d5\u05ea', count: 178 },
      { desc: '\u05d0\u05d7\u05e8\u05d5\u05ea', count: 541 },
    ],
  },
  text: {
    title:
      '\u05ea\u05d0\u05d5\u05e0\u05d5\u05ea \u05e7\u05d8\u05dc\u05e0\u05d9\u05d5\u05ea \u05e2\u05f4\u05e4 \u05e1\u05d5\u05d2',
  },
};

export const common = () => <HeadOnCollisionsComparisonWidget data={data} segmetText="segmetText" />;

export const usePercent = () => <HeadOnCollisionsComparisonWidget data={data} segmetText="segmetText" usePercent />;
