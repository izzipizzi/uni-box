export const HOST = 'http://localhost:3343'
export const API = `${HOST}/api`
export  const API_PHOTOS = `${API}/photo/`
export const GRAPHQL = `${HOST}/graphql`



export const defaultBox = {
  _id: '',
  name: '',
  width: 100,
  model: 'SQUARE',
  height: 100,
  length: 100,
  price: 0,
  color: '',
  loading: true,
  material: {
    _id: '',
    name: '',
    texture: '',
    price: 100,
  },
  textureScaleX: 100,
  textureScaleY: 100,
  textureOffsetX: 100,
  textureOffsetY: 100,
  textureRotation: 0,
  previewImg: '',
  validated: false,
  public: false,
  declined: false,
  defaultPrice : 1.2

}

export const defaultMaterial = {
  _id:'',
  name:'',
  price: 100,
  texture: './assets/Cardboard_Color.jpg'
}

export const gifts = [
  ['SPORT_INVENTORY'],
  ['HEADPHONES'],
  ['PERFUMES'],
  ['MUSIC_TOOLS'],
  ['BOOK'],
  ['KITCHEN_ACCESSORIES'],
  ['SMOKING_ACCESSORIES'],
  ['CASUAL_ACCESSORIES'],
  ['ALCOHOL'],
  ['GAMING_GADGETS'],
  ['MAKEUP'],
  ['GIFT_CERTIFICATES'],
  ['DESIGNER_STUFF'],
  ['TOYS']
];
export const reversed = [
  [50, 20, 30, 50, 40, 90],
  [70, 60, 90, 50, 80, 70],
  [50, 50, 50, 50, 40, 80],
  [50, 60, 90, 50, 60, 40],
  [50, 50, 50, 50, 40, 40],
  [50, 20, 30, 20, 10, 20],
  [50, 50, 50, 80, 40, 10],
  [50, 80, 70, 40, 30, 50],
  [50, 50, 50, 70, 20, 10],
  [60, 60, 60, 80, 90, 20],
  [40, 90, 50, 20, 50, 50],
  [50, 50, 50, 40, 50, 50],
  [50, 90, 80, 30, 50, 40],
  [50, 80, 30, 20, 50, 20]

];
