import axios from 'axios';

const API_URL_TABLES = process.env.REACT_APP_BASE_API_URL + '/tables';

const createTable = async (tableData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL_TABLES}`, tableData, config);
  return response.data;
};

const getTables = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL_TABLES}`, config);
  return response.data;
};

const getTable = async (tableId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL_TABLES}/${tableId}`, config);
  return response.data;
};

const updateTable = async (tableId, tableData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL_TABLES}/${tableId}`, tableData, config);
  return response.data;
};

const deleteTable = async (tableId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL_TABLES}/${tableId}`, config);
  return response.data;
};

const tableService = {
  createTable,
  getTables,
  getTable,
  updateTable,
  deleteTable,
};

export default tableService;