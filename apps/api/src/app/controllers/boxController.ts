const express = require('express')
const router = express.Router()
const Material = require('../models/material')
const Photo = require('../models/image')
// const formidable = require('formidable')
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
// router.post('/material/create',(req,res)=>{
//   const form = new formidable.IncomingForm()
//
//   form.keepExtensions = true
//
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       return res.status(400).json({
//         error: 'Ця картинка не може бути загружена'
//       })
//     }
//     const {name} = fields
//     if (!name || !files.texture) {
//       return res.status(400).json({
//         error: 'Всі поля мають бути заповнені'
//       })
//     }
//
//     const material = new Material(fields)
//     // 1kb =1000
//     //1 mb == 1000000
//     if (files.texture) {
//       if (files.texture.size > 5000000 ) {
//         return res.status(400).json({
//           error: 'Максимальний розмір картинки 5 мегабайт.'
//         })
//
//       }
//       const texture = new Photo()
//       texture.data =  fs.readFileSync(files.texture.path)
//       texture.contentType =  files.texture.type
//       texture.save()
//       material.texture = texture
//
//     }
//     material.save((err, result) => {
//       if (err) {
//         return res.status(400).json({
//           error: err.message
//         })
//       }
//       res.json({'msg': 'Успішно добавленно'})
//     })
//   })
//
// })
//
// router.param('photoId', (req, res, next, id) => {
//   Photo.findById(id).exec((err, photo) => {
//     if (err || !photo) {
//       return res.status(400).json({
//         error: "IMAGE_NOT_FOUND"
//       })
//     }
//     req.photo = photo
//     next()
//   })
//
// })
//
module.exports = router
