import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_API_URL + '/permissions';

const createPermission = async (permissionData) => {
  const response = await axios.post(`${API_URL}`, permissionData);
  return response.data;
};

const getPermissions = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const getPermission = async (permissionId) => {
  const response = await axios.get(`${API_URL}/${permissionId}`);
  return response.data;
};

const updatePermission = async (permissionId, updatedData) => {
  const response = await axios.put(`${API_URL}/${permissionId}`, updatedData);
  return response.data;
};

const deletePermission = async (permissionId) => {
  const response = await axios.delete(`${API_URL}/${permissionId}`);
  return response.data;
};

const permissionService = {
  createPermission,
  getPermissions,
  getPermission,
  updatePermission,
  deletePermission,
};

export default permissionService;
