import axios from 'axios';

const API_URL_LINES = process.env.REACT_APP_BASE_API_URL + '/lines';
const API_URL_TABLES = process.env.REACT_APP_BASE_API_URL + '/tables';

const createLine = async (lineData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL_LINES}`, lineData, config);
  return response.data;
};

const getLines = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL_LINES}`, config);
  return response.data;
};


// Get lines for a specific table
const getLinesForTable = async (tableauId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL_TABLES}/${tableauId}/lines`, config);
  return response.data;
};

const getLine = async (lineId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL_LINES}/${lineId}`, config);
  return response.data;
};

const updateLine = async (lineId, lineData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL_LINES}/${lineId}`, lineData, config);
  return response.data; // Assurez-vous que cela retourne la ligne mise à jour
};

const deleteLine = async (lineId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL_LINES}/${lineId}`, config);
  console.log("Delete line response:", response); // Ajoutez ce log
  return response.data;
};

const lineService = {
  createLine,
  getLines,
  getLine,
  updateLine,
  deleteLine,
  getLinesForTable
};

export default lineService;
