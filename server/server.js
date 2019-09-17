require("./config/config");

const express = require('express');

const bodyParser = require('body-parser')

const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json());

app.use(cors());

app.use(require('./routes/index_routes'));

app.listen(process.env.PORT, () => {

	console.log("Escuchando el puerto "+process.env.PORT);

})