import React, { useContext, useEffect, useState } from 'react';
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Edit.css';
import { useQuery } from '@apollo/client';
import { GET_MATERIALS, GET_MATERIALS_BY_USER } from './query';
import { API, defaultBox } from '../../constatnts';
import { AuthContext } from '../../context/auth';
import { BoxContext } from '../../context/box';
import axios from 'axios';
import { BoxModeSelectModal } from '../../components/modal/BoxModeSelectModal';
import { UIContext } from '../../context/ui-context';
import { Canvas3D } from '../../components/Canvas3D/Canvas3D';
import { BoxForm } from '../../components/BoxForm/BoxForm';
import { Redirect } from 'react-router-dom';
import { NavContext } from '../../context/nav-context';
import { BoxMode } from '../../enums/BoxMode';
import { DefaultMaterials } from '../../components/DefaultMaterials/DefaultMaterials';
import { UserMaterials } from '../../components/UserMaterials/UserMaterials';
import { MaterialSaveModal } from '../../components/modal/MaterialSaveModal';
import { T } from 'react-translator-component';


const Edit: React.FC = () => {
  const boxContext = useContext(BoxContext);
  const loginContext = useContext(AuthContext);
  const ui = useContext(UIContext);
  const nav = useContext(NavContext);

  useIonViewWillEnter(() => {
    ui.setShowModeModal(false);
  });

  return (
    <IonPage className={'edit-page'}>
      <MaterialSaveModal/>
      <IonContent>
          <IonGrid class={'ion-grid'}>
            <IonRow class={'ion-row'}>
              <IonCol class={'ion-col'}>
                <IonToolbar>
                  <IonSegment
                    color={'primary'}
                    scrollable={true}
                    className={'box-segment-container'}
                    mode="ios"
                    onIonChange={(e: any) => {
                    boxContext.setBox({ ...boxContext.box, model: e.detail.value });
                  }} value={boxContext.box.model}>
                    <IonSegmentButton className={'box-segment-button'} value='SQUARE'>
                      {T('SQUARE_BOX')}
                    </IonSegmentButton>
                    <IonSegmentButton className={'box-segment-button'} value='ROUNDED'>
                      {T('ROUNDED_BOX')}
                    </IonSegmentButton>
                  </IonSegment>
                </IonToolbar>
                <div className='form-wrapper'>
                  <DefaultMaterials />
                  <UserMaterials />
                </div>
                <BoxForm />
              </IonCol>
              <IonCol class={'ion-col canvas'}>
                <Canvas3D />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default Edit;

