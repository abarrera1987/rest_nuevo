require("./config/config");

const express = require('express');

const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/index_routes'));

app.listen(process.env.PORT, () => {

	console.log("Escuchando el puerto "+process.env.PORT);

})