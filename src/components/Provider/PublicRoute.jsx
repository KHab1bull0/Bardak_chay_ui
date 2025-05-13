import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoute = ({ children }) => {
      const token = Boolean(localStorage.getItem("token"))

      // Agar foydalanuvchi allaqachon tizimga kirgan bo'lsa, asosiy sahifaga yo'naltirish
      if (token) {
            return <Navigate to="/" replace />;
      }

      // Agar children berilgan bo'lsa uni ko'rsatish, aks holda Outlet ishlатiladi
      return children;
};