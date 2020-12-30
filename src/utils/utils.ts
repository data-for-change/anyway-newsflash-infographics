import { IPoint } from '../models/Point';

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

export const authServerUrl = serverUrl;
//function return api key depends on the env it running on
export const mapApiKey = process.env.REACT_APP_GOOGLE_MAP_KEY ? process.env.REACT_APP_GOOGLE_MAP_KEY : '';

export const showDemoCards = process.env.REACT_APP_SHOW_DEMO_CARDS === 'true';
// demo id as it wil be appeared in url route
export const DEMO_ID = 999;

export const showOnlyOperCards = process.env.REACT_APP_SHOW_ONLY_OPER_CARDS === 'false';
// export function handleNewsflashId(id?: string) {
//   let newsFlashId: string | number | undefined = id;
//   if (id) {
//     newsFlashId = id !== DEMO_ID ? parseInt(id) : DEMO_ID;
//   }
//   return newsFlashId;
// }
