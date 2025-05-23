import axios from "axios";

const main_url = axios.create({
      baseURL: "https://b7a1-89-236-218-41.ngrok-free.app/api/v1", // localhost
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
