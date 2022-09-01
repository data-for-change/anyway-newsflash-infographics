import { IGpsData } from 'models/WidgetData';
import axios from 'axios';
import { IPoint } from 'models/Point';

const GPS_LOCATION_API: string = '/api/gps-to-location';

export const fetchGpsLocation = async (data:IPoint): Promise<IGpsData | undefined> => {
  try {
  const { longitude, latitude } = data;
	const locationUrl = `${GPS_LOCATION_API}?longitude=${longitude}&latitude=${latitude}`;
    const response = await axios.get(locationUrl);
	  return response.data;
  } catch (error) {
    console.error(error);
  }
};
