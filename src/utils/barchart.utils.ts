type stringNumObject = Record<string, string | number>;
type stringObject = Record<string, string>;

export const transformItems = (data: any) => {
  const isSingleBar = data.items[0].series == null;
  const translationMap: stringObject = data.text.labels_map;

  function getTranslatedLabel(key: string) {
    return translationMap[key] || key;
  }

  try {
    return data.items.map((item: any) => {
      const result: stringNumObject = {};
      const label = item.label_key.toString();
      result['xType'] = getTranslatedLabel(label);
      if (isSingleBar) {
        result['value'] = item.value;
      } else {
        const series = item.series;
        series.forEach((dataPoint: any) => {
          const { label_key, value } = dataPoint;
          const yLabel = getTranslatedLabel(label_key);
          result[yLabel] = Math.round(value);
          /*
          for QA: test zero in one/two/all values. (there are 7 different options that affect radius)
           */
          if (yLabel === 'קטלנית') {
            result[yLabel] = 55;
          }
          if (yLabel === 'קשה') {
            result[yLabel] = 15;
          }
          if (yLabel === 'קלה') {
            result[yLabel] = 150;
          }
        });
      }
      return result;
    });
  } catch (e) {
    console.error(e);
  }
};
