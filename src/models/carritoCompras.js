const mongoose = require("mongoose");
const carritoSchema = mongoose.Schema({

  imagen: {
    type: String,
    require: true,
  },

  nombre: {
    type: String,
    require: true,
  },

  fecha: {
    type: Date,
    require: true,
  },
  precio: {
    type: Number,
    require: true,
  },

  stock: {
    type: Number,
    require: true,
  },

  descripcion: {
    type: String,
    require: true,
  },
  cantidad: {
    type: Number,
    require: true
  }

});

module.exports = mongoose.model('Carrito Compras', carritoSchema);