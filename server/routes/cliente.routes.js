const express = require('express');
const router = express.Router();

const cliCtrl = require('../controllers/cliente.controller');

router.get('/clientes', cliCtrl.getClientes );
router.get('/clientes/buscar/:str', cliCtrl.getClientesxNombre);
router.post('/clientes', cliCtrl.createCliente);
router.get('/clientes/:id', cliCtrl.getCliente);
router.put('/clientes/:id', cliCtrl.editCliente);
router.delete('/clientes/:id', cliCtrl.deleteCliente);

module.exports = router;