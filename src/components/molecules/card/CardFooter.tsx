import React from 'react';
import { Box, CardActions } from '@material-ui/core';
import CardEditor from '../../organisms/CardEditorDialog';
import { Logo, Typography } from '../../atoms';
import LamasImage from '../../../assets/cbs.png';
import AnywayImage from '../../../assets/anyway.png';
import { CardSizes } from './card.util';
import { makeStyles } from '@material-ui/core/styles';
import { cardFooterHeight } from '../../../style';

interface IProps {
  sizes: CardSizes;
  widgetName: string;
  isEditorOpen: boolean;
  onCloseEditor: () => void;
  dateComment: string;
}

const useStyles = makeStyles({
  actions: {
    boxSizing: 'border-box',
    height: cardFooterHeight,
    padding: 0,
    alignItems: 'flex-end',
  },
  actionsSpace: {
    flex: 1,
  },
});

const CardFooter: React.FC<IProps> = ({ isEditorOpen, onCloseEditor, sizes, widgetName, dateComment }) => {
  const footerSizes: CardSizes = sizes;
  const classes = useStyles();
  return (
    <Box height={footerSizes.footerHeight} width="100%">
      <CardActions className={classes.actions}>
        <CardEditor comment={dateComment} isOpen={isEditorOpen} onClose={onCloseEditor} widgetName={widgetName} />
        <div className={classes.actionsSpace}></div>
        <Typography.Body3>{dateComment}</Typography.Body3>
        <Logo src={LamasImage} alt={'Lamas'} height={30} />
        <Logo src={AnywayImage} alt={'Anyway'} height={20} />
      </CardActions>
    </Box>
  );
};

export default CardFooter;
