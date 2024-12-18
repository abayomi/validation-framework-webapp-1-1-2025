"use client";
import {Navigate} from 'react-router-dom';

/**
 * A Higher-order component to handle authentication.
 * @param {React.ComponentType} Component - The component to wrap with authentication.
 * @returns {React.ComponentType} - The component wrapped with authentication logic.
 */
const withAuth = (Component) => {
    // Do not be tempted to omit this variable name, otherwise you will trigger an error when
    // executing npm run build: Component definition is missing display name react/display-name
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