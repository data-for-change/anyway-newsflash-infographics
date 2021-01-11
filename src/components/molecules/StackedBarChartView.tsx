import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, XAxis, Bar } from 'recharts';
import { roseColor, honeyColor, yellowColor } from '../../style';

interface IProps {
  data: Array<object>;
  xLabel1: string;
  xLabel2: string;
  xLabel3: string;
  yLabel: string | number;
  textLabel?: string;
}

const StackedBarChartView: FC<IProps> = ({ data, xLabel1, xLabel2, xLabel3 }) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data} margin={{ top: 20, bottom: 15 }}>
        <XAxis dataKey="year" axisLine={false} tickLine={false} />
        <Bar dataKey={xLabel1} stackId="a" fill={roseColor} />
        <Bar dataKey={xLabel2} stackId="a" fill={honeyColor} />
        <Bar dataKey={xLabel3} stackId="a" fill={yellowColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default StackedBarChartView;
