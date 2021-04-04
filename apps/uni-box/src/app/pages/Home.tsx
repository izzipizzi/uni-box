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
  IonRow,
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Header from "../components/header/Header";
import {BoxContext} from "../context/box";

const Home: React.FC = ({user}:any) => {

  const boxContext = useContext(BoxContext)
  useEffect(()=>{
    console.log(user)
  },[user])
  return (
    <IonPage>
      {/*<Header user={user}/>*/}
      <IonHeader>
        <IonToolbar/>
      </IonHeader>
      <IonContent >
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>

        </IonHeader>
        <img src={boxContext.box.previewImg}/>
        {/*<ExploreContainer name="Tab 2 page" />*/}
      </IonContent>
    </IonPage>
  );
};

export default Home;
