import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const Auth = () => {
      const token = localStorage.getItem("token");
      console.log(token);
      
      return token ? <Outlet /> : <Navigate replace to={'/signin'} />;
};
2
export default Auth;