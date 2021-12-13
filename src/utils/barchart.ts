type stringNumObject = Record<string, string | number>;
type stringObject = Record<string, string>;

export const transformItems = (jsonData: any, isSingleBar: boolean) => {
  function getTranslatedLabel(key: string) {
    return translationMap[key] || key;
  }

  let transformedItems;

  const translationMap: stringObject = jsonData.text.labels_map;
  const items = jsonData.data.items;

  // const transformedItems = items.map((item: any) => {
  //   const result: stringNumObject = {};
  //   const label = item.label_key.toString();
  //   result['xType'] = getTranslatedLabel(label);
  //   if (isSingleBar) {
  //     result[translatedYLabelName] = item.value;
  //   } else {
  //     const series = item.series;
  //     series.forEach((dataPoint: any) => {
  //       const { label_key, value } = dataPoint;
  //       const yLabel = getTranslatedLabel(label_key);
  //       result[yLabel] = Math.round(value); //
  //     });
  //   }
  //
  //   return result;
  // });

  if (isSingleBar) {
    const translatedYLabelName = getTranslatedLabel('value');
    transformedItems = items.map((item: stringNumObject) => {
      const result: stringNumObject = {};
      const label = item.label_key.toString();
      result['xType'] = getTranslatedLabel(label);
      result[translatedYLabelName] = item.value;
      return result;
    });
  } else {
    transformedItems = items.map((item: { label_key: string; series: { label_key: string; value: number }[] }) => {
      const result: stringNumObject = {};
      const label = item.label_key.toString();
      const series = item.series;
      result['xType'] = getTranslatedLabel(label); //   {'סוג רכב':'אופניים'}  /  {'שנה':'2017'}
      series.forEach((dataPoint) => {
        const { label_key, value } = dataPoint;
        const yLabel = getTranslatedLabel(label_key);
        result[yLabel] = Math.round(value); //   {'year':2017, 'percentage_segment':5 ...series}
      });
      return result;
    });
  }

  return transformedItems;
};
