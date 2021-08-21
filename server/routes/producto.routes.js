const express = require('express');
const router = express.Router();

const prodCtrl = require('../controllers/producto.controller');

router.get('/productos', prodCtrl.getProductos );
router.post('/productos', prodCtrl.createProducto);
router.get('/productos/:id', prodCtrl.getProducto);
router.put('/productos/:id', prodCtrl.editProducto);
router.delete('/productos/:id', prodCtrl.deleteProducto);

module.exports = router;