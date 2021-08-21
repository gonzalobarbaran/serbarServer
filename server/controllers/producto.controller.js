const Producto = require('../models/producto');

const productoCtrl = {};

productoCtrl.getProductos = async (req,res) =>{
    const productos =  await Producto.find().populate('categoria_id').populate({
        path: 'precios.lista_id',
        model: 'Lista'
    });;
    res.json(productos);    
}

productoCtrl.createProducto = async (req,res) => {
    const producto = new Producto(req.body);
    await producto.save();
    res.json({
        'status': 'Guardado'
    });
}

productoCtrl.getProducto = async (req,res) => {
    var producto = await Producto.findById(req.params.id).populate('categoria_id').populate({
        path: 'precios.lista_id',
        model: 'Lista'
    });;
    res.json(producto);
    
}

productoCtrl.editProducto = async (req,res) => {
    const {id} = req.params;
    const producto = {
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        categoria_id: req.body.categoria_id,
        stock: req.body.stock,
        precios: req.body.precios,
    }
    await Producto.findByIdAndUpdate(id, {$set: producto}, {new: true});
    res.json({
        'status': "Cambiado"
    });
}

productoCtrl.deleteProducto = async (req, res) => { 
    await Producto.findByIdAndRemove(req.params.id);
    res.json({'status': 'Eliminado'});
}

module.exports = productoCtrl;