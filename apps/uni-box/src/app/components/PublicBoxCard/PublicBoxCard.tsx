import { IonAvatar, IonBadge } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './PublicBoxCard.css';
import { AdminBoxContext } from '../../context/admin-box-context';
import { API, API_PHOTOS } from '../../constatnts';
import { BoxContext } from '../../context/box';
import { T } from 'react-translator-component';


const PublicBoxCard = ({ box }) => {
  const boxContext = useContext(BoxContext);
  const [localBox, setLocalBox] = useState(box);

  useEffect(() => {
    const tempBox = JSON.parse(JSON.stringify(box));
    tempBox.material.texture = `${API}/photo/${box.material?.texture}`;
    setLocalBox(tempBox);

  }, [box]);
  return (
    <Link onClick={async () => {
      boxContext.setBox(localBox);
    }} to={'/view-box'} className={'box-card'}>
      <IonAvatar className={'box-preview'}>
        <img src={API_PHOTOS + box.previewImg} alt={box.name} />
      </IonAvatar>
      <div className={'card-header'}>
        <div className={'card-title'}>{box.name}</div>
      </div>
      <div className={'author-container'}>
        <span>{T('AUTHOR')}</span>
        <span>{box.user.name}</span>
      </div>
      <div className={'author-container'}>
        <span>{T('PRICE')}</span>
        <span>{box.price} {T('UAH')}</span>
      </div>
    </Link>
  );
};
export default PublicBoxCard;
