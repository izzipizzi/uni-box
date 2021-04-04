import React, {useEffect, useState} from 'react';
import {IonContent, IonHeader, IonPage, IonSegment, IonSegmentButton, IonToolbar,} from '@ionic/react';
import './Auth.css';
import Login from "./Login/Login";
import Register from "./Register/Register";
import {useHistory} from "react-router-dom";


const Auth: React.FC = (props: any) => {
  const history = useHistory()




  const [toggle, setToggle] = useState('login');

  return (
    <>
      <IonPage>
        {/*<Header user={props.user}/>*/}
        <IonHeader>
          <IonToolbar/>
        </IonHeader>
        <IonContent>
          <IonToolbar>
            <IonSegment onIonChange={(e: any) => {
              setToggle(e.detail.value)
            }} value={toggle}>
              <IonSegmentButton value="login">
                SignIn
              </IonSegmentButton>
              <IonSegmentButton value="signup">SignUp</IonSegmentButton>
            </IonSegment>
          </IonToolbar>
          {toggle == "login" ? (<Login/>) : (<Register/>)}
        </IonContent>
      </IonPage>
    </>
  );
}


export default Auth;
