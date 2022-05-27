import axios from 'axios';

const getCitiesUrl = '/api/city';
const getStreetsByCityUrl = '/api/streets?yishuv_symbol=';

export const fetchCitiesList = async (): Promise<any> => {
  try {
    const response = await axios.get(getCitiesUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchStreetsByCity = async (citySymbol: number | undefined): Promise<any> => {
  if (!citySymbol) return;
  try {
    const streetsData = await axios.get(`${getStreetsByCityUrl}${citySymbol}`);
    return streetsData.data;
  } catch (error) {
    console.error(error);
  }
};
