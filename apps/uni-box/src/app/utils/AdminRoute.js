import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  return (<Route
    {...rest}
    render={(props) => user?.role==='ADMIN'
    ? <Component {...props} />
    : <Redirect to="/auth" />}
  />
);
}

export default AuthRoute;
