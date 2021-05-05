import { IonAvatar, IonBadge } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API, API_PHOTOS } from '../constatnts';
import './BoxCard.css';
import { BoxContext } from '../context/box';
import { UIContext } from '../context/ui-context';
import { BoxMode } from '../enums/BoxMode';

const BoxCard = ({ box }) => {

  const boxContext = useContext(BoxContext);
  const ui = useContext(UIContext);
  const [localBox, setLocalBox] = useState(box);

  useEffect(() => {
    const tempBox = JSON.parse(JSON.stringify(box));
    tempBox.material.texture = `${API}/photo/${box.material?.texture}`;
    setLocalBox(tempBox);

  }, [box]);
  return (
    <Link onClick={async () => {
      boxContext.setBox(localBox);
      await ui.setBoxMode(BoxMode.EDIT);
      console.log(ui.boxMode);
    }} to={'/edit'} className={'box-card'}>
      <IonAvatar className={'box-preview'}>
        <img src={API_PHOTOS + box.previewImg} alt={box.name} />
      </IonAvatar>
      <div className={'card-header'}>
        <div className={'card-title'}>{box.name}</div>
      <IonBadge>{box.validated && 'valid'}</IonBadge>
      <IonBadge color={'danger'}>{box.declined && 'declined'}</IonBadge>
      <IonBadge>{box.public && 'public'}</IonBadge>
      <IonBadge>{box.price}</IonBadge>
      </div>
    </Link>
  );
};
export default BoxCard;
