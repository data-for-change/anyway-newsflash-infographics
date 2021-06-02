export interface ITableData {
  labels: Array<string>;
  items: Array<any>;
  text: { title?: string | undefined };
}
export const createTableData = (
  labels: Array<string>,
  dataKeys: Array<string>,
  items: Array<any>,
  text: { title?: string | undefined },
) => {
  const arrayOfItems = items
    .map((item) => {
      return Object.keys(item)
        .filter((key) => dataKeys.includes(key))
        .sort((a, b) => dataKeys.indexOf(a) - dataKeys.indexOf(b))
        .reduce((obj: object, key: string) => {
          return {
            ...obj,
            [key]: item[key],
          };
        }, {});
    })
    .map((value: any) => Object.values(value));

  return {
    labels: labels,
    items: arrayOfItems,
    text: text,
  };
};
