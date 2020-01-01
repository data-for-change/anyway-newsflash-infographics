import React from 'react';
import ynetLogo from  '../../assets/Ynet_website_logo.svg';
import {Box, makeStyles} from '@material-ui/core';
import Button from "@material-ui/core/Button";


const useStyles = makeStyles({
    root: {},
    filterButton: {
        size:'10px'
    }
});

export const NewsFlashFilterPanel : React.FC = ()=>{
    const classes = useStyles();
    return(
      <Box display ='flex'>
    <Button  className ={classes.filterButton} onClick={()=>{}} children={<img src={ynetLogo} alt="Source Logo"/>}/>
    <Button onClick={()=>{}} children={<img src={ynetLogo} alt="Source Logo"/>}/>
    <Button onClick={()=>{}} children={<img src={ynetLogo} alt="Source Logo"/>}/>
    <Button onClick={()=>{}} children={<img src={ynetLogo} alt="Source Logo"/>}/>
      </Box>
    )

};