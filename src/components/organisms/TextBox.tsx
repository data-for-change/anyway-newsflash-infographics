import React, { useState } from 'react'
import DialogWithHeader from '../molecules/DialogWithHeader';
import { AnyWayButton } from 'components/atoms/AnyWayButton';
import { Box, makeStyles} from '@material-ui/core'
import CopyImageWhite from 'assets/copyImageWhite.jpeg';
import CopyImageGrey from 'assets/copyImageGrey.jpeg';
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

        copyImg:{
            height:'70px',
            width:'70px', 
        },
        copyMessage:{
            color:'blue'
        }
    }));

    const { t } = useTranslation();

    const [copyToClickBoard,SetCopyToClickBoard] = useState(false)    
    const [copyMessage,SetCopyMessage] = useState('')

    const onCloseInitValues = () => {
        onClose();
        SetCopyMessage('')
        SetCopyToClickBoard(false)
    }
    
    const copyHandler = () =>{
        navigator.clipboard.writeText(text?text:'')
        SetCopyToClickBoard(true)
        SetCopyMessage('הטקסט העותק ללוח')
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
                    <AnyWayButton onClick={copyHandler} className={classes.button}>
                        <Box>
                            <img className={classes.copyImg} src={copyToClickBoard?CopyImageGrey:CopyImageWhite} alt="" />
                            <Box className={classes.copyMessage}>
                            <Typography.Body2>{copyMessage}</Typography.Body2>
                            </Box>
                        </Box>
                    </AnyWayButton>
                </Box>
            </Box>
        </DialogWithHeader>
    )
}

export default TextBox