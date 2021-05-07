import React, { useContext } from 'react';
import { IonButton, IonContent, IonInput, IonLabel, IonPage, IonRouterLink } from '@ionic/react';
import './Auth.css';
import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { AuthContext } from '../../context/auth';
import { UIContext } from '../../context/ui-context';
import { useForm } from '../../utils/hooks';
import { useMutation } from '@apollo/client';
import { T } from 'react-translator-component';


const Auth: React.FC = (props: any) => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const ui = useContext(UIContext);
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      const data = result.data.login;
      context.login(data);
    },
    onError(err) {
      ui.setError({ state: true, msg: err.graphQLErrors[0] });
    },
    variables: values
  });

  function loginUserCallback() {
    if (!values.email || !values.password) {
      ui.setError({ state: true, msg: 'ALL_FIELDS_REQUIRED' });
    } else {
      loginUser();
    }
  }

  return (
    <IonPage>
      <IonContent>
        <div className={'content-wrapper'}>
          <div className={'form-container'}>
            <form onSubmit={onSubmit}>
              <IonLabel class={'item-label'} position='stacked'>{T('EMAIL')}</IonLabel>
              <div className={'input-item-container'}>

                <IonInput
                  class={'input-container'}
                  value={values.email}
                  onIonChange={onChange('email')} />
              </div>
              <IonLabel class={'item-label'} position='stacked'>{T('PASSWORD')}</IonLabel>
              <div className={'input-item-container'}>
                <IonInput
                  type={'password'}
                  value={values.password}
                  class={'input-container'}
                  onIonChange={onChange('password')} />
              </div>
              {/*</IonItem>*/}
              <div className={'auth-btn-container'}>

                <IonButton className={'auth-btn'} expand={'full'} shape='round' fill='solid'
                           type={'submit'}>{T('LOGIN')}</IonButton>
              </div>

            </form>
          </div>
          <IonRouterLink className={'router-link'} routerLink={'signup'}>
            {T('CREATE_ACCOUNT')}
          </IonRouterLink>
        </div>

      </IonContent>

    </IonPage>
  );
};

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      user{
        _id
        name
        role,
        email
      }
    }
  }
`;


export default Auth;
