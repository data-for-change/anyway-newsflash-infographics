import axios from 'axios';
import { USER_SERVICE_URL } from '../utils/utils';
export interface ActualiUserInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export const fetchUserInfo = async function (): Promise<ActualiUserInfo> {
  const response = await axios.get(USER_SERVICE_URL, { withCredentials: true });

  const userInfo: ActualiUserInfo = {
    firstName: response.data[`first_name`],
    lastName: response.data['last_name'],
    email : response.data['email']
  };
  return userInfo;
};
