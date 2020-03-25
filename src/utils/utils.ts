import {IPoint} from '../models/Point';

export function uniquePoints(points: IPoint[]) {
  const uniquePoints = new Array<IPoint>();
  const uniqueSet = new Set();
  // fill only unique points (not yet included in uniqueSet)
  points.forEach((p) => {
    if(!uniqueSet.has([p.latitude, p.longitude])) {
      uniquePoints.push(p);
      uniqueSet.add([p.latitude, p.longitude])
    }
  });
  
  return uniquePoints;
}
