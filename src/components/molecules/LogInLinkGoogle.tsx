import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {onLinkColor, onLinkColorHover} from '../../style/_globals';
import axios, {AxiosResponse} from 'axios'
import Text, {TextType} from "../atoms/Text";

const LOGIN_LINK = process.env.REACT_APP_GOOGLE_LOGIN_LINK_DEV;
const LOGOUT_LINK = process.env.REACT_APP_GOOGLE_LOGIN_LINK_DEV;


interface IloginRes {
  authenticated : boolean,
  cookies : any,
  user : string,

}
const LogInLinkGoogle = () => {
  const useStyles = makeStyles({
    link: {
      color: `${onLinkColor}`,
      textDecoration: 'none',
      '&:hover': {
        color: `${onLinkColorHover}`,
      },
      cursor: 'pointer'
    },
  });
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState('');
  useEffect(()=> {
      axios({
        method:'get',
        url:`http://localhost:4000/auth/google-login/success`,
        withCredentials:true
      }).then((res : AxiosResponse<IloginRes>) =>{
        setIsLogin(res.data.authenticated);
        setUser(res.data.user);
        }
      ).catch( err=> console.log(err));
    }
    ,[]);

    const handleLogout =  () => {
      setIsLogin(false);
      setUser('');
  }

  return isLogin ? <div><a href={LOGOUT_LINK} onClick={handleLogout} >LOGOUT</a> <Text type={TextType.CONTENT_TITLE}> {` שלום ${user}`}</Text></div>  : <a className={classes.link}  href={LOGIN_LINK} >LOGIN</a>
};

export default LogInLinkGoogle
