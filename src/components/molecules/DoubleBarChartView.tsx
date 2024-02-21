import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar } from 'recharts';
import { roseColor, honeyColor } from 'style';

interface IProps {
  data: Array<object>;
  yLabel: string;
  xLabel1: string;
  xLabel2: string;
}

const DoubleBarChartView: FC<IProps> = ({ data, xLabel1, xLabel2, yLabel }) => {
  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <XAxis dataKey={yLabel} tickLine={false} axisLine={false} />
        <Bar dataKey={xLabel1} fill={roseColor}>
          <LabelList dataKey={xLabel1} position="top" />
        </Bar>
        <Bar dataKey={xLabel2} fill={honeyColor}>
          <LabelList dataKey={xLabel2} position="top" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DoubleBarChartView;
