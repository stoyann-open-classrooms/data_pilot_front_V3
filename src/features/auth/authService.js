import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_API_URL + '/auth';

// login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);

  if (response.data) {
    localStorage.setItem('userToken', JSON.stringify(response.data.token));
    // Si le rôle est inclus dans la réponse, vous pouvez le stocker comme ceci :
    localStorage.setItem('userRole', JSON.stringify(response.data.role));
  }

  return response.data;
};

// Logout
const logout = () => {
  localStorage.removeItem('userToken');
  localStorage.removeItem('userRole'); // N'oubliez pas de le supprimer ici aussi
};

const authService = {
  logout,
  login,
};

export default authService;
