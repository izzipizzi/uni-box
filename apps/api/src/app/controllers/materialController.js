const express = require('express')
const router = express.Router()
const Material = require('../../models/material')


router.get('/materials/:materialId', (req, res, next) => {
  if (req.material.texture.data) {
    const {contentType} = req.material.texture;
    res.set('Content-Type', contentType)
    return res.send(req.material.texture.data)
  }
  next();
})
router.param('materialId', (req, res, next, id) => {
  Material.findById(id).exec((err, material) => {
    if (err || !material) {
      return res.status(400).json({
        error: "Матеріал  не знайдено"
      })
    }
    req.material = material
    next()
  })

})


module.exports = router
