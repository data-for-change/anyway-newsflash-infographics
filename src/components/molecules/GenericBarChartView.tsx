import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar , Tooltip, Legend} from 'recharts';
import { roseColor, honeyColor, yellowColor } from 'style';
import { Typography } from 'components/atoms';

// export enum BarChartType {
//   SIMPLE = 1 || 2 || 3,
//   // DOUBLE = 2,
//   // STACKED = 3,
// }

// export type BarChartType = 1 | 2 | 3;

interface IProps {
  numOfBars: number;
  data: Array<object>;
  yLabel: string;
  textLabel?: string;
  name1?: string;
  name2?: string;
  name3?: string;
  xLabels: string[];
  xNames: string[];
}



const GenericBarChartView: FC<IProps> = ({ numOfBars, xNames, xLabels, data,yLabel, textLabel }) => {
  const COLORS = [roseColor, honeyColor, yellowColor]
  const isStacked = numOfBars === 3;


  return (
    <>
      <ResponsiveContainer >
        <BarChart data={data}>
          <XAxis angle={-10} interval={0} dataKey={yLabel} tickLine={false} axisLine={false} />
          <Tooltip/>
          <Legend verticalAlign="top" height={36}/>
          {Array.from({ length: numOfBars }, (_, i) =>
            <Bar name={xNames[i]} stackId={isStacked ? "a": undefined} fill={COLORS[i]} dataKey={xLabels[i]} radius={[10, 10, 10, 10]}>
            <LabelList dataKey={xLabels[i]} position="top" />
          </Bar>)}
        </BarChart>
      </ResponsiveContainer>
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
    </>
  );
};
export default GenericBarChartView;
