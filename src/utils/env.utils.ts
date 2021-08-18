export const isProd = process.env.REACT_APP_ENV === 'production';

// temporary helpers for features flags.
// once feature is production ready - method and env var can be deleted
export const FEATURE_FLAGS = {
  login: !isProd || process.env.REACT_APP_LOGIN_READY_FOR_PROD === 'true',
  location_search: !isProd || process.env.REACT_APP_LOCATION_SEARCH_READY_FOR_PROD === 'true',
  language: !isProd || process.env.REACT_APP_LANGUAGE_READY_FOR_PROD === 'true',
};
