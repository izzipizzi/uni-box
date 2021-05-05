import {
  IonAvatar,
  IonButton,
  IonInput,
  IonLabel,
  IonModal,
  IonToggle,
  useIonViewDidEnter,
  useIonViewWillEnter
} from '@ionic/react';
import React, { useContext } from 'react';
import { UIContext } from '../../context/ui-context';
import { BoxContext } from '../../context/box';
import { AuthContext } from '../../context/auth';
import { useSaveBox, useUpdateBox } from '../../service/api.action';
import { BoxMode } from '../../enums/BoxMode';
import { NavContext } from '../../context/nav-context';
import { defaultBox } from '../../constatnts';

export const BoxSaveModal = () => {

  const ui = useContext(UIContext);
  const nav = useContext(NavContext);
  const boxContext = useContext(BoxContext);
  const loginContext = useContext(AuthContext);

  const [saveBox] = useSaveBox(boxContext.box, loginContext.user._id);
  const [updateBox] = useUpdateBox(boxContext.box, loginContext.user._id);


  const handleChange = name => event => {

    if (name === 'public') {
      boxContext.setBox({
        ...boxContext.box,
        [name]: event.detail.checked
      });
    } else {
      boxContext.setBox({
        ...boxContext.box,
        [name]: event.detail.value
      });
    }

  };
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

    return (
    <IonModal
      swipeToClose={true}
      onDidDismiss={() => {
        ui.setShowBoxSaveModal(false);
      }} isOpen={ui.isBoxSaveModal} cssClass='box-save-modal'>
      <div className={'box-info-container'}>
        <div className={'items-list'}>
          <IonLabel  class={'item-label'} position='stacked'>Назва коробки</IonLabel>
          <div className={'input-item-container'}>
            <IonInput
              class={'input-container'}
              value={boxContext.box.name}
              onIonChange={handleChange('name')} />
          </div>

          <div className={'list-item'}>
            <IonLabel class={'item-label'}>Ширина - </IonLabel>
            <IonLabel class={'item-label'}>{boxContext.box.width} мм</IonLabel>
          </div>
          <div className={'list-item'}>
            <IonLabel class={'item-label'}>Висота - </IonLabel>
            <IonLabel class={'item-label'}>{boxContext.box.height} мм</IonLabel>
          </div>
          <div className={'list-item'}>
            <IonLabel class={'item-label'}>Довжина - </IonLabel>
            <IonLabel class={'item-label'}>{boxContext.box.length} мм</IonLabel>
          </div>

          <div className={'list-item'}>

            <IonLabel class={'item-label'}>Матеріал -  </IonLabel>
            <IonLabel class={'item-label'}> {boxContext.box.material.name} {boxContext.box.material.price} грн </IonLabel>
            <IonAvatar className={'box-save-img'}>
              <img src={boxContext.box.material.texture} />
            </IonAvatar>
          </div>
          <div className={'list-item'}>
            <IonLabel class={'item-label'}>
              Доступна всім
            </IonLabel>
            <IonToggle checked={boxContext.box.public} onIonChange={handleChange('public')} />
          </div>
          <div className={'list-item'}>
            <IonLabel class={'item-label'}>Ціна -  </IonLabel>
            <IonLabel class={'item-label'}>{boxContext.box.price} грн</IonLabel>
          </div>
        </div>
      </div>
      {ui.boxMode === BoxMode.CREATE && <IonButton onClick={onSave}>Зберегти</IonButton>}
      {ui.boxMode === BoxMode.EDIT && <IonButton onClick={onUpdate}>Обновити</IonButton>}
    </IonModal>
  );
};
