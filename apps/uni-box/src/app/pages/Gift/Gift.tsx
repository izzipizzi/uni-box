/* eslint-disable prefer-const */
import { IonContent, IonLabel, IonPage, IonRange } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { gifts, reversed } from '../../constatnts';
import './Gift.css';


export const Gift = () => {

  const [data, setData] = useState({
    direction: 0,
    art: 0,
    music: 0,
    gender:'male',
    gamer: 0,
    sport: 0
  });
  const [bestGifts, setBestGifts] = useState([]);



  useEffect(() => {
    let newMatrix = [...reversed];
    // let data = fetchData();
    const resultArray = [];
    console.log(data);
    console.log(newMatrix);

    for (let i = 0; i < newMatrix.length; i++) {

      const combinedMatrix = combineArrays(newMatrix[i], Object.values(data));
      const minJ = findMinJ(combinedMatrix);

      const endMaxI = findEndMaxI(minJ);
      gifts[i].push(String(endMaxI));
      resultArray.push(endMaxI);


    }
    console.log(resultArray)
    const best = findBestResult(resultArray);
    // let best = findBestResults(resultArray)
    const tempGifts = [];
    console.log(best)
    console.log(gifts)

    for (let i = 0; i < gifts.length; i++) {
      for (let j = 0; j < best.length; j++) {
        console.log(gifts[i])
        console.log(''+best[j] )
        if (gifts[i].includes(String(best[j]))) {
          console.log(gifts.indexOf(best[j]));
          console.log(gifts[i]);
          tempGifts.push(gifts[i][0]);
        }
      }
    }

    // let bestGifts = [];


    console.log(tempGifts)
    setBestGifts([...tempGifts]);
    console.log(bestGifts)
    // newMatrix = null;

    // setData([]);

    // resultBlock.classList.remove('hidden');
  }, [
    data
  ]);
  const findMinJ = array => {
    const max_matrix_J = [];
    for (let i = 0; i < array.length; i++) {

      let min = 100;

      for (let j = 0; j < array.length; j++) {

        if (array[i][j] < min) {
          min = array[i][j];
        }

        max_matrix_J[i] = min;


      }

    }
    return max_matrix_J;
  };


  const findEndMaxI = array => {
    let endMax = 0;
    for (let i = 0; i < array.length; i++) {
      if (array[i] > endMax) {
        endMax = array[i];

      }

    }
    return endMax;

  };


  const combineArrays = (arr1, arr2) => {
    const newArr = [];

    for (let i = 0; i < arr1.length; i++) {
      newArr[i] = [arr1[i], arr2[i]];

    }

    return newArr;
  };

  const findBestResult = array => {
    const best = [];
    const unsortedArr = [...array];
    best.push(Math.max(...unsortedArr));
    return best;
  };
  const findBestResults = array => {
    let best;
    array.sort();
    best = array.slice(array.length - 3);
    return best;
  };


  const onChange = name => (event) => {
    setData({ ...data, [name]: event.detail.value as number });
  };


  return (
    <IonPage>
      <IonContent>
        <div className={'content-wrapper'}>
          <div className={'form-container'}>
            {/*<form onSubmit={onSubmit}>*/}
            <IonLabel class={'item-label'} position='stacked'> Напрям діяльності(0-філолог,1-технарь)</IonLabel>
            <div className={'input-item-container'}>
              <IonRange value={data.direction} snaps={true} step={1} pin={true} min={0}
                        max={100}
                        color='secondary'
                        onIonChange={onChange('direction')}>
                <IonLabel slot='start'>0</IonLabel>
                <IonLabel slot='end'>100</IonLabel>
              </IonRange>
            </div>
            <IonLabel class={'item-label'} position='stacked'>Музикант</IonLabel>
            <div className={'input-item-container'}>
              <IonRange value={data.music} snaps={true} step={1} pin={true} min={0}
                        max={100}
                        color='secondary'
                        onIonChange={onChange('music')}>
                <IonLabel slot='start'>0</IonLabel>
                <IonLabel slot='end'>100</IonLabel>
              </IonRange>
            </div>
            <IonLabel class={'item-label'} position='stacked'> Митець</IonLabel>
            <div className={'input-item-container'}>
              <IonRange value={data.art} snaps={true} step={1} pin={true} min={0}
                        max={100}
                        color='secondary'
                        onIonChange={onChange('art')}>
                <IonLabel slot='start'>0</IonLabel>
                <IonLabel slot='end'>100</IonLabel>
              </IonRange>
            </div>
            <IonLabel class={'item-label'} position='stacked'> Геймер</IonLabel>
            <div className={'input-item-container'}>
              <IonRange value={data.gamer} snaps={true} step={1} pin={true} min={0}
                        max={100}
                        color='secondary'
                        onIonChange={onChange('gamer')}>
                <IonLabel slot='start'>0</IonLabel>
                <IonLabel slot='end'>100</IonLabel>
              </IonRange>
            </div>
            <IonLabel class={'item-label'} position='stacked'> Спортсмен</IonLabel>
            <div className={'input-item-container'}>
              <IonRange value={data.sport} snaps={true} step={1} pin={true} min={0}
                        max={100}
                        color='secondary'
                        onIonChange={onChange('sport')}>
                <IonLabel slot='start'>0</IonLabel>
                <IonLabel slot='end'>100</IonLabel>
              </IonRange>
            </div>

            {bestGifts && <ul>
              {bestGifts.map(gift => {
                return (<li>{gift}</li>);
              })}
            </ul>
            }
            {/*</IonItem>*/}
            <div className={'auth-btn-container'}>

              {/*<IonButton className={'auth-btn'} expand={'full'} shape='round' fill='solid'*/}
              {/*           onClick()>Увійти</IonButton>*/}
            </div>

            {/*</form>*/}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );

};
