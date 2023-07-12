// pop up login window dimensions

export const loginPopUpDim = {
  width: window.screen.width / 3.5,
  height: window.screen.height / 1.8,
};
//server url can be on dev or the heroku server
export const serverUrl = process.env.REACT_APP_BASE_URL;
export const ROLE_ADMIN_NAME = 'admins';
export const authServerUrl = process.env.REACT_APP_AUTH_URL;
export const AUTH_LOGIN_GOOGLE_URL: URL = new URL(`${authServerUrl}authorize/google`);
export const REDIRECT_ROUTE: string | undefined = process.env.REACT_APP_REDIRECT_URL;
export const GET_USER_INFO_URL = `${authServerUrl}user/info`;
export const UPDATE_USER_INFO_URL = `${authServerUrl}user/update`;
export const LOG_OUT_USER_URL = `${authServerUrl}logout`;
export const GET_ORG_LIST_URL = `${authServerUrl}user/get_organization_list`;
export const GET_ROLES_LIST_URL = `${authServerUrl}user/get_roles_list`;
export const GET_USERS_INFO_LIST_URL = `${authServerUrl}user/get_all_users_info`;
export const ADD_ROLE_TO_USER_URL = `${authServerUrl}user/add_to_role`;
export const UPDATE_USER_ORG_URL = `${authServerUrl}/user/update_user_org`;
export const REMOVE_USER_FROM_ORG_URL = `${authServerUrl}/user/remove_user_from_org`;

AUTH_LOGIN_GOOGLE_URL.searchParams.append('redirect_url', `${window.location.origin}${REDIRECT_ROUTE!}`);

//function return api key depends on the env it running on
// export const mapApiKey = process.env.REACT_APP_GOOGLE_MAP_KEY ? process.env.REACT_APP_GOOGLE_MAP_KEY : '';
export const mapApiKey = 'AIzaSyCfluirCgaQ769osh7560kST3Yo0eQIqg8';

export const showDemoCards = process.env.REACT_APP_SHOW_DEMO_CARDS === 'true';


export const showOnlyOperCards = process.env.REACT_APP_SHOW_ONLY_OPER_CARDS === 'true';

export const INITIAL_CENTER = { lat: 32.0853, lng: 34.7818 };
export const INITIAL_ZOOM = parseInt(process.env.REACT_APP_DEFAULT_MAP_ZOOM!);

export const SHOW_MOCK = process.env.REACT_APP_SHOW_MOCK_INFORMATION === 'true';
