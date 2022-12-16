import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}users`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}auth/login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const update = async (userData, token) => {
  const response = await axios.put(`${API_URL}users/update`, userData, {
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': 'multipart/form-data',
      // 'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  login,
  update,
  logout,
};

export default authService;
