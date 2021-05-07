import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../../utils/hooks';

import { useHistory } from 'react-router-dom';
import { UIContext } from '../../context/ui-context';

import { T } from 'react-translator-component';

const Register = (props) => {

  const history = useHistory();
  const ui = useContext(UIContext);

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    name: '',
    email: '',
    password: ''
  });


  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      history.push('/auth');
      ui.setSuccess({ state: true, msg: 'USER_CREATED' });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {

    if (!values.email || !values.password || !values.name) {
      ui.setError({ state: true, msg: 'ALL_FIELDS_REQUIRED' });
    }else{

    addUser();
    }
  }


  return (

    <IonPage>
      <IonContent>

        {/*<IonGrid>*/}
        {/*  <IonRow>*/}
        {/*    <IonCol className="ion-align-self-center">*/}
        <div className={'content-wrapper'}>
          <div className={'form-container'}>

            <form onSubmit={onSubmit}>

              <IonLabel class={'item-label'} position='stacked'>{T('NAME')}</IonLabel>
              <div className={'input-item-container'}>
                <IonInput
                  value={values.name}
                  class={'input-container'}
                  onIonChange={onChange('name')}

                />
              </div>
              <IonLabel class={'item-label'} position='stacked'>{T('EMAIL')}</IonLabel>
              <div className={'input-item-container'}>

                <IonInput

                  class={'input-container'}
                  value={values.email}
                  onIonChange={onChange('email')}

                />
              </div>
              <IonLabel class={'item-label'} position='stacked'>{T('PASSWORD')}</IonLabel>
              <div className={'input-item-container'}>
                <IonInput
                  type={'password'}
                  class={'input-container'}

                  minlength={6}
                  value={values.password}
                  onIonChange={onChange('password')}
                />
              </div>
              <IonButton shape='round' fill='solid' expand={'full'} type={'submit'}>{T('SIGNUP')}</IonButton>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};


const REGISTER_USER = gql`
  mutation signup(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password

    )
  }
`;

export default Register;
