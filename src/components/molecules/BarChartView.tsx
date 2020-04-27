import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Label, Bar } from 'recharts';
import { barChartFillColor } from '../../style/_globals';

interface IProps {
  data: Array<object>
  xLabel: string | number;
  yLabel: string | number;
  textLabel: string;
}

const BarChartView: FC<IProps> = ({data, xLabel, yLabel, textLabel}) => {

  return (
    <ResponsiveContainer width={'100%'} height={'90%'}>
      <BarChart data={data} margin={{ top: 20, bottom: 15 }}>
        <XAxis dataKey='none' tickLine={false} axisLine={false}>
          <Label value={textLabel} offset={1} position='bottom' />
        </XAxis>
        <Bar dataKey={yLabel} fill={barChartFillColor}>
          <LabelList dataKey={xLabel} position={'insideBottom'} angle={-90} offset={20} />
          <LabelList dataKey={yLabel} position='top' />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default BarChartView;
