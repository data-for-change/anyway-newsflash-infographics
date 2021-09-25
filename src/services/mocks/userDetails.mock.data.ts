import { IUserInfo } from '../user.service';
import mockImage from '../../assets/SJGKVE5UNVESVCW7BBOHKQCZVE.webp'


export const mockUserInfo : IUserInfo = {
  data: {
    firstName: 'אדמין',
    lastName: 'אדמין',
    email: 'admin@anyway.com',
    imgUrl: mockImage,
    roles: ["or_yarok", "admins"],
    workplace : 'or_yarok'
  },
  meta : {
    isCompleteRegistration : true
  }
}
