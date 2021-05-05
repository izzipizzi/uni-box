import React, { useState } from 'react';
import { IonContent, IonGrid, IonPage, IonSegment, IonSegmentButton, IonToolbar } from '@ionic/react';
import './Admin.css';
import { AddMaterial } from './AddMaterial/AddMaterial';
import { ModerateBoxes } from './ModerateBoxes/ModerateBoxes';
import { AdminBoxProvider } from '../../context/admin-box-context';

const Admin: React.FC = (props: any) => {

  const [segment, setSegment] = useState('add_material');

  return (
      <IonPage>
        <IonContent>
          <IonToolbar>
            <IonSegment value={segment} onIonChange={(e) => {
              setSegment(e.detail.value);
            }}>
              <IonSegmentButton value='add_material'>
                Добавити матеріал
              </IonSegmentButton>
              <IonSegmentButton value='moderate_boxes'>
                Модерація коробок
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
