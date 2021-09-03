const Cliente = require('../models/cliente');

const clienteCtrl = {};

clienteCtrl.getClientes = async (req,res) =>{

    const clientes =  await Cliente.find();
    res.json(clientes);    
}


clienteCtrl.getClientesxNombre = async (req,res) =>{
    const {str} = req.params;
    const clientes =  await Cliente.find({razonSocial: {$regex: str, $options:'i'}}); 
    res.json(clientes);    
}

clienteCtrl.createCliente = async (req,res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.json({
        'status': 'Guardado'
    });
}

clienteCtrl.getCliente = async (req,res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
}

clienteCtrl.editCliente = async (req,res) => {
    const {id} = req.params;
    const cliente = {
        _id: id,
        CUIT: req.body.CUIT,
        razonSocial: req.body.razonSocial,
        domicilio: req.body.domicilio,
        condIVA: req.body.condIVA,
        telefono: req.body.telefono,
        email: req.body.email,
        localidad: req.body.localidad,
        provincia: req.body.provincia,
    }
    await Cliente.findByIdAndUpdate(id, {$set: cliente}, {new: true});
    res.json({
        'status': "Cambiado"
    });
}

clienteCtrl.deleteCliente = async (req, res) => { 
    await Cliente.findByIdAndRemove(req.params.id);
    res.json({'status': 'Eliminado'});
}

module.exports = clienteCtrl;