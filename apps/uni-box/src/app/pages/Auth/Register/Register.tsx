import {IonButton, IonInput, IonItem, IonLabel} from '@ionic/react'
import React, {useState} from "react"
import {gql} from "@apollo/client";
import {useForm} from "../../../utils/hooks";
import {useMutation} from "@apollo/react-hooks";
import {useHistory} from "react-router-dom";


const Register = (props) => {

  const history = useHistory()

  const [errors, setErrors] = useState({});

  const {onChange, onSubmit, values} = useForm(registerUser, {
    name: '',
    email: '',
    password: ''
  });


  const [addUser, {loading}] = useMutation(REGISTER_USER, {
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
    <div>
      <form onSubmit={onSubmit}>
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            value={values.name}
            onIonChange={onChange('name')}

          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            value={values.email}
            onIonChange={onChange('email')}

          />
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Password</IonLabel>
          <IonInput
            value={values.password}
            onIonChange={onChange('password')}
          />
        </IonItem>
        <IonButton shape="round" fill="outline" type={'submit'}>Увійти</IonButton>

      </form>
    </div>
  )
}


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

export default Register
