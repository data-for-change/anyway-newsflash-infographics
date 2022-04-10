import React, { FC } from 'react';
import { ResponsiveContainer, BarChart, LabelList, XAxis, Bar } from 'recharts';
import { roseColor } from 'style';
import { Typography } from 'components/atoms';
interface IProps {
  data: Array<object>;
  xLabel: string | number;
  yLabel: string | number;
  textLabel?: string;
}

// TODO: Consider deprecation once replaced by SingleBarChart
const BarChartView: FC<IProps> = ({ data, xLabel, yLabel, textLabel }) => {
  return (
    <>
      <ResponsiveContainer width={'100%'} height={'90%'}>
        <BarChart data={data} margin={{ top: 20, bottom: 15 }}>
          <XAxis dataKey="none" tickLine={false} axisLine={false}></XAxis>
          <Bar dataKey={yLabel} fill={roseColor}>
            <LabelList dataKey={xLabel} position={'insideBottom'} angle={-90} offset={20} />
            <LabelList dataKey={yLabel} position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {textLabel && <Typography.Body3>{textLabel}</Typography.Body3>}
    </>
  );
};
export default BarChartView;
