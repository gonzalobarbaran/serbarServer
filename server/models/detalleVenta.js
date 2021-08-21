const mongoose =  require('mongoose');
const { Schema } = mongoose;

const DetalleSchema = new Schema({
    producto: { type: Schema.Types.ObjectId, ref:'Producto', required: true},
    cantidad: { type: Number, required: true},
    precioUnit: { type:Number, required: true},
})

module.exports = mongoose.model('DetalleVenta', DetalleSchema);