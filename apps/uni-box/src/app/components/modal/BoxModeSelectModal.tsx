import React, { useContext } from 'react';
import { IonButton, IonGrid, IonModal, IonRow } from '@ionic/react';
import { UIContext } from '../../context/ui-context';
import { NavContext } from '../../context/nav-context';
import { BoxMode } from '../../enums/BoxMode';
import { T } from 'react-translator-component';


export const BoxModeSelectModal: React.FC = () => {
  const ui = useContext(UIContext);
  const nav = useContext(NavContext);

  return (
    <IonModal isOpen={ui.isModeModal}
              swipeToClose={true}
              onDidDismiss={() => ui.setShowModeModal(false)}
              cssClass='box-select-mode-modal'>
      <IonGrid>
        <IonRow>
          <p className={'modal-header'}>{T('GREETINGS')}</p>
        </IonRow>
        <IonRow>
          <IonButton shape='round' fill='outline' onClick={() => {
            ui.setBoxMode(BoxMode.CREATE);
            ui.setShowModeModal(false);
          }}>{T('CREATE_NEW_BOX')}</IonButton>
          <IonButton shape='round' fill='solid' onClick={() => nav.toMyBoxes(true)}>{T('SHOW_MY_BOXES')}</IonButton>

        </IonRow>
        <IonRow>

          <IonButton shape='round' fill='solid'
                     onClick={() => nav.toHome(true)}>{T('SHOW_RECOMMENDED_BOXES')}</IonButton>
        </IonRow>
      </IonGrid>

    </IonModal>
  );
};
