import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home';
import Create from './pages/Create/Create';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Auth from './pages/Auth/Auth';
import Admin from './pages/Admin/Admin';
import Header from './components/header/Header';
import AuthRoute from './utils/AuthRoute';
import PrivateRoute from './utils/PrivateRoute';
import AdminRoute from './utils/AdminRoute';
import { AuthContext } from './context/auth';
import { GRAPHQL } from './constatnts';


const App: React.FC = (props) => {

  const { user, getToken } = useContext(AuthContext);


  const link = createUploadLink({
    uri: GRAPHQL, headers: {
      authorization: localStorage.getItem('jwt') ? `Bearer ${localStorage.getItem('jwt')}` : ''
    },
    credentials: 'same-origin'
  });

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache()

  });


  return (
    <ApolloProvider client={client}>

      <IonApp>
        <IonReactRouter>
          <Header />
          <IonTabs>
            <IonRouterOutlet>
              <AuthRoute exact path={'/auth'} component={Auth} />
              <PrivateRoute exact path='/create' component={Create} />
              <Route path='/home' component={Home} exact={true} />
              <AdminRoute path='/admin' component={Admin} exact={true} />
              <Route path='/' render={() => <Redirect to='/home' />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
              {user ? null : (
                <IonTabButton tab='auth' href='/auth'>
                  <IonIcon icon={triangle} />
                  <IonLabel>Authorize</IonLabel>
                </IonTabButton>
              )}
              <IonTabButton tab='home' href='/home'>
                <IonIcon icon={ellipse} />
                <IonLabel>Home</IonLabel>
              </IonTabButton>
              {user ? (
                <IonTabButton tab='create' href='/create'>
                  <IonIcon icon={square} />
                  <IonLabel>Create</IonLabel>
                </IonTabButton>
              ) : null}

              {user?.role === 'ADMIN' ? (
                <IonTabButton tab='admin' href='/admin'>
                  <IonIcon icon={square} />
                  <IonLabel>Admin</IonLabel>
                </IonTabButton>
              ) : null}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>

      </IonApp>
    </ApolloProvider>
  );
};
export default App;
