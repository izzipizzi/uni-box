import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPopover, IonRouterLink,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import {ellipsisVerticalOutline} from "ionicons/icons";
import {Redirect, useHistory} from "react-router-dom";
import { AuthContext } from '../../context/auth';
import {T,LanguageList} from 'react-translator-component'

const Header = (props) => {

  const context = useContext(AuthContext);

  const [showLoading, setShowLoading] = useState(false);
  const [popoverState, setShowPopover] = useState({showPopover: false, event: undefined});
  const [langPopoverState, setShowLangPopover] = useState({showPopover: false, event: undefined});

  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const closePopover = () =>{
    setShowPopover({showPopover: false, event: undefined})
  }
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
          {context?.user && context?.user?.name} &nbsp; {T('WELCOME')}
        </IonTitle>

      </IonToolbar>

      <IonPopover
        cssClass='my-custom-class'
        event={popoverState.event}
        isOpen={popoverState.showPopover}
        onDidDismiss={closePopover}
      >
        <IonList class={'menu'}>
          <IonItem  class={'menu-item'} button onClick={
            (e: any) => {
              e.persist();
              setShowLangPopover({ showPopover: true, event: e })
            }}>
            {T('LANGUAGE')}
          </IonItem>
          <IonItem onClick={closePopover} class={'menu-item'} button>
            <IonRouterLink className={'router-link'} routerLink={'gifts'}>
              {T('CHOOSE_GIFT')}
            </IonRouterLink>
          </IonItem>
          {!context?.user &&  <IonItem onClick={closePopover}  class={'menu-item'}>
            <IonRouterLink className={'router-link'} routerLink={'signup'}>
              {T('CREATE_ACCOUNT')}
            </IonRouterLink>
          </IonItem>}
          {
            !context?.user ? null : (<IonItem class={'menu-item'} button  onClick={()=>{
              context.logout()
              history.push('/auth')
              closePopover();
            }}>
              <IonLabel color={'danger'}>
                {T('LOGOUT')}
              </IonLabel>
            </IonItem>)
          }

        </IonList>
      </IonPopover>
      <IonPopover
        cssClass='my-custom-class'
        event={langPopoverState.event}
        isOpen={langPopoverState.showPopover}
        onDidDismiss={() => setShowLangPopover({showPopover: false, event: undefined})}
      >
        <LanguageList />
      </IonPopover>
    </IonHeader>
  )
}

export default Header
