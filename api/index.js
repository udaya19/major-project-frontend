import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://192.168.0.100:3001/api/v1",
});

export default apiInstance;
