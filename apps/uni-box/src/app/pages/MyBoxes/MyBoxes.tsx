import React, { useContext, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonRefresher,
  IonRefresherContent,
  IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import BoxCard from '../../components/BoxCard';
import { useLazyQuery, useQuery } from '@apollo/client';
import { AuthContext } from '../../context/auth';
import { GET_BOXES_BY_USER } from './query';
import { BoxContext } from '../../context/box';
import './MyBoxes.css';
import { NavContext } from '../../context/nav-context';
import { UIContext } from '../../context/ui-context';
import { BoxMode } from '../../enums/BoxMode';
import { chevronDownCircleOutline } from 'ionicons/icons';


const MyBoxes: React.FC = () => {

  const loginContext = useContext(AuthContext);
  const boxContext = useContext(BoxContext);
  const nav = useContext(NavContext);
  const ui = useContext(UIContext);

  // const userBoxesRes = useQuery(GET_BOXES_BY_USER, {
  //   variables: { userId: loginContext.user._id }
  // });

  const [
    getBoxes,
    { loading, data }
  ] = useLazyQuery(GET_BOXES_BY_USER,{
    variables: { userId: loginContext.user._id }

  });

//
useEffect( ()=>{
  // if (!loading){
     getBoxes()
  // }
  if ( data && data.getBoxesByUser) {
    boxContext.setBoxes(data?.getBoxesByUser);
  }

},[loading,data])

  const doRefresh= (event: CustomEvent<RefresherEventDetail>)=> {
       getBoxes()
      boxContext.setBoxes(data.getBoxesByUser)
    event.detail.complete();
  }

  useIonViewDidEnter( async () => {
    nav.toMyBoxes(false)
    ui.setBoxMode(BoxMode.CREATE)


  });

  return (
    <IonPage>
      {/*<IonContent>*/}
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
            pullingIcon={chevronDownCircleOutline}
            pullingText="Pull to refresh"
            refreshingSpinner="circles"
            refreshingText="Refreshing...">
          </IonRefresherContent>
        </IonRefresher>
      {/*</IonContent>*/}
        <div className={'my-boxes-container'}>
          {(boxContext.boxes || data) && boxContext.boxes.map(box => {
            return (<BoxCard key={box._id} box={box} />);
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MyBoxes;
