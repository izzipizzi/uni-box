import React, { useContext, useEffect } from 'react';
import { Canvas3D } from '../../components/Canvas3D/Canvas3D';
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import { checkmarkSharp, closeSharp } from 'ionicons/icons';
import { AuthContext } from '../../context/auth';
import { useMutation } from '@apollo/client';
import { DECLINE_BOX, VALIDATE_BOX } from './mutation';
import { UIContext } from '../../context/ui-context';
import { BoxContext } from '../../context/box';
import { NavContext } from '../../context/nav-context';
import { defaultBox } from '../../constatnts';


export const ViewBox = () => {

  const auth = useContext(AuthContext);
  const boxContext = useContext(BoxContext);
  const ui = useContext(UIContext);
  const nav = useContext(NavContext);

  const [validateBox] = useMutation(VALIDATE_BOX, {
    update(_, result) {
      const data = result.data.validateBox;
      if (data.error) {
        ui.setError({ state: true, msg: data.error });
      } else {
        ui.setSuccess({ state: true, msg: data });
      }
    },
    onError(err) {
      ui.setError({ state: true, msg: err.graphQLErrors[0].extensions.exception.errors });
    },
    variables: {
      boxId: boxContext.box._id
    }

  });
  const [declineBox] = useMutation(DECLINE_BOX, {
    update(_, result) {
      const data = result.data.declineBox;
      if (data.error) {
        ui.setError({ state: true, msg: data.error });
      } else {
        ui.setSuccess({ state: true, msg: data });
      }
    },
    onError(err) {
      ui.setError({ state: true, msg: err.graphQLErrors[0].extensions.exception.errors });
    },
    variables: {
      boxId: boxContext.box._id
    }

  });


useEffect(()=>{
  ui.setMakeSnapshot(false)
},[ui.makeSnapshot])

  const ValidateBox = async () => {
    await validateBox();
    nav.toAdmin(true)

  };
  const DeclineBox = async () => {

    await declineBox();
    nav.toAdmin(true)


  };

  return (
    <IonPage>
      <IonContent >
      <Canvas3D>
        {(auth.user && auth.user.role === 'ADMIN' && boxContext.box._id !==defaultBox._id ) &&
        (
          <IonFab horizontal='end' vertical='center' slot='fixed'>
            <IonFabButton onClick={ValidateBox} color='primary'>
              <IonIcon icon={checkmarkSharp} />
            </IonFabButton>
            <IonFabButton onClick={DeclineBox} color='danger'>
              <IonIcon icon={closeSharp} />
            </IonFabButton>
          </IonFab>
        )}
      </Canvas3D>
      </IonContent>
    </IonPage>
  );
};
