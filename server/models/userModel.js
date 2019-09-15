const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({

	nombre: {

		type: String,
		required: [true, 'El nombre es necesario']

	},

	email: {

		type: String,
		unique: true,
		required: [true, 'EL correo es obligatorio']

	},

	pass: {

		type: String,
		required: true

	},

	role: {

		type: String,
		default: "admin"

	},

	estado: {

		type: Boolean,
		default: true

	}

});

userSchema.plugin(uniqueValidator, '{PATH} debe ser unico');


module.exports = mongoose.model('usuarios', userSchema);