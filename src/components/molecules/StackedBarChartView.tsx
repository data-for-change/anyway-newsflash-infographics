import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, XAxis, Bar, Legend } from 'recharts';
import { roseColor, honeyColor, yellowColor } from 'style';

interface IProps {
  data: Array<object>;
  xLabel1: string;
  xLabel2: string;
  xLabel3: string;
  yLabel: string | number;
  textLabel?: string;
  name1: string;
  name2: string;
  name3: string;
}

const StackedBarChartView: FC<IProps> = ({ data, xLabel1, xLabel2, xLabel3, name1, name2, name3 }) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <Legend layout="vertical" align="right" wrapperStyle={{ top: 5, right: 0, textAlign: 'right' }}></Legend>
        <XAxis dataKey="year" axisLine={false} tickLine={false} />
        <Bar dataKey={xLabel1} name={name1} stackId="a" fill={roseColor} />
        <Bar dataKey={xLabel2} name={name2} stackId="a" fill={honeyColor} />
        <Bar dataKey={xLabel3} name={name3} stackId="a" fill={yellowColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default StackedBarChartView;
