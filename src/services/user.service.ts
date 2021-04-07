import axios from 'axios';
import { GET_USER_INFO_URL, UPDATE_USER_INFO_URL } from '../utils/utils';
import { IFormInput } from '../components/molecules/UserUpdateForm';
import { StatusCodes } from 'http-status-codes';
export interface ActualiUserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  workPlace?: string;
}

export interface UpdateUserReq {
  first_name?: string;
  last_name?: string;
  user_work_place?: string;
  email?: string;
}

export const fetchUserInfo = async function (): Promise<ActualiUserInfo> {
  const response = await axios.get(GET_USER_INFO_URL, { withCredentials: true });

  const userInfo: ActualiUserInfo = {
    firstName: response.data[`first_name`],
    lastName: response.data['last_name'],
    email: response.data['email'],
    workPlace: response.data['user_work_place'],
  };
  return userInfo;
};

export const postUserInfo = async function (formInput: IFormInput): Promise<Boolean> {
  const dataToSent: UpdateUserReq = {
    first_name: formInput.firstName,
    last_name: formInput.lastName,
    user_work_place: formInput.workplace,
    email: formInput.email,
  };
  const response = await axios.post(UPDATE_USER_INFO_URL, dataToSent, { withCredentials: true });

  const isUpdateUser = response.status === StatusCodes.OK;

  return isUpdateUser;
};
