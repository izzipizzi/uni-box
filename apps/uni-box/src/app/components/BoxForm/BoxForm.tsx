import { IonButton, IonCol, IonLabel, IonRange, IonRow } from '@ionic/react';
import React, { useContext, useState } from 'react';
import { BoxContext } from '../../context/box';
import { UIContext } from '../../context/ui-context';
import './BoxForm.css';
import { CirclePicker } from 'react-color';
import { BoxSaveModal } from '../modal/BoxSaveModal';
import { defaultBox } from '../../constatnts';
import { T } from 'react-translator-component';


export const BoxForm = () => {
  const boxContext = useContext(BoxContext);
  const ui = useContext(UIContext);

  const [errors, setErrors] = useState({
    isError: false,
    errorMsg: ''
  });

  const  boxPrice = () =>{
    return ((boxContext.box.material?.price * boxContext.box.width * boxContext.box.height * boxContext.box.length * defaultBox.defaultPrice) / 1000000)
  }

  const handleChange = name => event => {
    boxContext.setBox({
      ...boxContext.box,
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
  return (
    <div className={'form-wrapper'}>
      <form>
        <IonLabel  className={'item-label'} position='stacked'>{T('WIDTH')} {boxContext.box.width}{T('MM')}</IonLabel>
        <div className={'form-item-container'}>
          <IonRange value={boxContext.box.width} snaps={true} step={10} pin={true} min={50} max={500}
                    color='secondary'
                    onIonChange={handleChangeSize('width')}>
            <IonLabel slot='start'>50{T('MM')}</IonLabel>
            <IonLabel slot='end'>500{T('MM')}</IonLabel>
          </IonRange>
        </div>
        <IonLabel className={'item-label'} position='stacked'>{T('HEIGHT')} {boxContext.box.height}{T('MM')}</IonLabel>
        <div className={'form-item-container'}>
          <IonRange value={boxContext.box.height} snaps={true} step={10} pin={true} min={50} max={500}
                    color='secondary'
                    onIonChange={handleChangeSize('height')}>
            <IonLabel slot='start'>50{T('MM')}</IonLabel>
            <IonLabel slot='end'>500{T('MM')}</IonLabel>
          </IonRange>
        </div>
        <IonLabel className={'item-label'} position='stacked'>{T('LENGTH')} {boxContext.box.length}{T('MM')}</IonLabel>
        <div className={'form-item-container'}>
          <IonRange value={boxContext.box.length} snaps={true} step={10} pin={true} min={50} max={500}
                    color='secondary'
                    onIonChange={handleChangeSize('length')}>
            <IonLabel slot='start'>50{T('MM')}</IonLabel>
            <IonLabel slot='end'>500{T('MM')}</IonLabel>
          </IonRange>
        </div>
        <IonLabel className={'item-label'} position='stacked'>{T('TEXTURE_ROTATION')}</IonLabel>
        <div className={'form-item-container'}>
          <IonRange value={boxContext.box.textureRotation} snaps={true} step={10} pin={true} min={0}
                    max={Math.round(2 / Math.PI * 1000 - 7)}
                    color='secondary'
                    onIonChange={handleChangeSize('textureRotation')}>
            <IonLabel slot='start'>50{T('MM')}</IonLabel>
            <IonLabel slot='end'>500{T('MM')}</IonLabel>
          </IonRange>
        </div>
            <IonLabel className={'item-label'} position='stacked'>{T('TEXTURE_SCALE')} (X) {boxContext.box.textureScaleX}</IonLabel>
            <div className={'form-item-container'}>
              <IonRange value={boxContext.box.textureScaleX} snaps={true} step={10} pin={true} min={50}
                        max={5000}
                        color='secondary'
                        onIonChange={handleChangeSize('textureScaleX')}>
                <IonLabel slot='start'>50{T('MM')}</IonLabel>
                <IonLabel slot='end'>500{T('MM')}</IonLabel>
              </IonRange>
            </div>
            <IonLabel className={'item-label'} position='stacked'>{T('TEXTURE_SCALE')} (Y) {boxContext.box.textureScaleY}</IonLabel>
            <div className={'form-item-container'}>
              <IonRange value={boxContext.box.textureScaleY} snaps={true} step={10} pin={true} min={50}
                        max={5000}
                        color='secondary'
                        onIonChange={handleChangeSize('textureScaleY')}>
                <IonLabel slot='start'>50{T('MM')}</IonLabel>
                <IonLabel slot='end'>500{T('MM')}</IonLabel>
              </IonRange>
            </div>
          <IonLabel className={'item-label'} position='stacked'>{T('TEXTURE_SHIFT')} (X) {boxContext.box.textureOffsetX}</IonLabel>
          <div className={'form-item-container'}>
            <IonRange value={boxContext.box.textureOffsetX} snaps={true} step={10} pin={true} min={50}
                      max={5000}
                      color='secondary'
                      onIonChange={handleChangeSize('textureOffsetX')}>
              <IonLabel slot='start'>50{T('MM')}</IonLabel>
              <IonLabel slot='end'>500{T('MM')}</IonLabel>
            </IonRange>
          </div>
          <IonLabel className={'item-label'} position='stacked'>{T('TEXTURE_SHIFT')} (Y) {boxContext.box.textureOffsetY}</IonLabel>
          <div className={'form-item-container'}>
            <IonRange value={boxContext.box.textureOffsetY} snaps={true} step={10} pin={true} min={50}
                      max={5000}
                      color='secondary'
                      onIonChange={handleChangeSize('textureOffsetY')}>
              <IonLabel slot='start'>50{T('MM')}</IonLabel>
              <IonLabel slot='end'>500{T('MM')}</IonLabel>
            </IonRange>
          </div>
          <IonLabel className={'item-label'} position='stacked'>{T('TEXTURE_COLOR')}</IonLabel>
        <IonRow
          className={'color-container'}>

          <CirclePicker
            color={boxContext.box.color}
            onChangeComplete={handleChangeComplete}
          />
        </IonRow>
        <IonRow className={'buttons-container'}>

          <IonButton shape='round' fill='solid' class={'btn-full'} onClick={() => {
            boxContext.setBox({ ...boxContext.box, color: '' });
          }}
          >{T('WITHOUT_COLOR')}
          </IonButton>
          <IonButton shape='round' fill='outline' class={'btn-full'} onClick={() => {
            ui.setMakeSnapshot(!ui.makeSnapshot);
            ui.setShowBoxSaveModal(true);
            boxContext.setBox({...boxContext.box,price:boxPrice()})
          }}>{T('SAVE')}</IonButton>
        </IonRow>
      </form>
      {ui.isBoxSaveModal && <BoxSaveModal />}
    </div>
  );
};
