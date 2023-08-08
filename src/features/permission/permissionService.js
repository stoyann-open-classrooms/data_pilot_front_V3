import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_API_URL + '/authorizations';

const createAuthorization = async (authorizationData) => {
  const response = await axios.post(`${API_URL}`, authorizationData);
  return response.data;
};

const getAuthorizations = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const getAuthorization = async (authorizationId) => {
  const response = await axios.get(`${API_URL}/${authorizationId}`);
  return response.data;
};

const updateAuthorization = async (authorizationId, updatedData) => {
  const response = await axios.put(`${API_URL}/${authorizationId}`, updatedData);
  return response.data;
};

const deleteAuthorization = async (authorizationId) => {
  const response = await axios.delete(`${API_URL}/${authorizationId}`);
  return response.data;
};

const authorizationService = {
  createAuthorization,
  getAuthorizations,
  getAuthorization,
  updateAuthorization,
  deleteAuthorization,
};

export default authorizationService;
