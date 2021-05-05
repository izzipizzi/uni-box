import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { AuthProvider } from './app/context/auth';
import { BoxProvider } from './app/context/box';
import { UIProvider } from './app/context/ui-context';
import { NavProvider } from './app/context/nav-context';
import { AdminBoxProvider } from './app/context/admin-box-context';
import { MaterialProvider } from './app/context/material-context';


ReactDOM.render(
  <AuthProvider>
    
    <BoxProvider>
      <MaterialProvider>
        <UIProvider>
          <NavProvider>
            <AdminBoxProvider>
              <App />
            </AdminBoxProvider>
          </NavProvider>
        </UIProvider>
      </MaterialProvider>
    </BoxProvider>

  </AuthProvider>
  ,
  document.getElementById('root'));
