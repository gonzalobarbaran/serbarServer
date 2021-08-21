const mongoose =  require('mongoose');
const { Schema } = mongoose;
//const DetalleVenta = require('../models/detalleVenta');

var DetalleVenta = new Schema({
    producto: { type: Schema.Types.ObjectId, ref:'Producto', required: true},
    cantidad: { type: Number, required: true},
    precioUnit: { type:Number, required: true},
})

const VentaSchema = new Schema({
    cliente: { type: Schema.Types.ObjectId,ref:'Cliente', required: true},
    fecha: { type: String, required: true},
    condVenta: { type: String, required: true},
    vencimiento: { type: String, required: false},
    remito: { type:String, required: false},
    detalles: [ DetalleVenta ],
    subtotal: { type:Number, required: true},
    porcIVA: { type: Number},
    porcIIBB: { type: Number},
    total: { type: Number},
})

module.exports = mongoose.model('Venta', VentaSchema);