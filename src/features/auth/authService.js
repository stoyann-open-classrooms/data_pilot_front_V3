import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_API_URL + '/auth';

// Enregistrer l'utilisateur
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);
  if (response.data) {
    localStorage.setItem('userToken', JSON.stringify(response.data.token));
    localStorage.setItem('userRole', JSON.stringify(response.data.role));
    localStorage.setItem('userCustomer', JSON.stringify(response.data.customer));
  }
  return response.data;
};

// Se connecter
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  if (response.data) {
    localStorage.setItem('userToken', JSON.stringify(response.data.token));
    localStorage.setItem('userRole', JSON.stringify(response.data.role));
    localStorage.setItem('userCustomer', JSON.stringify(response.data.customer));
  }
  return response.data;
};

// Se déconnecter
const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userCustomer');
};

// Demander la réinitialisation du mot de passe
const forgotPassword = async (email) => {
  const response = await axios.post(API_URL + '/forgotpassword', { email });
  return response.data;
};

// Réinitialiser le mot de passe
const resetPassword = async (resetToken, newPassword) => {
  const response = await axios.put(API_URL + `/resetpassword/${resetToken}`, { password: newPassword });
  return response.data;
};

const getMe = async (token) => {
  const response = await axios.get(API_URL + '/me', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const updateDetails = async (token, userData) => {
  const response = await axios.put(API_URL + '/updatedetails', userData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

const updatePassword = async (token, passwords) => {
  const response = await axios.put(API_URL + '/updatepassword', passwords, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};


const authService = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getMe,
  updateDetails,    
  updatePassword   
};

export default authService;
