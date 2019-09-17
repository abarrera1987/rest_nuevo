const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let heroeSchema = new Schema({

	nombre: {

		type: String,
		required: [true, 'El nombre es necesario']

	},

	poder: {

		type: String,
		required: true

	},
	
	estado: {

		type: Boolean,
		default: true

	}

});

heroeSchema.plugin(uniqueValidator, '{PATH} debe ser unico');


module.exports = mongoose.model('heroes', heroeSchema);