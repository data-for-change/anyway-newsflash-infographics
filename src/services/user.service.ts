import axios from 'axios';
import { GET_USER_INFO_URL, LOG_OUT_USER_URL, UPDATE_USER_INFO_URL } from 'utils/utils';
import { IFormInput } from 'components/molecules/UserUpdateForm';
import { StatusCodes } from 'utils/HTTPStatuesCodes';
export interface IUserInfo {
  data: {
    firstName: string;
    lastName: string;
    email: string;
    workplace: string;
    imgUrl : string
  };
  meta: {
    isCompleteRegistration: boolean;
  };
}

export interface UpdateUserReq {
  first_name: string;
  last_name: string;
  user_work_place: string;
  email: string;
}

export const fetchUserInfo = async function (): Promise<IUserInfo> {
  const response = await axios.get(GET_USER_INFO_URL, { withCredentials: true });
  const userInfoData = response.data;

  const userInfo: IUserInfo = {
    data: {
      firstName: userInfoData.first_name === 'null'  ? undefined : userInfoData.first_name ,
      lastName: userInfoData.last_name,
      email: userInfoData.email,
      workplace: userInfoData.work_on_behalf_of_organization,
      imgUrl : userInfoData.oauth_provider_user_picture_url
    },
    meta: {
      isCompleteRegistration: response.data.is_user_completed_registration,
    },
  };
  return userInfo;
};

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
