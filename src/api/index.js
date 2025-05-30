import axios from "axios";
import { API_URI } from "../../env";

const main_url = axios.create({
      baseURL: `${API_URI}api/v1`
});

main_url.interceptors.request.use((req) => {
      let token = localStorage.getItem("token");
      if (token) {
            req.headers.authorization = `Bearer ${token}`;
      }
      return req;
});

export default main_url;
