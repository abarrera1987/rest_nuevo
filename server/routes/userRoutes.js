const express = require("express");

const _ = require('underscore');

const bcrypt = require('bcrypt');

const Usuario = require('../models/userModel');

const UsuarioHeroe = require('../models/heroeModel');

const app = express();



app.get("/usuarios", function (req, res) {

	// res.send("Usuarios");
	let desde = Number(req.query.desde) || 0;
	Usuario.find({})
		.skip(desde)
		.limit(Number(process.env.LIMITROWS))
		.exec((err, usuariosDB) => {

			if (err) {

				return res.status(400).json({

					code: 400,
					message: process.env.ERROR_MESSAGE

				});

			}

			Usuario.countDocuments({}, (err, rows) => {

				if (rows == 0) {

					return res.status(200).json({

						code: 200,
						message: "No se encontraron registros"

					});
				}

				if (usuariosDB == "") {

					return res.status(200).json({

						code: 200,
						message: "No se encontraron registros"

					});

				}

				return res.json({

					code: 200,
					usuariosDB,
					rows

				})

			})



		})

})

app.post("/crearUsuario", function (req, res) {

	let body = req.body;

	let nuevoUsuario = new Usuario({

		nombre: body.nombre,
		email: body.email,
		pass: bcrypt.hashSync(body.pass, 10),
		role: body.role,
		estado: body.estado

	})

	nuevoUsuario.save((err, usuDB) => {

		if (err) {

			return res.status(400).json({

				code: 400,
				message: process.env.ERROR_MESSAGE

			});

		}

		return res.json({

			code: 200,
			message: usuDB

		})

	})

})

app.put("/editarUsuario", function (req, res) {

	let body = _.pick(req.body, ['id', 'nombre', 'pass', 'role', 'estado']);

	let editaUsuario = new Usuario({

		nombre: body.nombre,
		pass: bcrypt.hashSync(body.pass, 10),
		role: body.role,
		estado: body.estado

	})

	let userObject = editaUsuario.toObject();
	delete userObject._id;

	let option = {

		new: true

	}

	Usuario.findByIdAndUpdate(body.id, userObject, option, (err, usuariosDB) => {

		if (err) {

			return res.status(400).json({

				code: 400,
				message: process.env.ERROR_MESSAGE

			});

		}

		return res.json({

			code: 200,
			message: usuariosDB

		})

	})


})

app.put("/eliminarUsuario", function (req, res) {

	let body = _.pick(req.body, ['id', 'estado']);

	let eliminaUsuario = new Usuario({

		estado: body.estado

	})

	let userObject = eliminaUsuario.toObject();
	delete userObject._id;

	let option = {

		new: true

	}

	Usuario.findByIdAndUpdate(body.id, userObject, option, (err, usuariosDB) => {

		if (err) {

			return res.status(400).json({

				code: 400,
				message: process.env.ERROR_MESSAGE

			});

		}

		if (usuariosDB == null) {

			return res.status(400).json({

				code: 400,
				message: "No se encontro el registro"

			});

		}

		return res.json({

			code: 200,
			message: usuariosDB

		})

	})

})


app.post("/crearHeroe", function (req, res) {

	let body = req.body;

	let nuevoHero = new UsuarioHeroe({

		nombre: body.nombre,
		poder: body.poder,
		estado: body.estado

	})

	nuevoHero.save((err, usuDB) => {

		if (err) {

			return res.status(400).json({

				code: 400,
				message: process.env.ERROR_MESSAGE

			});

		}

		return res.json({

			code: 200,
			message: usuDB

		})

	})

})


app.get("/traeHeroes", function (req, res) {

	// res.send("Usuarios");
	let desde = Number(req.query.desde) || 0;
	UsuarioHeroe.find({})
		.skip(desde)
		.limit(Number(process.env.LIMITROWS))
		.exec((err, usuariosDB) => {

			if (err) {

				return res.status(400).json({

					code: 400,
					message: process.env.ERROR_MESSAGE

				});

			}

			UsuarioHeroe.countDocuments({}, (err, rows) => {

				if (rows == 0) {

					return res.status(200).json({

						code: 200,
						message: "No se encontraron registros"

					});
				}

				if (usuariosDB == "") {

					return res.status(200).json({

						code: 200,
						message: "No se encontraron registros"

					});

				}

				return res.json({

					code: 200,
					usuariosDB,
					rows

				})

			})



		})

})

app.put("/editarHeroe", function (req, res) {

	let body = req.body;
	let idHeroe = body.id
	let nuevoHero = new UsuarioHeroe({

		nombre: body.nombre,
		poder: body.poder,
		estado: body.estado

	})

	let heroe = nuevoHero.toObject();
	delete heroe._id;

	UsuarioHeroe.findByIdAndUpdate(idHeroe, heroe, { new: true }, (err, usuDB) => {

		if (err) {

			return res.status(400).json({

				code: 400,
				message: process.env.ERROR_MESSAGE

			});

		}

		return res.json({

			code: 200,
			message: usuDB

		})

	})

})

app.get("/traeHeroe/:id", function (req, res) {

	let id = req.params.id;

	UsuarioHeroe.findById({ '_id': id })
		.exec((err, usuarioDB) => {

			if (err) {

				return res.status(400).json({

					code: 400,
					message: process.env.ERROR_MESSAGE,
					err

				});

			}

			if (usuarioDB == "") {

				return res.status(200).json({

					code: 200,
					message: "No se encontraron registros"

				});

			}

			return res.json({

				code: 200,
				usuarioDB

			})
		})

})

module.exports = app;

