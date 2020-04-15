import {IPoint} from '../models/Point';

export function uniquePoints(points: IPoint[]) {
  const uniquePoints = new Array<IPoint>();
  const uniqueSet = new Set();
  // fill only unique points (not yet included in uniqueSet)
  points.forEach((p) => {
    const pointKey = `${p.latitude}:${p.longitude}`;  // use x:y to create unique key
    if(!uniqueSet.has(pointKey)) {
      uniquePoints.push(p);
      uniqueSet.add(pointKey)
    }
  });

  return uniquePoints;
}

//function return api key depends on the env it running on
export function getAPIKey(){
  return process.env.REACT_APP_GOOGLE_MAP_KEY ? process.env.REACT_APP_GOOGLE_MAP_KEY:'';
}
