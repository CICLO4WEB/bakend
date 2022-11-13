const express = require("express");
const producSchema=require("../models/productos")
const router = express.Router();


//defino el end point

// create producto
router.post("/crearProducto", (req, res) => {
    const user = producSchema(req.body);
    user
      .save()
      .then((data) => res.json(data))
      .catch((error)=> res.json({message: error}))
  });

 // get all productos
router.get("/consultarProductos", (req, res) => {
  producSchema
    .find()
    .then((data) => res.json(data.filter(product=>product.stock>0)))
    .catch((error) => res.json({ message: error }));
});

// get a productos
router.get("/consultarProductoId/:id", (req, res) => {
  const { id } = req.params;
  producSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a productos
router.delete("/borrarProducto/:id", (req, res) => {
  const { id } = req.params;
  producSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update a products
router.put("/actualizarProducto/:id", (req, res) => {
  const { id } = req.params;
  const { imagen, nombre, fecha, precio, stock, descripcion, cantidad } = req.body;
  producSchema
    .updateOne({ _id: id }, { $set: { imagen, nombre, fecha, precio, stock, descripcion, cantidad} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
 
// update a unidades
router.put("/actualizarUnidades/:id", (req, res) => {
  const { id } = req.params;
  let { stock } = req.body;
  
  producSchema
    .findOneAndUpdate({ _id: id }, { $inc: { "stock":stock } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
    
});
 


module.exports = router;
