"use client";
import {Navigate} from 'react-router-dom';

/**
 * A Higher-order component to handle authentication.
 * @param {React.ComponentType} Component - The component to wrap with authentication.
 * @returns {React.ComponentType} - The component wrapped with authentication logic.
 */
const withAuth = (Component) => {
    return (props) => {
      const isAuth = !!localStorage.getItem("token");
      if (isAuth) {
          return <Component {...props} />;
      } else {
          return <Navigate to="/" />;
      }
  };
};

export default withAuth;