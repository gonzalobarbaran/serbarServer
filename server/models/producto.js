const mongoose =  require('mongoose');
const { Schema } = mongoose;


const Precio = new Schema({
    lista_id: {type: Schema.Types.ObjectId, ref: 'Lista', required: true},
    precio: {type:Number, required: true},
})

const ProductoSchema = new Schema({
    codigo: { type: String, required: true},
    descripcion: { type: String, required: true},
    categoria_id: { type: Schema.Types.ObjectId, ref: 'Categoria'},
    stock: {type: Number, required:false},
    precios: [Precio],
})

module.exports = mongoose.model('Producto', ProductoSchema);