import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import { AuthProvider } from './app/context/auth';
import { BoxProvider } from './app/context/box';
import { UIProvider } from './app/context/ui-context';
import { NavProvider } from './app/context/nav-context';
import { AdminBoxProvider } from './app/context/admin-box-context';
import { MaterialProvider } from './app/context/material-context';
import { Config, T, Translator } from 'react-translator-component';


Config.default = 'uk';
Config.list = {
  uk: {
    text: 'Українська',
    icon: require('./assets/locale/flags/uk.png'),
    file: require('./assets/locale/uk.js')
  },
  en: {
    text: 'English',
    icon: require('./assets/locale/flags/en.png'),
    file: require('./assets/locale/en')
  },

};

ReactDOM.render(
  <AuthProvider>
    <BoxProvider>
      <MaterialProvider>
        <UIProvider>
          <NavProvider>
            <AdminBoxProvider>
              <Translator>
                <App />
              </Translator>
            </AdminBoxProvider>
          </NavProvider>
        </UIProvider>
      </MaterialProvider>
    </BoxProvider>
  </AuthProvider>
  ,
  document.getElementById('root'));
