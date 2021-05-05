import { IonButton, IonInput, IonItem, IonLabel, IonModal, IonRow } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../context/auth';
import { useSaveMaterial } from '../../../service/api.action';
import { UIContext } from '../../../context/ui-context';


export const AddMaterial = () => {

  const { user } = useContext(AuthContext);
  const ui = useContext(UIContext);


  const [textures, setTextures] = useState({
    user: user._id,
    name: '',
    texture: {},
    price: 0,
  });
  const handleChange = name => event => {
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

  const [saveMaterial] = useSaveMaterial(textures);
  const SaveMaterial = async (e) => {
    e.preventDefault();
    if (!textures.name || !textures.texture) {
      ui.setError({ state: true, msg: 'ALL_FIELDS_REQUIRE' });
    } else {
      await saveMaterial();
    }
  };
  return (
    <IonRow>
      <div className={'form-container'}>

      <form>
        <IonLabel class={'item-label'} position='stacked'>Назва матеріалу</IonLabel>
        <div className={'input-item-container'}>
          <IonInput
            class={'input-container'}
            type={'text'} value={textures.name} onIonChange={handleTextChange('name')} />
        </div>
        <IonLabel class={'item-label'} position='stacked'>Ціна матеріалу</IonLabel>
        <div className={'input-item-container'}>
          <IonInput
            class={'input-container'}
            type={'text'} value={textures.price} onIonChange={handleTextChange('price')} />
        </div>
        <label htmlFor={'input-file'} className={'item-label input-file-label'} >
          Виберіть файл
        </label>
        <input type={'file'} onChange={handleChange('texture')} accept={'file'} id={'input-file'}
               className={'input-file admin-input'} />


        <IonButton className={'admin-input'} expand={'full'} shape='round' fill='solid' onClick={saveMaterial}>Send</IonButton>
      </form>
        </div>
    </IonRow>
  );
};
