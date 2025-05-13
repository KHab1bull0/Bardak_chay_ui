import { Navigate } from "react-router";


export const PrivateRoute = ({ children }) => {
      const token = Boolean(localStorage.getItem("token"))

      // Agar children berilgan bo'lsa uni ko'rsatish, aks holda Outlet ishlатiladi
      return token ? children : <Navigate to="/signin" replace />;
};