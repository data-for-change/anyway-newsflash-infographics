const MAX_WORDS_PER_TITLE_LINE = 5;
// when title less than 5 words, show in one line, otherwise split title to equal lines
export const splitTextHeader = (text = '') => {
  let textLine1 = text;
  let textLine2 = '';
  const textWordsArr = text?.split(' ');
  const textWordLength = textWordsArr?.length;
  if (textWordLength && textWordLength <= MAX_WORDS_PER_TITLE_LINE) {
    return { textLine1 };
  } else {
    const indexToSplit = Math.floor(textWordLength / 2);
    textLine1 = textWordsArr?.slice(0, indexToSplit).join(' ');
    textLine2 = textWordsArr?.slice(indexToSplit).join(' ');
  }
  return { textLine1, textLine2 };
};
