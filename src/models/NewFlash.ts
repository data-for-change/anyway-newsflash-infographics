// dummy - replace with real model interface
export interface INewsFlash {
  [index: string]: any;
  id: number;
  accident: boolean;
  author: string;
  date: string | null;
  description: string;
  lat: number;
  link: string;
  lon: number;
  display_source: string;
  newsflash_location_qualification: string;
  location: string;
  title: string;
  source: string;
  critical?: boolean;
}
