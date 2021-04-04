import React, {useContext, useState} from 'react';
import {
  IonButton,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow, IonToast,
  IonToolbar
} from '@ionic/react';
import './Admin.css';
import axios from 'axios';
import { API } from '../../constatnts';
import {AuthContext} from "../../context/auth";

const Admin: React.FC = (props: any) => {

  const {user} =useContext(AuthContext)

  const [textures, setTextures] = useState({
    user: user._id,
    name: '',
    texture: {}
  });
  const [error, setError] = useState('');
  const handleChange = name => event => {
    setTextures({
      ...textures,
      [name]: event.target.files[0]
    });

    // console.log(URL.revokeObjectURL(output.src))

  };
  const handleTextChange = name => event => {
    setTextures({
      ...textures,
      [name]: event.detail.value
    });

  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar />
      </IonHeader>

      <IonContent>
        <IonGrid>
          <IonRow>
            <form>
              <IonItem>
                <IonLabel position="floating">NAME</IonLabel>
                <IonInput type={'text'} value={textures.name} onIonChange={handleTextChange('name')} />
              </IonItem>
              <IonItem>
                <IonLabel>
                  TEXTURE
                </IonLabel>
                <input type={'file'} onChange={handleChange('texture')} />
              </IonItem>
              <IonItem>
                <IonButton onClick={(e) => {
                  console.log(textures);
                  e.preventDefault();
                  const { name, user, texture} = textures;
                  const formData = new FormData();
                  formData.append('name', name);
                  formData.append('user', user);
                  {/*@ts-ignore*/}
                  formData.append('texture', texture);
                  {/*@ts-ignore*/}

                  axios({
                    method: 'post',
                    url: `${API}/material/create`,
                    data: formData,
                    headers: { 'Content-Type': 'multipart/form-data' }
                  })
                    .then(function(response) {
                      //handle success
                      console.log(response);
                    })
                    .catch(function(error) {
                      //handle error
                      setError(error.response.data.error);

                      console.log();
                    });
                }}>Send</IonButton>
              </IonItem>
            </form>
          </IonRow>
        </IonGrid>
      </IonContent>

      <IonToast
        isOpen={error && true }
        onDidDismiss={() => setError('')}
        message={error}
        color={'danger'}
        duration={2000}
      />
    </IonPage>
  );
};

export default Admin;
