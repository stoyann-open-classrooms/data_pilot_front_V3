import axios from 'axios';
const API_URL = process.env.REACT_APP_BASE_API_URL + '/customers';

const createCustomer = async (customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, customerData, config);
  return response.data;
};

const getCustomers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const getCustomer = async (customerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/${customerId}`, config);
  return response.data;
};

const updateCustomer = async (customerId, customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${customerId}`, customerData, config);
  return response.data;
};

const deleteCustomer = async (customerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${customerId}`, config);
  return response.data;
};

const customerService = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};

export default customerService;
