import { IPoint } from '../models/Point';
import { useLocation } from 'react-router';

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export function uniquePoints(points: IPoint[]) {
  const uniquePoints = new Array<IPoint>();
  const uniqueSet = new Set();
  // fill only unique points (not yet included in uniqueSet)
  points.forEach((p) => {
    const pointKey = `${p.latitude}:${p.longitude}`; // use x:y to create unique key
    if (!uniqueSet.has(pointKey)) {
      uniquePoints.push(p);
      uniqueSet.add(pointKey);
    }
  });

  return uniquePoints;
}
// pop up login window dimensions

export const loginPopUpDim = {
  width: window.screen.width / 3.5,
  height: window.screen.height / 1.8,
};
//server url can be on dev or the heroku server
export const serverUrl = process.env.REACT_APP_BASE_URL;

export const authServerUrl = process.env.REACT_APP_AUTH_URL;
export const AUTH_LOGIN_GOOGLE_URL: URL = new URL(`${authServerUrl}authorize/google`);
export const REDIRECT_URL: string | undefined = process.env.REACT_APP_REDIRECT_URL;
export const GET_USER_INFO_URL = `${authServerUrl}user/info`;
export const UPDATE_USER_INFO_URL = `${authServerUrl}user/update`;
export const LOG_OUT_USER_URL = `${authServerUrl}logout`;

AUTH_LOGIN_GOOGLE_URL.searchParams.append('redirect_url', REDIRECT_URL!);

//function return api key depends on the env it running on
export const mapApiKey = process.env.REACT_APP_GOOGLE_MAP_KEY ? process.env.REACT_APP_GOOGLE_MAP_KEY : '';

export const showDemoCards = process.env.REACT_APP_SHOW_DEMO_CARDS === 'true';
// demo id as it wil be appeared in url route
export const DEMO_ID = 999;

export const showOnlyOperCards = process.env.REACT_APP_SHOW_ONLY_OPER_CARDS === 'true';

export const INITIAL_CENTER = { lat: 32.0853, lng: 34.7818 };

// export function handleNewsflashId(id?: string) {
//   let newsFlashId: string | number | undefined = id;
//   if (id) {
//     newsFlashId = id !== DEMO_ID ? parseInt(id) : DEMO_ID;
//   }
//   return newsFlashId;
// }
