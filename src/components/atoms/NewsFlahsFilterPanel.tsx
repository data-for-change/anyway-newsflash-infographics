import React from 'react';
import ynetLogo from  '../../assets/Ynet_website_logo.svg';
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
        border: '0.5px solid blue',
        boxShadow: '2px 2px 2px 2px #888888'
    }
});

export const NewsFlashFilterPanel : React.FC = ()=>{
    const classes =useStyles();
    return(
        <Box  display='flex' flexDirection='row' justifyContent='space-evenly'>
            <Button  className={classes.button} onClick={() => {
            }}>
                <img  className={classes.image} src={ynetLogo} alt="Source Logo"/>
            </Button>
            <Button className={classes.button} onClick={() => {
            }}>
                <img  className={classes.image} src={ynetLogo} alt="Source Logo"/>
            </Button>
            <Button className={classes.button} onClick={() => {
            }}>
                <img  className={classes.image} src={ynetLogo} alt="Source Logo"/>
            </Button>
        </Box>
    )

};