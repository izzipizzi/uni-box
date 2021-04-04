import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import {AuthProvider} from './app/context/auth';
import {BoxProvider} from "./app/context/box";


ReactDOM.render(
  <AuthProvider>
    <BoxProvider>
      <App/>

    </BoxProvider>
  </AuthProvider>
  ,
  document.getElementById('root'));
