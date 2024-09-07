import { IAggregatePointAccident, IPoint, IPointAccident } from '../models/Point';

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

export function  aggregatePoints(points: IPointAccident[]) : IAggregatePointAccident[] {
  const sameLocationPointMap : Map<string,string[]> = new Map();
  // fill only unique points (not yet included in uniqueSet)
    points.reduce((  map, currentPoint) => {
      const key  =  JSON.stringify({latitude : currentPoint.latitude ,longitude : currentPoint.longitude });
      const label = map.get(key);

   if(map.get(key)){
     label?.push(currentPoint.accident_timestamp);
     //map.set(key, `${label},${currentPoint.accident_timestamp}`)
   }
   else{
      map.set(key, [currentPoint.accident_timestamp]);
   }
      return map;
  },sameLocationPointMap);
  return Array.from(sameLocationPointMap.entries()).map(([key, value]) => {
    const point = JSON.parse(key) as IPoint;
    return {latitude: point.latitude, longitude: point.longitude, accident_timestamp: value, accident_severity: "severe"};
   })
}
