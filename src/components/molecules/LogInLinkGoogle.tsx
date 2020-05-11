import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles';
import {onLinkColor, onLinkColorHover} from '../../style/_globals';
import axios, {AxiosResponse} from 'axios'
import Text, {TextType} from "../atoms/Text";

const LINK = process.env.REACT_APP_GOOGLE_LOGIN_LINK_DEV;

const useStyles = makeStyles({
  link: {
    color: `${onLinkColor}`,
    textDecoration: 'none',
    '&:hover': {
      color: `${onLinkColorHover}`,
    },
    cursor: 'pointer'
  },
  profile:{
    color: `black`

  },
});
interface IloginRes {
  authenticated : boolean,
  cookies : any,
  user : string,

}
const LogInLinkGoogle = () => {
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
    ,[])

  return isLogin ? <Text type={TextType.CONTENT_TITLE}> {` שלום${user}`}</Text>  : <a className={classes.link}  href={LINK} >LOGIN</a>
};

export default LogInLinkGoogle
