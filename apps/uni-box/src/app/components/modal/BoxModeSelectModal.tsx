import React, { useContext } from 'react';
import { IonButton, IonGrid, IonModal, IonRow } from '@ionic/react';
import { UIContext } from '../../context/ui-context';
import { NavContext } from '../../context/nav-context';
import { BoxMode } from '../../enums/BoxMode';

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
          <p className={'modal-header'}>Вітаємо в конструкторі коробки</p>
        </IonRow>
        <IonRow>
          <IonButton shape='round' fill='outline' onClick={() => {
            ui.setBoxMode(BoxMode.CREATE);
            ui.setShowModeModal(false);
          }}>Створити нову коробку</IonButton>
          <IonButton shape='round' fill='solid' onClick={() => nav.toMyBoxes(true)}>Показати мої коробки</IonButton>

        </IonRow>
        <IonRow>

          <IonButton shape='round' fill='solid' onClick={() => nav.toHome(true)}>Показати рекомендовані
            коробки</IonButton>
        </IonRow>
      </IonGrid>

    </IonModal>
  );
};
