const mongoose = require("mongoose");
const ventaSchema = mongoose.Schema({
 
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
    require: true,
  },

  respuesta: {
    type: String,
    require: false
}

});

module.exports = mongoose.model('Ventas', ventaSchema);