require('dotenv').config()

var mongoose = require('mongoose');
/**
 * Configuracion del puerto 
 */
process.env.PORT = process.env.PORT || 3000;

/**
 * Configuracion mongoose
 */

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.URL_DB_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }).then(
	console.log("BASE DE DATOS ONLINE")
);