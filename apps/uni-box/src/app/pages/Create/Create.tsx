import React, { useContext, useState } from 'react';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';
import './Create.css';
import { defaultBox } from '../../constatnts';
import { AuthContext } from '../../context/auth';
import { BoxContext } from '../../context/box';
import { BoxModeSelectModal } from '../../components/modal/BoxModeSelectModal';
import { UIContext } from '../../context/ui-context';
import { Canvas3D } from '../../components/Canvas3D/Canvas3D';
import { BoxForm } from '../../components/BoxForm/BoxForm';
import { NavContext } from '../../context/nav-context';
import { DefaultMaterials } from '../../components/DefaultMaterials/DefaultMaterials';
import { UserMaterials } from '../../components/UserMaterials/UserMaterials';
import { MaterialSaveModal } from '../../components/modal/MaterialSaveModal';
import { T } from 'react-translator-component';


const Create: React.FC = () => {
  const boxContext = useContext(BoxContext);
  const loginContext = useContext(AuthContext);
  const ui = useContext(UIContext);
  const nav = useContext(NavContext);

  const [toggle, setToggle] = useState('square');
  const [showModal, setShowModal] = useState(false);
  const [showBoxModal, setShowBoxModal] = useState(false);

  const [error, setError] = useState({
    isError: false,
    errorMsg: ''
  });


  const handleChangeComplete = (color) => {
    boxContext.setBox({ ...boxContext.box, color: color.hex });
  };
  const handleChangeSize = name => event => {
    boxContext.setBox({
      ...boxContext.box,
      [name]: event.detail.value as number
    });

  };
   useIonViewWillEnter(() => {
    ui.setShowModeModal(true);
    boxContext.setBox(defaultBox);
  });

  return (
    // <>
    <IonPage className={'create-page'}>
      <BoxModeSelectModal />
      <MaterialSaveModal/>

      {!ui.isModeModal && (
        <IonContent>
          <IonGrid class={'ion-grid'}>
            <IonRow class={'ion-row'}>
              <IonCol class={'ion-col'}>


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
                    <IonSegmentButton  className={'box-segment-button'} value='ROUNDED'>
                      {T('ROUNDED_BOX')}
                    </IonSegmentButton>
                  </IonSegment>

                <IonRow>

                </IonRow>
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
      )}

    </IonPage>
  );
};

export default Create;

