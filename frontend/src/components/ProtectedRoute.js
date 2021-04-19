import React from 'react';
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => props.loggedIn === true || props.headerStatus === 'toRegister' ? <Component {...props} /> : <Redirect to="./signin" />
      }
    </Route>

  )
}

export default ProtectedRoute;