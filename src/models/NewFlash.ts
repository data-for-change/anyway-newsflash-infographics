// dummy - replace with real model interface
export interface INewsFlash {
  [index: string]: any;
  id: number | string;
  accident: boolean;
  author: string;
  date: string | null;
  description: string;
  lat: number;
  link: string;
  lon: number;
  display_source: string;
  location: string;
  title: string;
  source: string;
}
