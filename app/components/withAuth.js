"use client";
import { Navigate } from 'react-router-dom';

const withAuth = (Component) => {
  const AuthRoute = (props) => {
      const isAuth = !!localStorage.getItem("token");
      if (isAuth) {
          return <Component {...props} />;
      } else {
          return <Navigate to="/" />;
      }
  };

  return AuthRoute;
};

export default withAuth;