import React from 'react';
import ynetLogo from  '../../assets/Ynet_website_logo.svg';
import wallaLogo from  '../../assets/walla-logo.svg';
import {Box, makeStyles} from '@material-ui/core';
import Button from "@material-ui/core/Button";


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
      height:'7%'
    }
});

export const NewsFlashFilterPanel : React.FC = ()=>{
    const classes =useStyles();
    return(
        <Box  className={classes.container} display='flex' flexDirection='row' justifyContent='space-evenly'>
            <Button  className={classes.button} onClick={() => {
            }}>
                <img  className={classes.image} src={ynetLogo} alt="Source Logo"/>
            </Button>
            <Button className={classes.button} onClick={() => {
            }}>
                <img  className={classes.image} src={wallaLogo} alt="Source Logo"/>
            </Button>
            <Button className={classes.button} onClick={() => {
            }}>
                <img  className={classes.image} src={ynetLogo} alt="Source Logo"/>
            </Button>
        </Box>
    )

};