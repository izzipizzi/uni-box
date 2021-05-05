import { IonAvatar, IonIcon, IonRow } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import { MaterialContext } from '../../context/material-context';
import { BoxContext } from '../../context/box';
import { UIContext } from '../../context/ui-context';
import { useQuery } from '@apollo/client';
import { GET_MATERIALS_BY_USER } from '../../pages/Create/query';
import { API } from '../../constatnts';
import { AuthContext } from '../../context/auth';
import { addCircleOutline } from 'ionicons/icons';


export const UserMaterials = (props) => {

  const materialContext = useContext(MaterialContext);
  const boxContext = useContext(BoxContext);
  const ui = useContext(UIContext);
  const loginContext = useContext(AuthContext);

  const userMaterialRes = useQuery(GET_MATERIALS_BY_USER, {
    variables: { id: loginContext.user._id }
  });
  useEffect(() => {
    if (userMaterialRes.loading) {
    } else {
      if (!userMaterialRes.data) {
        ui.setError({ state: true, msg: 'Сталась помилка. Попробуйте заново' });
      } else {
        const tempMaterials = JSON.parse(JSON.stringify(userMaterialRes?.data?.getAllMaterialsByUser));

        tempMaterials.forEach(material => {
          material.texture = `${API}/photo/${material?.texture}`;
        });
        materialContext.setUserMaterials(tempMaterials);
      }
    }
  }, [userMaterialRes.loading]);

  return (
    <IonRow className={'userMaterials'}>
      {materialContext.userMaterials.map(material => {
        return (
          <IonAvatar className={'materials-card'} onClick={() => {
            boxContext.setBox({ ...boxContext.box, material, loading: false });
          }} key={material?._id}>
            <img alt={material?.name} src={material.texture} />
          </IonAvatar>);
      })}

      <IonAvatar className={'materials-card materials-card-add'} onClick={() => {
        ui.setShowMaterialSaveModal(true);
      }}>
        <IonIcon className={'add_icon'} icon={addCircleOutline}></IonIcon>
      </IonAvatar>
    </IonRow>
  );
};
