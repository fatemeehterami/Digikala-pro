import axios from 'axios';

const API_URL = 'http://localhost:3000/';

export async function sendVerificationCode(mobile) {
  try {
    const response = await axios.post(`${API_URL}auth/send-code`, { mobile });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server Error' };
  }
}

export async function verifyCode(mobile, code) {
  try {
    const response = await axios.post(`${API_URL}auth/verify-code`, {
      mobile,
      code
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Invalid Code' };
  }
}

export async function checkMobile(mobile) {
  try {
    const response = await axios.get(`${API_URL}auth/check-mobile`, {
      params: { mobile },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'error for number' };
  }
}

export async function logout() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}auth/logout`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Logout failed' };
  }
}
