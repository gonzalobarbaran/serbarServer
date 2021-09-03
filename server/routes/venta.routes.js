const express = require('express');
const router = express.Router();

const venCtrl = require('../controllers/venta.controller');

router.get('/ventas', venCtrl.getVentas );
router.get('/ventas/cliente/:cliente', venCtrl.getVentasCliente );
router.post('/ventas', venCtrl.createVenta);
router.get('/ventas/:id', venCtrl.getVenta);
router.put('/ventas/:id', venCtrl.editVenta);
router.delete('/ventas/:id', venCtrl.deleteVenta);

module.exports = router;