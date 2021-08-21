const Categoria = require('../models/categoria');

const categoriaCtrl = {};

categoriaCtrl.getCategorias = async (req,res) =>{
    const categorias =  await Categoria.find();
    res.json(categorias);    
}

categoriaCtrl.createCategoria = async (req,res) => {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.json({
        'status': 'Guardado'
    });
}

categoriaCtrl.getCategoria = async (req,res) => {
    const categoria = await Categoria.findById(req.params.id);
    res.json(categoria);
}

categoriaCtrl.editCategoria = async (req,res) => {
    const {id} = req.params;
    const categoria = {
        nombre: req.body.nombre,
    }
    await Categoria.findByIdAndUpdate(id, {$set: categoria}, {new: true});
    res.json({
        'status': "Cambiado"
    });
}

categoriaCtrl.deleteCategoria = async (req, res) => { 
    await Categoria.findByIdAndRemove(req.params.id);
    res.json({'status': 'Eliminado'});
}

module.exports = categoriaCtrl;