import { IonButton, IonInput, IonLabel, IonModal } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { UIContext } from '../../context/ui-context';
import { BoxContext } from '../../context/box';
import { AuthContext } from '../../context/auth';
import { useSaveBox, useUpdateBox } from '../../service/api.action';
import { NavContext } from '../../context/nav-context';
import axios from 'axios';
import { API } from '../../constatnts';
import { MaterialContext } from '../../context/material-context';

export const MaterialSaveModal = () => {

  const ui = useContext(UIContext);
  const nav = useContext(NavContext);
  const boxContext = useContext(BoxContext);
  const materialContext = useContext(MaterialContext);
  const loginContext = useContext(AuthContext);


  const [saveBox] = useSaveBox(boxContext.box, loginContext.user._id);
  const [updateBox] = useUpdateBox(boxContext.box, loginContext.user._id);


  const onSave = async (e) => {
    e.preventDefault();
    if (!boxContext.box.name) {
      ui.setError({ state: true, msg: 'NAME_REQUIRED' });
    } else {
      await saveBox();
      ui.setShowBoxSaveModal(false);
      nav.toMyBoxes(true);
    }
  };
  const onUpdate = async (e) => {
    e.preventDefault();
    if (!boxContext.box.name) {
      ui.setError({ state: true, msg: 'NAME_REQUIRED' });
    } else {
      await updateBox();
      ui.setShowBoxSaveModal(false);
      nav.toMyBoxes(true);
    }
  };

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

  return (
    <IonModal
      onDidDismiss={() => ui.setShowMaterialSaveModal(false)}
      swipeToClose={true}
      isOpen={ui.isMaterialSaveModal} cssClass='material-modal'>

      <IonLabel class={'item-label'} position='stacked'>Назва матеріалу</IonLabel>
      <div className={'input-item-container'}>
        <IonInput
          class={'input-container'}
          type={'text'} value={textures.name} onIonChange={handleTextChange('name')} />
      </div>
      <label htmlFor={'input-file'} className={'item-label input-file-label'} >
        Виберіть файл
      </label>
      <input type={'file'} onChange={handleTexturesChange('texture')} accept={'file'} id={'input-file'}
             className={'input-file'} />
      <IonButton
        shape='round' fill='solid'
        onClick={(e) => {
          e.preventDefault();
          const { name, user, texture } = textures;
          const formData = new FormData();
          formData.append('name', name);
          formData.append('user', user);
          formData.append('texture', texture as string);
          axios({
            method: 'post',
            url: `${API}/material/create`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
          })
            .then(function(response) {
              //handle success
              const tempMaterial = response.data.material;
              tempMaterial.texture = `${API}/photo/${tempMaterial?.texture}`;
              materialContext.setUserMaterials([...materialContext.userMaterials, tempMaterial]);
              ui.setSuccess({ state: true, msg: response.data.msg });
            })
            .catch(function(error) {
              ui.setError(error.response.data.error);
            });
          ui.setShowMaterialSaveModal(false);
        }}>Завантажити власний матеріал
      </IonButton>


    </IonModal>
  );
};
