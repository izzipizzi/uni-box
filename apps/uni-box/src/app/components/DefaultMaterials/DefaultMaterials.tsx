import { IonAvatar, IonCard, IonRow } from '@ionic/react';
import React, { useContext, useEffect } from 'react';
import { MaterialContext } from '../../context/material-context';
import { BoxContext } from '../../context/box';
import { useQuery } from '@apollo/client';
import { GET_MATERIALS } from '../../pages/Create/query';
import { API } from '../../constatnts';
import { BoxMode } from '../../enums/BoxMode';
import { UIContext } from '../../context/ui-context';
import ReactTooltip from "react-tooltip";
import { T } from 'react-translator-component';


export const DefaultMaterials = (props) =>{

  const materialContext =  useContext(MaterialContext)
  const boxContext =  useContext(BoxContext)
  const ui =  useContext(UIContext)


  const defaultMaterialRes = useQuery(GET_MATERIALS);
  useEffect(() => {
    if (defaultMaterialRes.loading){

    } else {
      if (!defaultMaterialRes.data) {
        ui.setError({state:true,msg:'Сталась помилка. Попробуйте заново'})
      } else {
        const tempMaterials = JSON.parse(JSON.stringify(defaultMaterialRes?.data?.getMaterials))

        tempMaterials.forEach(material => {
          material.texture = `${API}/photo/${material?.texture}`
        })
        materialContext.setDefaultMaterials(tempMaterials)
        if (ui.boxMode === BoxMode.CREATE) {boxContext.setBox({...boxContext.box, material: tempMaterials[0]})}
      }
    }
  }, [defaultMaterialRes.loading])

  return (
    <IonRow className={'defaultMaterials'}>
      {materialContext.defaultMaterials.map(material => {
        return (
          <IonAvatar data-tip data-for={material._id} className={'materials-card'} onClick={() => {
            boxContext.setBox({...boxContext.box, material, loading: false})
          }} key={material?._id}>
              <img alt={material?.name} src={material.texture}/>
            <ReactTooltip id={material?._id} place="bottom" effect="solid">
              {material?.name} - {material.price}{T('UAH')}
            </ReactTooltip>
          </IonAvatar>)
      })}
    </IonRow>
  )
}
