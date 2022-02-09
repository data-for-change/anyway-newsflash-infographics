import IUserRole from './IUserRole';

export interface IUserInfo {
  "email": string
  "first_name": string;
  "id": 14;
  "is_active":boolean;
  "is_user_completed_registration": boolean;
  "last_name": string;
  "oauth_provider": string;
  "oauth_provider_user_name": null;
  "oauth_provider_user_picture_url": string;
  "phone": string;
  "roles" : [string] | [IUserRole]; // admins can get roles description as an IUserRole obkect
  "organizations" : [string]; // admins can get roles description as an IUserRole obkect
  "user_desc": string;
  "user_register_date": string;
  "user_type": string;
  "user_url": string
}
