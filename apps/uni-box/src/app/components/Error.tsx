import { IonToast } from '@ionic/react';
import React, { useContext } from 'react';
import { UIContext } from '../context/ui-context';
import { T } from 'react-translator-component';

export const ErrorToast = () => {

  const ui = useContext(UIContext);
  return (
    <IonToast
      isOpen={ui.error.state}
      onDidDismiss={() => ui.setError({ state: false, msg: '' })}
      message={T(ui.error.msg)}
      color={'danger'}
      duration={2000}
    />
  );
};
