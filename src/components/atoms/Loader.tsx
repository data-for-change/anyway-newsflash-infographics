import React, { FC } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface IProps {
}

const Loader: FC<IProps> = () => <CircularProgress />
export default Loader;