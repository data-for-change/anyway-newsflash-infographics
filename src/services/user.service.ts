import axios from 'axios';
import {
  ADD_ROLE_TO_USER_URL,
  GET_USER_INFO_URL,
  GET_USERS_INFO_LIST_URL,
  LOG_OUT_USER_URL,
  UPDATE_USER_INFO_URL,
} from 'utils/utils';
import { IFormInput } from 'components/molecules/UserUpdateForm';
import { StatusCodes } from 'utils/HTTPStatuesCodes';
import { IUserInfo } from '../models/user/IUserInfo';
export interface IAnywayUserDetails {
  data: {
    firstName?: string;
    lastName: string;
    email: string;
    workplace?: string;
    imgUrl : string
    roles : [string]
  };
  meta: {
    isCompleteRegistration: boolean;
  };
}

export interface UpdateUserReq {
  first_name?: string;
  last_name: string;
  user_work_place: string;
  email: string;
}

export const fetchUserInfo = async function (): Promise<IAnywayUserDetails> {
  const response = await axios.get(GET_USER_INFO_URL, { withCredentials: true });
  const userInfoData : IUserInfo = response.data;

  const userInfo: IAnywayUserDetails = {
    data: {
      firstName: userInfoData.first_name === 'null'  ? undefined : userInfoData.first_name ,
      lastName: userInfoData.last_name,
      email: userInfoData.email,
      imgUrl : userInfoData.oauth_provider_user_picture_url,
      roles : userInfoData.roles as [string]
    },
    meta: {
      isCompleteRegistration: response.data.is_user_completed_registration,
    },
  };
  return userInfo;
};

export const addRoleToUser =async  (role: string, email :string) =>{
  try {
    await axios.post(ADD_ROLE_TO_USER_URL, {role,email}, { withCredentials: true });
    return role;
  } catch (e) {
    console.error(`Error while trying to update/create user Details : ${e}`);
  }
}

export const getUsersList = async () =>{
  try {
    const response = await axios.get(GET_USERS_INFO_LIST_URL, { withCredentials: true });
    return response.data;
  } catch (e) {
    console.error(`Error while trying to get users details list : ${JSON.stringify(e.response.data)}`);
  }
}

export const getRolesList = async () => {
  try {
    const response = await axios.get(UPDATE_USER_INFO_URL, { withCredentials: true });
    return response.data
  } catch (e) {
    console.error(`Error while trying to update/create user Details : ${e}`);
  }
}

export const postUserInfo = async function (formInput: IFormInput): Promise<Boolean> {
  let isUpdateUser: boolean = false;
  const dataToSent: UpdateUserReq = {
    first_name: formInput.firstName,
    last_name: formInput.lastName,
    user_work_place: formInput.workplace,
    email: formInput.email,
  };
  try {
    const response = await axios.post(UPDATE_USER_INFO_URL, dataToSent, { withCredentials: true });
    isUpdateUser = response.status === StatusCodes.OK;
  } catch (e) {
    console.error(`Error while trying to update/create user Details : ${e}`);
  }
  return isUpdateUser;
};

export const logoutUserFromSession = async function (): Promise<boolean> {
  let isSessionLogOut: boolean = false;
  try {
    const res = await axios.get(LOG_OUT_USER_URL, { withCredentials: true });
    isSessionLogOut = res.status === StatusCodes.OK;
  } catch (e) {
    console.error(`an Error has occured while trying to log out : ${e}`);
  }
  return isSessionLogOut;
};
