import { IFormInput } from 'components/molecules/UserUpdateForm';

export interface IValidationErrors {
  email: boolean;
  firstName: boolean;
  lastName: boolean;
}
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export function validateUserDetails(userDetails: IFormInput): IValidationErrors {
  return {
    email: EMAIL_REGEX.test(userDetails.email),
    firstName: !!userDetails.firstName && userDetails.firstName.length > 0,
    lastName: !!userDetails.lastName && userDetails.lastName.length > 0,
  };
}
