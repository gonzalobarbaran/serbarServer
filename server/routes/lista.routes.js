const express = require('express');
const router = express.Router();

const listaCtrl = require('../controllers/lista.controller');

router.get('/listas', listaCtrl.getListas );
router.post('/listas', listaCtrl.createLista);
router.get('/listas/:id', listaCtrl.getLista);
router.put('/listas/:id', listaCtrl.editLista);
router.delete('/listas/:id', listaCtrl.deleteLista);

module.exports = router;