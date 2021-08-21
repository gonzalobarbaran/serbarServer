const express = require('express');
const cors = require('cors');
const app  = express();

const { mongoose } = require('./database');

// Configuracion
app.use(cors());
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Rutas
app.use('/api',require('./routes/cliente.routes'));
app.use('/api', require('./routes/categoria.routes'));
app.use('/api', require('./routes/producto.routes'));
app.use('/api', require('./routes/venta.routes'));
app.use('/api', require('./routes/lista.routes'));

// Empieza el server
app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'))
});
