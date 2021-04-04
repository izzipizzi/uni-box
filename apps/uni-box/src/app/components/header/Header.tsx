import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react';
import {ellipsisVerticalOutline} from "ionicons/icons";
import {Redirect, useHistory} from "react-router-dom";
import {userLogout} from "../../service/auth.service";
import { AuthContext } from '../../context/auth';


const Header = (props) => {

  const context = useContext(AuthContext);

  const [showLoading, setShowLoading] = useState(false);
  const [popoverState, setShowPopover] = useState({showPopover: false, event: undefined});

  const [loading, setLoading] = useState(true)
  const history = useHistory()


  return (
    <IonHeader>

      <IonToolbar>
        <IonButtons slot="start">
          <IonButton onClick={
            (e: any) => {
              e.persist();
              setShowPopover({showPopover: true, event: e})
            }}>
            <IonIcon color='primary' icon={ellipsisVerticalOutline}/>
          </IonButton>
        </IonButtons>
        <IonTitle>
          {context?.user ? context?.user?.name : null} Welcome to UniBox
        </IonTitle>
      </IonToolbar>

      <IonPopover
        cssClass='my-custom-class'
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={() => setShowPopover({showPopover: false, event: undefined})}
      >
        <IonList>
          <IonItem button onClick={() => {
          }}>
            <IonLabel>
              щось там
            </IonLabel>
          </IonItem>
          <IonItem button onClick={() => {
          }}>
            <IonLabel>
              дізнтися більше
            </IonLabel>
          </IonItem>
          {
            !context?.user ? null : (<IonItem button  onClick={()=>{
              context.logout()
              setShowPopover({showPopover: false, event: undefined})
              history.push('/auth')
            }}>
              <IonLabel color={'danger'}>
                Вийти
              </IonLabel>
            </IonItem>)
          }

        </IonList>
      </IonPopover>
    </IonHeader>
  )
}

export default Header
