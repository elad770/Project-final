import axios from 'axios';

const API_URL = 'https://cleanly.onrender.com/';

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

const userLoginGoogle = async (email, name, imageUrl) => {
  const response = await axios.post(`${API_URL}auth/loginGoogle`, { email, name, imageUrl });
  // console.log('data login google after is', data);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const update = async (userData, token) => {
  console.log(userData);
  console.log(token);
  const response = await axios.put(`${API_URL}users/update`, userData, {
    headers: {
      'Content-Type': 'multipart/form-data',
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
  userLoginGoogle,
  update,
  logout,
};

export default authService;
