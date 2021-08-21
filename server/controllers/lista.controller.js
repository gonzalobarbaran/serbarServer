const Lista = require('../models/lista');

const listaCtrl = {};

listaCtrl.getListas = async (req,res) =>{
    const listas =  await Lista.find();
    res.json(listas);    
}

listaCtrl.createLista = async (req,res) => {
    const lista = new Lista(req.body);
    await lista.save();
    res.json({
        'status': 'Guardado'
    });
}

listaCtrl.getLista = async (req,res) => {
    const lista = await Lista.findById(req.params.id);
    res.json(lista);
}

listaCtrl.editLista = async (req,res) => {
    const {id} = req.params;
    const lista = {
        nombre: req.body.nombre,
    }
    await Lista.findByIdAndUpdate(id, {$set: lista}, {new: true});
    res.json({
        'status': "Cambiado"
    });
}

listaCtrl.deleteLista = async (req, res) => { 
    await Lista.findByIdAndRemove(req.params.id);
    res.json({'status': 'Eliminado'});
}

module.exports = listaCtrl;