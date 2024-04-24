/*import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Import getAuth
import { app } from '../firebase'; // Import app from your firebase.js file

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = getAuth(app).currentUser; // Use getAuth(app) to get the auth instance from the Firebase app

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;*/
