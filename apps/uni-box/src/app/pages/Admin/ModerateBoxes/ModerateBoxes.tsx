import { IonRefresher, IonRefresherContent, IonRow } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../../context/auth';
import { NavContext } from '../../../context/nav-context';
import { UIContext } from '../../../context/ui-context';
import { useLazyQuery } from '@apollo/client';
import { RefresherEventDetail } from '@ionic/core';
import { GET_PUBLIC_NO_VALIDATED_BOXES } from '../query';
import { AdminBoxContext } from '../../../context/admin-box-context';
import { chevronDownCircleOutline } from 'ionicons/icons';
import AdminBoxCard from '../../../components/AdminBoxCard/AdminBoxCard';


export const ModerateBoxes = () => {

  const loginContext = useContext(AuthContext);
  const adminBoxContext = useContext(AdminBoxContext);
  const nav = useContext(NavContext);
  const ui = useContext(UIContext);

  const [
    getNoValidatedBoxes,
    { loading, data }
  ] = useLazyQuery(GET_PUBLIC_NO_VALIDATED_BOXES);

//
  useEffect(() => {
    // if (!loading){
    getNoValidatedBoxes();
    // }
    if (data && data.getPublicNoValidatedBoxes) {
      adminBoxContext.setNoValidatedBoxes(data?.getPublicNoValidatedBoxes);
    }

  }, [loading, data]);

  const doRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    getNoValidatedBoxes();
    adminBoxContext.setNoValidatedBoxes(data.getPublicNoValidatedBoxes);
    event.detail.complete();
  };


  return (
    <IonRow>
      <IonRefresher slot='fixed' onIonRefresh={doRefresh}>
        <IonRefresherContent
          pullingIcon={chevronDownCircleOutline}
          pullingText='Pull to refresh'
          refreshingSpinner='circles'
          refreshingText='Refreshing...'>
        </IonRefresherContent>
      </IonRefresher>
      {/*</IonContent>*/}
      <div className={'my-boxes-container'}>
        {(adminBoxContext.noValidatedBoxes || data) && adminBoxContext.noValidatedBoxes.map(box => {
          return (<AdminBoxCard key={box._id} box={box} />);
        })}
      </div>
    </IonRow>
  );
};
