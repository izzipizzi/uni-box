import React, {useContext, useEffect} from 'react';
import {
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonContent, IonGrid,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCardContent,
  IonCardSubtitle,
  IonList,
  IonItem,
  IonLabel,
  IonRow, IonRefresher, IonRefresherContent, IonButton, useIonViewDidEnter
} from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import './Home.css';
import Header from "../../components/header/Header";
import {BoxContext} from "../../context/box";
import { useLazyQuery } from '@apollo/client';
import { GET_PUBLIC_NO_VALIDATED_BOXES } from '../Admin/query';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';
import AdminBoxCard from '../../components/AdminBoxCard/AdminBoxCard';
import { GET_PUBLIC_VALIDATED_BOXES } from './query';
import { Canvas3D } from '../../components/Canvas3D/Canvas3D';
import PublicBoxCard from '../../components/PublicBoxCard/PublicBoxCard';
import { BoxMode } from '../../enums/BoxMode';
import { NavContext } from '../../context/nav-context';

const Home: React.FC = ({user}:any) => {

  const boxContext = useContext(BoxContext)
  const nav = useContext(NavContext)
  const [
    getPublicValidatedBoxes,
    { loading, data }
  ] = useLazyQuery(GET_PUBLIC_VALIDATED_BOXES);

//
  useEffect( ()=>{
    // if (!loading){
    getPublicValidatedBoxes()
    // }
    if ( data && data.getPublicValidatedBoxes) {
      boxContext.setPublicBoxes(data?.getPublicValidatedBoxes);
    }

  },[loading,data])

  const doRefresh= (event: CustomEvent<RefresherEventDetail>)=> {
    getPublicValidatedBoxes()
    boxContext.setPublicBoxes(data.getPublicValidatedBoxes)
    event.detail.complete();
  }


  useIonViewDidEnter( async () => {
    nav.toMyBoxes(false)
  });
  return (
    <IonPage>
      <IonContent >
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
          {(boxContext.publicBoxes || data) && boxContext.publicBoxes.map(box => {
            return (<PublicBoxCard key={box._id} box={box} />);
          })}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
