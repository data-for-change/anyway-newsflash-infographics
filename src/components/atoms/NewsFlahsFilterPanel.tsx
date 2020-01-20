import React from 'react';
import {Box, makeStyles} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import ynetLogo from  '../../assets/Ynet_website_logo.svg';
import wallaLogo from  '../../assets/walla-logo.svg';




export const NewsFlashFilterPanel : React.FC = ()=>{
    const useStyles = makeStyles({
        image :{
            height:'70%',
            width:'70%'
        },
        button:{
            Height:'30%',
            maxWidth:'20%',
            border: '0.5px solid grey',
            boxShadow: '1px 1px 1px 1px #888888'
        },
        container:{
            height:'7%',
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-evenly'
        }
    });
    const classes = useStyles();
    return (
        // will be convert to filterButtonsMap instead of code duplicate for the filter button
        <Box className={classes.container}>
            <Button className={classes.button} onClick={() => {}}>
                <img className={classes.image} src={ynetLogo} alt="Ynet"/>
            </Button>
            <Button className={classes.button} onClick={() => {}}>
                <img className={classes.image} src={wallaLogo} alt="Walla"/>
            </Button>
        </Box>
    )

};