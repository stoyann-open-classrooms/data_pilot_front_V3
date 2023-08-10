import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_API_URL + '/rapports';

const createRapport = async (rapportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, rapportData, config);
  return response.data;
};

const getRapports = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getRapport = async (rapportId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${rapportId}`, config);
  return response.data;
};

const updateRapport = async (rapportId, rapportData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${rapportId}`, rapportData, config);
  return response.data;
};

const deleteRapport = async (rapportId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${rapportId}`, config);
  return response.data;
};

const rapportService = {
  createRapport,
  getRapports,
  getRapport,
  updateRapport,
  deleteRapport,
};

export default rapportService;
