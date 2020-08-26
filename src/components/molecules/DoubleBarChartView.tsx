// import React, { FC } from 'react';
import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar } from 'recharts';
import { DoubleBarChartFillColorBar1, DoubleBarChartFillColorBar2 } from '../../style';

interface IProps {
  data: Array<object>;
  xLabel1: string | number;
  xLabel2: string | number;
  yLabel: string | number;
  textLabel: string;
}
const DoubleBarChartView: FC<IProps> = ({ data, xLabel1, xLabel2, yLabel }) => {
  console.log('data double bar', data);
  return (
    <ResponsiveContainer width={'100%'} height={'70%'}>
      <BarChart data={data} margin={{ top: 20, bottom: 15 }}>
        <XAxis dataKey={yLabel} tickLine={false} axisLine={false} dy={20} />

        <Bar dataKey={xLabel1} fill={DoubleBarChartFillColorBar1}>
          <LabelList dataKey={xLabel1} position="insideTop" />
          <LabelList dataKey={xLabel1} position="bottom" />
        </Bar>
        <Bar dataKey={xLabel2} fill={DoubleBarChartFillColorBar2}>
          <LabelList dataKey={xLabel2} position="insideTop" />
          <LabelList dataKey={xLabel2} position="bottom" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DoubleBarChartView;
