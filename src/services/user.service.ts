import axios from "axios";

interface UserStatus {
  authenticated : boolean,
  cookies : any,
  userName : string
}

export const fetchUserLoginStatus = async function() : Promise<any>  {
      try {
        const response =
          await axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}/auth/google-login/success`,
            withCredentials: true
          });

        const userStatus: UserStatus = {
          authenticated: response.data.authenticated,
          cookies: response.data.cookies,
          userName: response.data.user
        }

        return userStatus;
      }
  catch(err){
        console.log(err);
  }
}
