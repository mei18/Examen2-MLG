var mongoose = require('mongoose'),
		Schema = mongoose.Schema; //Interactuar con la bd
var Elecciones = new Schema({
	nombre: String,
	puntos: Number,
	trump: Number,
	hillary: Number,
  ganador: String,
	total: Number,
  ganadorH: Boolean,
  ganadorT: Boolean

}, {collection: 'Estados'}); //llamar la tabla de la bd

mongoose.model('EstadosMod', Elecciones); //Exporta la coleccion.
