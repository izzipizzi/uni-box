import * as express from 'express';

const router = express.Router();
const Box = require('../models/box');
const Photo = require('../models/image');
const formidable = require('formidable');
// const fs = require('fs')
//
// router.get('/photo/:photoId', (req, res, next) => {
//   if (req.photo.data) {
//     const {contentType} = req.photo;
//     res.set('Content-Type', contentType)
//     return res.send(req.photo.data)
//   }
//   next();
// })
//
router.post('/box/create', (req: express.Request, res: express.Response) => {
  const form = new formidable.IncomingForm();

  // const boxRequest: IBox = req

  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    const {
      name,
      model,
      tape,
      material,
      color,
      width,
      height,
      length,
      price,
      user,
      previewImg
    } = fields;
    if (!name && !model && !tape && !material && !color && !width && !height
      && !length && !user) {
      return res.status(400).json({
        error: 'Всі поля мають бути заповнені'
      });
    }
    const matches = previewImg.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const previewPhoto = new Photo();
    previewPhoto.data = new Buffer(matches[2], 'base64');
    previewPhoto.contentType = matches[1];
    previewPhoto.save();
    const box = new Box(fields);
    box.previewImg = previewPhoto;

    box.save((err, result) => {

      if (err) {
        return res.status(400).json({
          error: err.message
        });
      }
      res.json({ 'msg': 'Успішно Створенно' });
    });

  });

});


router.put('/box/update', (req: express.Request, res: express.Response) => {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    const {
      name, width, model, height,
      _id, length, color, material,
      textureRotation, textureScaleX,
      textureScaleY, textureOffsetX,price,
      textureOffsetY, previewImg,declined
    } = fields;


    const previewId = await Box.findById(fields._id, 'previewImg');
    const matches = previewImg.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const photo = await Photo.findByIdAndUpdate(previewId.previewImg, {
      data: new Buffer(matches[2], 'base64'),
      contentType: matches[1]
    });
    const box = await Box.findByIdAndUpdate(fields._id, {
      $set: {
        name, width, model, height,
        length, color, material,
        textureRotation, textureScaleX,
        textureScaleY, textureOffsetX,
        textureOffsetY,public:fields.public,
        validated:false,declined:false,price
      }
    });

    if (box) {
      res.json({ 'msg': 'Успішно Оновлено' });
    }
  });

});

export default router;
