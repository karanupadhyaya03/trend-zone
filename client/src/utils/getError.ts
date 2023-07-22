import { ApiError } from '../types/ApiError';

const getError = (error: ApiError) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

export default getError;
