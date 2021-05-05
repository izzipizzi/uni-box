import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home/Home';
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
import MyBoxes from './pages/MyBoxes/MyBoxes';
import { UIContext } from './context/ui-context';
import Edit from './pages/Edit/Edit';
import { ErrorToast } from './components/Error';
import { NavContext } from './context/nav-context';
import { SuccessToast } from './components/Succes';
import { ViewBox } from './pages/ViewBox/ViewBox';
import Register from './pages/Auth/Register';
import { Gift } from './pages/Gift/Gift';


const App: React.FC = (props) => {

  const { user, getToken } = useContext(AuthContext);
  const nav  = useContext(NavContext);

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
              <AuthRoute exact path={'/signup'} component={Register} />
              <PrivateRoute exact path='/create' component={Create} />
              <PrivateRoute exact path='/edit' component={Edit} />
              <PrivateRoute exact path='/my' component={MyBoxes} />
              <Route path='/home' component={Home} exact={true} />
              <Route path='/gifts' component={Gift} exact={true} />
              <Route exact path='/view-box' component={ViewBox}  />
              <AdminRoute path='/admin' component={Admin} exact={true} />
              <Route path='/' render={() => <Redirect to='/home' />} exact={true} />
            </IonRouterOutlet>
            <IonTabBar slot='bottom'>
              {user ? null : (
                <IonTabButton tab='auth' href='/auth'>
                  <IonIcon icon={triangle} />
                  <IonLabel>Увійти</IonLabel>
                </IonTabButton>
              )}
              <IonTabButton tab='home' href='/home'>
                <IonIcon icon={ellipse} />
                <IonLabel>Домашня сторінка</IonLabel>
              </IonTabButton>
              {user ? (
                <IonTabButton tab='create' href='/create'>
                  <IonIcon icon={square} />
                  <IonLabel>Створити</IonLabel>
                </IonTabButton>
              ) : null}
              {user ? (

                <IonTabButton tab='my-boxes' href='/my'>
                  <IonIcon icon={square} />
                  <IonLabel>Мої коробки</IonLabel>
                </IonTabButton>

              ) : null}

              {user?.role === 'ADMIN' ? (
                <IonTabButton tab='admin' href='/admin'>
                  <IonIcon icon={square} />
                  <IonLabel>Адмнінстраторська панель</IonLabel>
                </IonTabButton>
              ) : null}
            </IonTabBar>
          </IonTabs>
          {nav.isToMyBoxes && <Redirect to={'my'}/>}
          {nav.isToAdmin && <Redirect to={'admin'}/>}
          {nav.isToHome && <Redirect to={'home'}/>}

        </IonReactRouter>
        {/*Error handle*/}
        <ErrorToast/>
        {/*Success handle*/}
        <SuccessToast/>
      </IonApp>
    </ApolloProvider>
  );
};
export default App;
