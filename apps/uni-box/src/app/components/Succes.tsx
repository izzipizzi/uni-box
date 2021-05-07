import { IonToast } from '@ionic/react';
import React, { useContext } from 'react';
import { UIContext } from '../context/ui-context';
import { T } from 'react-translator-component';


export const SuccessToast = ()=>{

  const ui = useContext(UIContext)
  return(
    <IonToast
      isOpen={ui.success.state}
      onDidDismiss={() => ui.setSuccess({state:false,msg: ''})}
      message={T(ui.success.msg)}
      color={'success'}
      duration={2000}
    />
  )
}
