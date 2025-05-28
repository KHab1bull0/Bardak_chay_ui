import axios from "axios";

const main_url = axios.create({
      baseURL: "http://159.223.83.203:8080/api/v1" // Server
      // baseURL: "http://localhost:8080/api/v1", // localhost
});

main_url.interceptors.request.use((req) => {
      let token = localStorage.getItem("token");
      if (token) {
            req.headers.authorization = `Bearer ${token}`;
      }
      return req;
});

export default main_url;
