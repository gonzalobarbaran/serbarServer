const express = require('express');
const router = express.Router();

const catCtrl = require('../controllers/categoria.controller');

router.get('/categorias', catCtrl.getCategorias );
router.post('/categorias', catCtrl.createCategoria);
router.get('/categorias/:id', catCtrl.getCategoria);
router.put('/categorias/:id', catCtrl.editCategoria);
router.delete('/categorias/:id', catCtrl.deleteCategoria);

module.exports = router;