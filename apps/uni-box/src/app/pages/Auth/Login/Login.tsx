import {IonButton, IonInput, IonItem, IonLabel, IonToast} from '@ionic/react'
import React, {useContext, useState} from "react"
import {useHistory} from "react-router-dom";
import gql from "graphql-tag";
import {useForm} from "../../../utils/hooks";
import {AuthContext} from "../../../context/auth";
import { useMutation } from '@apollo/client';

const Login = (props) => {
  const history = useHistory()
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({
    isError: false,
    errorMsg: ''
  });

  const {onChange, onSubmit, values} = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser, {loading}] = useMutation(LOGIN_USER, {
    update(_, result) {
      console.log(result)
      const data = result.data.login
      if (data.error) {
        setErrors({isError: true, errorMsg: data.error})
      } else {
        context.login(data);
        history.push('/');
                history.go(0)

      }
    },
    onError(err) {
      console.log(err)
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  function loginUserCallback() {
    if (!values.email || !values.password) {
      setErrors({isError: true, errorMsg: 'ALL_FIELDS_REQUIRED'})
    } else {
      loginUser();
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={values.email}
            onIonChange={onChange('email')}/>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            value={values.password}
            onIonChange={onChange('password')}/>
        </IonItem>
        <IonButton shape="round" fill="outline" type={'submit'}>Увійти</IonButton>
      </form>

      <IonToast
        isOpen={errors.isError}
        onDidDismiss={() => setErrors({isError: false, errorMsg: ''})}
        message={errors.errorMsg}
        color={'danger'}
        duration={2000}
      />

    </div>

  )
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token,
      error,
      user{
        _id
        name
        role,
        email
      }
    }
  }
`;

export default Login
