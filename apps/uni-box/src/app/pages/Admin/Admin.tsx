import React, { useState } from 'react';
import { IonContent, IonGrid, IonPage, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import './Admin.css';
import { AddMaterial } from './AddMaterial/AddMaterial';
import { ModerateBoxes } from './ModerateBoxes/ModerateBoxes';
import { AdminBoxProvider } from '../../context/admin-box-context';
import { T } from 'react-translator-component';


const Admin: React.FC = (props: any) => {

  const [segment, setSegment] = useState('add_material');

  return (
      <IonPage>
        <IonContent>
          <IonToolbar>
            <IonSegment value={segment}
                        color={'primary'}
                        scrollable={true}
                        className={'box-segment-container'}
                        mode="ios"
                        onIonChange={(e) => {
              setSegment(e.detail.value);
            }}>
              <IonSegmentButton className={'box-segment-button'} value='add_material'>
                {T('ADD_MATERIAL')}
              </IonSegmentButton>
              <IonSegmentButton className={'box-segment-button'} value='moderate_boxes'>
                {T('MODERATE_BOXES')}
              </IonSegmentButton>
            </IonSegment>
          </IonToolbar>
          <IonGrid>
            {segment === 'add_material'
              ? (<AddMaterial />)
              : (<ModerateBoxes />)
            }
          </IonGrid>
        </IonContent>

      </IonPage>
  );
};

export default Admin;
