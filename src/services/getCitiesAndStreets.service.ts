import axios from 'axios';

export const fetchCitiesList = async (): Promise<any> => {
  try {
    const getCitiesUrl = '/api/city';
    const response = await axios.get(getCitiesUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
