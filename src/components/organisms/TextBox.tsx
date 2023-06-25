import React from 'react'
import DialogWithHeader from '../molecules/DialogWithHeader';
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import { Box, makeStyles} from '@material-ui/core'
import { useTranslation } from 'react-i18next';
import { Typography } from 'components/atoms';
import { transparent } from 'style';


interface IProps {
    isOpen: boolean;
    onClose: () => void;
    widgetName: string;
    text: string | undefined;
}
const TextBox: React.FC<IProps> = ({ isOpen,text,onClose}) => {

    console.log('transaction ',text);
    

    const useStyles = makeStyles((theme) => ({
        text: {
            position: 'relative', // for meta tags
            boxSizing: 'border-box',
            zIndex: 0,
            margin: '20px 0',
            textAlign: 'center',
            lineHeight: 1.7
        },
        root: {
          display: 'flex',
          flexDirection:'column',
          alignItems:'center',
          boxSizing:'border-box',
          padding:20
        },
        button: {
            margin: '20px 0',
            '&:hover': {  
              backgroundColor: transparent,
            },
          },
        img:{
            height:'100px',
            width:'100px'
        }


    }));

    const { t } = useTranslation();
    const onCloseInitValues = () => {
        onClose();
    }
    
    const classes = useStyles();

    return (
        <DialogWithHeader   fullWidth={false} isShowing={isOpen} onClose={onCloseInitValues} title={t('infografic.transaction')}>
            <Box className={classes.root}>
                <Box className={classes.text} maxWidth={380}>
                    <Typography.Body1>
                            {text}
                    </Typography.Body1>
                </Box>
                <Box>
                    <AnyWayButton onClick={() =>{navigator.clipboard.writeText(text?text:'asdsadasd')}} className={classes.button} >
                        <img className={classes.img} src="https://play-lh.googleusercontent.com/pcns8ys8bh1GJaCc0K2vSMSqJ_1cjWWRECAoXYgFN5fDJxAM5ZBHWuJqFRnMR5NVRlJp" alt="" />
                    </AnyWayButton>
                </Box>
            </Box>
        </DialogWithHeader>
    )
}

export default TextBox