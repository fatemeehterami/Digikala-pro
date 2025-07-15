import axios from 'axios';

const API_URL = 'http://localhost:3000';

export async function sendVerificationCode(mobile) {
  try {
    const response = await axios.post(`${API_URL}/auth/send-code`, { mobile });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Server Error' };
  }
}

export async function verifyCode(mobile, code) {
  try {
    const response = await axios.post(`${API_URL}/auth/verify`, { mobile, code });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Invalid Code' };
  }
}
