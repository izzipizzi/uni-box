import axios from 'axios';
import { API } from '../constatnts';
import { useContext } from 'react';
import { UIContext } from '../context/ui-context';


export const useSaveBox = (box, userId) => {
  const ui = useContext(UIContext);
  const saveBox = async () => {
    const {
      name,
      width,
      model,
      height,
      length,
      color,
      material,
      textureRotation,
      textureScaleX,
      textureScaleY,
      textureOffsetX,
      textureOffsetY,
      previewImg,
      price,
      isPublic
    } = box;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('width', width);
    formData.append('model', model);
    formData.append('height', height);
    formData.append('length', length);
    formData.append('color', color);
    formData.append('material', material._id);

    formData.append('textureScaleX', textureScaleX);
    formData.append('textureScaleY', textureScaleY);
    formData.append('textureOffsetX', textureOffsetX);
    formData.append('textureOffsetY', textureOffsetY);
    formData.append('textureRotation', textureRotation);
    formData.append('previewImg', previewImg as string);
    formData.append('user', userId);
    formData.append('public',box.public);
    formData.append('price',box.price);
    axios({
      method: 'post',
      url: `${API}/box/create`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function(response) {
        ui.setSuccess({ state: true, msg: response.data.msg });
      })
      .catch(function(error) {
        ui.setError({ state: true, msg: error.response.data.error });
      });
  };


  return [saveBox];
};
export const useUpdateBox = (box, userId) => {

  const ui = useContext(UIContext);
  const updateBox = async () => {

    const {
      name,
      width,
      model,
      height,
      _id,
      length,
      color,
      material,
      textureRotation,
      textureScaleX,
      textureScaleY,
      textureOffsetX,
      textureOffsetY,
      previewImg,
      price,
    } = box;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('_id', _id);
    formData.append('width', width);
    formData.append('model', model);
    formData.append('height', height);
    formData.append('length', length);
    formData.append('color', color);
    formData.append('material', material._id);

    formData.append('textureScaleX', textureScaleX);
    formData.append('textureScaleY', textureScaleY);
    formData.append('textureOffsetX', textureOffsetX);
    formData.append('textureOffsetY', textureOffsetY);
    formData.append('textureRotation', textureRotation);
    formData.append('previewImg', previewImg as string);
    formData.append('user', userId);
    formData.append('public',box.public);
    formData.append('price',box.price);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    formData.append('declined',false);
    // formData.append('texture', texture as string);
    axios({
      method: 'put',
      url: `${API}/box/update`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function(response) {
        ui.setSuccess({ state: true, msg: response.data.msg });

      })
      .catch(function(error) {
        ui.setError({ state: true, msg: error.response.data.error });
      });
  };
  return [updateBox];
};

export const useSaveMaterial = (textures) => {
  const ui = useContext(UIContext);

  const saveMaterial = async () => {

    const { name, user, texture , price} = textures;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('user', user);
    formData.append('price', price);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    formData.append('texture', texture);
    axios({
      method: 'post',
      url: `${API}/material/create`,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(function(response) {
        console.log(response);
        ui.setSuccess({state:true,msg:response?.data.msg})
      })
      .catch(function(error) {
        ui.setError({ state: true, msg: error.response.data.error });
      });

  };

  return [saveMaterial];


};
