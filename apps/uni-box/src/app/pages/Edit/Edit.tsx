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


const Edit: React.FC = () => {
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
  const [textures, setTextures] = useState({
    user: loginContext.user._id,
    name: '',
    texture: {}
  });

  const handleChange = name => event => {
    boxContext.setBox({
      ...boxContext.box,
      [name]: event.detail.value
    });

  };

  const handleTexturesChange = name => event => {
    setTextures({
      ...textures,
      [name]: event.target.files[0]
    });
  };
  const handleTextChange = name => event => {
    setTextures({
      ...textures,
      [name]: event.detail.value
    });
  };

  const handleChangeComplete = (color) => {
    boxContext.setBox({ ...boxContext.box, color: color.hex });
  };
  const handleChangeSize = name => event => {
    boxContext.setBox({
      ...boxContext.box,
      [name]: event.detail.value as number
    });

  };
  const [defaultMaterials, setDefaultMaterials] = useState([]);
  const [userMaterials, setUserMaterials] = useState([]);

  const defaultMaterialRes = useQuery(GET_MATERIALS);
  const userMaterialRes = useQuery(GET_MATERIALS_BY_USER, {
    variables: { id: loginContext.user._id }
  });
  useEffect(() => {
    if (userMaterialRes.loading) {
    } else {
      if (!userMaterialRes.data) {
        loginContext.logout();
      } else {
        const tempMaterials = JSON.parse(JSON.stringify(userMaterialRes?.data?.getAllMaterialsByUser));

        tempMaterials.forEach(material => {
          material.texture = `${API}/photo/${material?.texture}`;
        });
        setUserMaterials(tempMaterials);
      }
    }
  }, [userMaterialRes.loading]);
  useEffect(() => {
    if (defaultMaterialRes.loading) {
    } else {
      if (!defaultMaterialRes.data) {
        loginContext.logout();
      } else {
        const tempMaterials = JSON.parse(JSON.stringify(defaultMaterialRes?.data?.getMaterials));

        tempMaterials.forEach(material => {
          material.texture = `${API}/photo/${material?.texture}`;
        });
        setDefaultMaterials(tempMaterials);
        if (ui.boxMode === BoxMode.CREATE) {
          boxContext.setBox({ ...boxContext.box, material: tempMaterials[0] });
        }
      }
    }
  }, [defaultMaterialRes.loading]);
  const [tempFile, setTempFile] = useState({});
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
                      Square Box
                    </IonSegmentButton>
                    <IonSegmentButton className={'box-segment-button'} value='ROUNDED'>
                      Rounded Box
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

