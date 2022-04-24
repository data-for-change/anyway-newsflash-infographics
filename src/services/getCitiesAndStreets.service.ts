import axios from 'axios';

export const fetchCitiesList = async (): Promise<any> => {
  try {
    const getCitiesUrl = '/api/infographics-data?street1_hebrew=דרך ששת הימים&yishuv_name=רמת גן&years_ago=3&lang=en';
    const response = await axios.get(getCitiesUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
