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
  const sameLocationPointMap : Map<string,{dates : string[], severity : IAggregatePointAccident['accident_severity'] }> = new Map();
  // fill only unique points (not yet included in uniqueSet)
    points.reduce((  map, currentPoint) => {
      const key  =  JSON.stringify({latitude : currentPoint.latitude ,longitude : currentPoint.longitude });
      const mapValue = map.get(key);

   if(mapValue){
     mapValue?.dates.push(currentPoint.accident_timestamp);
     if(mapValue.severity !== "fatal" ){
       mapValue.severity = currentPoint.accident_severity ;
     }
   }
   else{
      map.set(key, {severity : currentPoint.accident_severity ,dates : [currentPoint.accident_timestamp]});
   }
      return map;
  },sameLocationPointMap);
    // convert map to array of IAggregatePointAccident
  return Array.from(sameLocationPointMap.entries()).map(([key, locationData]) => {
    const point = JSON.parse(key) as IPoint;
    return {latitude: point.latitude, longitude: point.longitude, accident_timestamp: locationData.dates, accident_severity: locationData.severity};
   })
}
