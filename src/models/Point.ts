export interface IPoint {
  longitude: number;
  latitude: number;
}
export interface IPointAccident extends IPoint {
  accident_severity: string;
  accident_timestamp: string;
}
