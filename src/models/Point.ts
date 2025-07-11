import { SeverityTypes } from './Map';

export interface IPoint {
  longitude: number;
  latitude: number;
}
export interface IPointAccident extends IPoint {
  accident_severity: SeverityTypes;
  accident_timestamp: string;
}

export interface IPointAccidentWithPosition extends IPoint {
  accident_severity: SeverityTypes;
  accident_timestamp: string;
  labelClockPosition: number;
}

export interface IAggregatePointAccident extends IPoint{
  accident_severity: SeverityTypes;
  accident_timestamp: string[];
}
