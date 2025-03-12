import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const Api = {
  getUsers: async () => {
    const response = await axios.get(`${API_BASE_URL}/get`);
    return response.data;
  },

  addUser: async (userData) => {
    await axios.post(`${API_BASE_URL}/add`, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },

  updateUser: async (id, userData) => {
    await axios.put(`${API_BASE_URL}/update/${id}`, userData, {
      headers: { "Content-Type": "application/json" },
    });
  },

  deleteUser: async (id) => {
    await axios.delete(`${API_BASE_URL}/delete/${id}`);
  },
};

export default Api;