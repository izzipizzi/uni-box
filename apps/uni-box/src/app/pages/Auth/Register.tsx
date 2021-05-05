import { IonButton, IonContent, IonInput, IonLabel, IonPage } from '@ionic/react';
import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../../utils/hooks';

import { useHistory } from 'react-router-dom';


const Register = (props) => {

  const history = useHistory();

  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    name: '',
    email: '',
    password: ''
  });


  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function registerUser() {
    addUser();
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

              <IonLabel class={'item-label'} position='stacked'>Name</IonLabel>
              <div className={'input-item-container'}>
                <IonInput
                  value={values.name}
                  class={'input-container'}
                  onIonChange={onChange('name')}

                />
              </div>
              <IonLabel class={'item-label'} position='stacked'>Email</IonLabel>
              <div className={'input-item-container'}>

                <IonInput

                  class={'input-container'}
                  value={values.email}
                  onIonChange={onChange('email')}

                />
              </div>
              <IonLabel class={'item-label'} position='stacked'>Password</IonLabel>
              <div className={'input-item-container'}>
                <IonInput
                  type={'password'}
                  class={'input-container'}

                  minlength={6}
                  value={values.password}
                  onIonChange={onChange('password')}
                />
              </div>
              <IonButton shape='round' fill='solid' expand={'full'} type={'submit'}>Увійти</IonButton>
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
