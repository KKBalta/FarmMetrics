// src/api/auth.js
import API from './api'; // Import your Axios API instance

export async function signIn(email, password) {
  try {
    const response = await API.post('/farmers/login', { email, password });
    return {
      isOk: true,
      data: response.data, // Axios automatically parses JSON
      
    };
  } catch (error) {
    return {
      isOk: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function createAccount(email, password) {
  try {
    const response = await API.post('/farmers/signup', { email, password });
    return {
      isOk: true,
      data: response.data,
    };
  } catch (error) {
    return {
      isOk: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function getUser() {
  try {
    const response = await API.get('/farmers');
    return {
      isOk: true,
      data: response.data,
    };
  } catch (error) {
    return {
      isOk: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    const response = await API.post('/change-password', { email, recoveryCode });
    return {
      isOk: true,
      data: response.data,
    };
  } catch (error) {
    return {
      isOk: false,
      message: error.response?.data?.message || error.message,
    };
  }
}

export async function resetPassword(email) {
  try {
    const response = await API.post('/reset-password', { email });
    return {
      isOk: true,
      data: response.data,
    };
  } catch (error) {
    return {
      isOk: false,
      message: error.response?.data?.message || error.message,
    };
  }
}
