const Venta = require('../models/venta');
//const DetalleVenta = require('../models/detalleVenta');

const ventaCtrl = {};

ventaCtrl.getVentas = async (req,res) =>{
    var ventas =  await Venta.find().populate('cliente').populate({
        path: 'detalles.producto',
        model: 'Producto'
    });
    
    res.json(ventas);    
}

ventaCtrl.createVenta = async (req,res) => {
    const venta = new Venta(req.body);
    await venta.save();
    res.json({
        'status': 'Guardado'
    });
}

ventaCtrl.getVenta = async (req,res) => {
    const venta = await Venta.findById(req.params.id).populate('cliente').populate({
        path: 'detalles.producto',
        model: 'Producto'
    });
    res.json(venta);
}

ventaCtrl.editVenta = async (req,res) => {
    const {id} = req.params;
    const venta = {
        cliente: req.body.cliente,
        condVenta: req.body.condVenta,
        vencimiento: req.body.vencimiento,
        remito: req.body.remito,
        detalles: req.body.detalles,
        subtotal: req.body.subtotal,
        porcIVA: req.body.porcIVA,
        porcIIBB: req.body.porcIIBB,
        total: req.body.total,
    }
    await Venta.findByIdAndUpdate(id, {$set: venta}, {new: true});
    res.json({
        'status': "Cambiado"
    });
}

ventaCtrl.deleteVenta = async (req, res) => { 
    await Venta.findByIdAndRemove(req.params.id);
    res.json({'status': 'Eliminado'});
}

module.exports = ventaCtrl;