import React, {Suspense, useContext, useEffect, useState} from 'react';
import {CirclePicker} from 'react-color';
import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonRange,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from '@ionic/react';
import './Create.css';
import {Canvas} from "react-three-fiber";
import Square from '../../components/square/square'
import Rounded from '../../components/rounded/Rounded';
import Floor from '../../components/floor/Floor';
import {OrbitControls} from "@react-three/drei";
import {useQuery} from '@apollo/client';
import {GET_MATERIALS} from './query';
import {API} from '../../constatnts';
import {AuthContext} from "../../context/auth";
import {BoxContext} from "../../context/box";
import {BridgeProvider} from "../../context/bridge-context";
import axios from "axios";


const Create: React.FC = () => {
  const boxContext = useContext(BoxContext);
  const loginContext = useContext(AuthContext);
  const [toggle, setToggle] = useState('square');
  const [click, setClick] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [error, setError] = useState({
    isError: false,
    errorMsg: ''
  })
  const [textures, setTextures] = useState({
    user: loginContext.user._id,
    name: '',
    texture: {}
  });

  const handleChange = name => event => {
    boxContext.setBox({
      ...boxContext.box,
      [name]: event.detail.value
    })

  }

  const handleTexturesChange = name => event => {
    setTextures({
      ...textures,
      [name]: event.target.files[0]
    });
  };
  const handleTextChange = name => event => {
    setTextures({
      ...textures,
      [name]: event.detail.value
    });
  };

  const handleChangeComplete = (color) => {
    boxContext.setBox({...boxContext.box, color: color.hex});
  };
  const handleChangeSize = name => event => {
    boxContext.setBox({
      ...boxContext.box,
      [name]: event.detail.value as number
    })

  }
  const [materials, setMaterials] = useState([])

  const materialRes = useQuery(GET_MATERIALS);
  useEffect(() => {
    if (materialRes.loading) {
    } else {
      if (!materialRes.data) {
        loginContext.logout()
      } else {
        const tempMaterials = JSON.parse(JSON.stringify(materialRes?.data?.getMaterials))

        tempMaterials.forEach(material => {
          material.texture = `${API}/photo/${material?.texture}`
        })
        setMaterials(tempMaterials)
        boxContext.setBox({...boxContext.box, material: tempMaterials[0]})
      }
    }
  }, [materialRes.loading])
  const [tempFile, setTempFile] = useState({})
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar/>
      </IonHeader>
      <IonContent>
        <IonGrid class={'ion-grid'}>
          <IonRow class={'ion-row'}>
            <IonCol class={'ion-col'}>
              <IonToolbar>
                <IonSegment onIonChange={(e: any) => {
                  setToggle(e.detail.value)
                  boxContext.setBox({...boxContext.box, type: e.detail.value})
                }} value={toggle}>
                  <IonSegmentButton value="square">
                    Square Box
                  </IonSegmentButton>
                  <IonSegmentButton value="rounded">
                    Rounded Box
                  </IonSegmentButton>
                </IonSegment>
              </IonToolbar>
              <IonRow className={'materials'}>
                {materials.map(material => {
                  return (
                    <IonCard className={'materials-card'} onClick={() => {
                      boxContext.setBox({...boxContext.box, material, loading: false})
                    }} key={material?._id}>
                      {material?.name}
                      <IonAvatar>
                        <img alt={material?.name} src={material.texture}/>
                      </IonAvatar>
                    </IonCard>)
                })}
                <IonCard className={'materials-card-add'} onClick={() => {
                  setShowModal(!showModal)
                }}>
                  <IonAvatar>
                    <img src={'assets/icon/plus.png'}/>
                  </IonAvatar>
                </IonCard>
              </IonRow>

              <div>
                <form>
                  <IonItem>
                    <IonLabel position="floating">NAME</IonLabel>
                    <IonInput
                      value={boxContext.box.name}
                      onIonChange={handleChange('name')}/>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">WIDTH {boxContext.box.width}мм</IonLabel>
                    <IonRange value={boxContext.box.width} snaps={true} step={10} pin={true} min={50} max={500}
                              color="secondary"
                              onIonChange={handleChangeSize('width')}>
                      <IonLabel slot="start">50мм</IonLabel>
                      <IonLabel slot="end">500мм</IonLabel>
                    </IonRange>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">HEIGHT {boxContext.box.height}мм</IonLabel>
                    <IonRange value={boxContext.box.height} snaps={true} step={10} pin={true} min={50} max={500}
                              color="secondary"
                              onIonChange={handleChangeSize('height')}>
                      <IonLabel slot="start">50мм</IonLabel>
                      <IonLabel slot="end">500мм</IonLabel>
                    </IonRange>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">LENGTH {boxContext.box.length}мм</IonLabel>
                    <IonRange value={boxContext.box.length} snaps={true} step={10} pin={true} min={50} max={500}
                              color="secondary"
                              onIonChange={handleChangeSize('length')}>
                      <IonLabel slot="start">50мм</IonLabel>
                      <IonLabel slot="end">500мм</IonLabel>
                    </IonRange>
                  </IonItem>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">TEXTURE-X {boxContext.box.textureScaleX}</IonLabel>
                        <IonRange value={boxContext.box.textureScaleX} snaps={true} step={10} pin={true} min={50}
                                  max={5000}
                                  color="secondary"
                                  onIonChange={handleChangeSize('textureScaleX')}>
                          <IonLabel slot="start">50мм</IonLabel>
                          <IonLabel slot="end">500мм</IonLabel>
                        </IonRange>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">TEXTURE-Y {boxContext.box.textureScaleY}</IonLabel>
                        <IonRange value={boxContext.box.textureScaleY} snaps={true} step={10} pin={true} min={50}
                                  max={5000}
                                  color="secondary"
                                  onIonChange={handleChangeSize('textureScaleY')}>
                          <IonLabel slot="start">50мм</IonLabel>
                          <IonLabel slot="end">500мм</IonLabel>
                        </IonRange>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">TEXTURE-OFFSET-X {boxContext.box.textureOffsetX}</IonLabel>
                        <IonRange value={boxContext.box.textureOffsetX} snaps={true} step={10} pin={true} min={50}
                                  max={5000}
                                  color="secondary"
                                  onIonChange={handleChangeSize('textureOffsetX')}>
                          <IonLabel slot="start">50мм</IonLabel>
                          <IonLabel slot="end">500мм</IonLabel>
                        </IonRange>
                      </IonItem>
                    </IonCol>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">TEXTURE-OFFSET-Y {boxContext.box.textureOffsetY}</IonLabel>
                        <IonRange value={boxContext.box.textureOffsetY} snaps={true} step={10} pin={true} min={50}
                                  max={5000}
                                  color="secondary"
                                  onIonChange={handleChangeSize('textureOffsetY')}>
                          <IonLabel slot="start">50мм</IonLabel>
                          <IonLabel slot="end">500мм</IonLabel>
                        </IonRange>
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonButton onClick={() => {
                    boxContext.setBox({...boxContext.box, color: ''})
                  }}>No color</IonButton>
                  <CirclePicker
                    color={boxContext.box.color}
                    onChangeComplete={handleChangeComplete}
                  />
                  <IonButton shape="round" fill="outline" onClick={() => {
                    setClick(!click)
                    console.log(boxContext.box)
                  }}>Save</IonButton>
                </form>
              </div>
            </IonCol>
            <IonCol class={'ion-col canvas'}>
              <Canvas
                gl={{preserveDrawingBuffer: true}}
              >
                <BridgeProvider value={{...boxContext}}>
                  <Suspense fallback={null}>
                    <ambientLight intensity={4}/>

                    <group>

                      {toggle === 'square' ?

                        <Square click={click} box={boxContext.box} scale={[1.2, 1.2, 1.2]} position={[0, 0, 0]}/>
                        :
                        <Rounded click={click} box={boxContext.box} scale={[1.2, 1.2, 1.2]} position={[0, 0, 0]}/>
                      }
                      <Floor/>
                    </group>

                    <OrbitControls maxDistance={20} enablePan={false} minPolarAngle={0} maxPolarAngle={1.5}
                                   rotation={[0, 1, 2]}/>
                  </Suspense>
                </BridgeProvider>
              </Canvas>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
      <IonModal isOpen={showModal} cssClass='my-custom-class'>
        <IonItem>
          <IonLabel position="floating">NAME</IonLabel>
          <IonInput type={'text'} value={textures.name} onIonChange={handleTextChange('name')}/>
        </IonItem>
        <IonItem>
          <IonLabel>
            TEXTURE
          </IonLabel>
          <input type={'file'} onChange={handleTexturesChange('texture')}/>
        </IonItem>

        <IonButton onClick={(e) => {
          e.preventDefault();
          const {name, user, texture} = textures;
          const formData = new FormData();
          formData.append('name', name);
          formData.append('user', user);
          {/*@ts-ignore*/}
          formData.append('texture', texture);
          axios({
            method: 'post',
            url: `${API}/material/create`,
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'}
          })
            .then(function (response) {
              //handle success
              console.log(response.data.material);
              let tempMaterial = response.data.material
              tempMaterial.texture = `${API}/photo/${tempMaterial?.texture}`
              setMaterials([...materials, tempMaterial])
            })
            .catch(function (error) {
              setError(error.response.data.error);
            });
          setShowModal(false)
        }}>LOAD OWN MATERIAL
        </IonButton>

        <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
      </IonModal>
    </IonPage>
  );
};

export default Create

