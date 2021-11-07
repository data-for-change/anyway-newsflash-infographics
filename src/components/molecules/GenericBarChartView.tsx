import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar } from 'recharts';
import { roseColor, honeyColor, yellowColor } from 'style';
import { Typography } from 'components/atoms';

export enum BarChartType {
  SIMPLE = 'simple',
  DOUBLE = 'double',
  STACKED = 'stacked',
}
interface IProps {
  type: BarChartType;
  data: Array<object>;
  xLabel1: string;
  xLabel2?: string;
  xLabel3?: string;
  yLabel: string;
  textLabel?: string;
  name1?: string;
  name2?: string;
  name3?: string;
  xLabels: string[];
  names: string[];
}

const COLORS = [roseColor, honeyColor, yellowColor]

const GenericBarChartView: FC<IProps> = ({ names, xLabels,type, data, xLabel1, xLabel2, xLabel3,yLabel, textLabel,name1, name2, name3 }) => {
  return (
    <>
      <ResponsiveContainer width={'100%'} height={'90%'}>
        <BarChart data={data} margin={{ top: 20, bottom: 15 }}>
          <XAxis dataKey={yLabel} tickLine={false} axisLine={false} />
          {xLabels.map((xLabel, i)=> (
            <Bar key={i} dataKey={xLabel} name={names[i]} stackId={type===BarChartType.STACKED ? 'a' :undefined } fill={COLORS[i]}>
              {type===BarChartType.SIMPLE &&
              <LabelList dataKey={xLabel} position={'insideBottom'} angle={-90} offset={20} />
              }
              {type===BarChartType.SIMPLE && <LabelList dataKey={yLabel} position="top" />}
              {type===BarChartType.DOUBLE && <LabelList dataKey={xLabel} position="top" />}
            </Bar>
            ))}
        </BarChart>
      </ResponsiveContainer>
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
    </>
  );
};
export default GenericBarChartView;
