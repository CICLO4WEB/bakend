const express = require("express");
const ventaSchema=require("../models/ventas");
const router = express.Router();

// crear venta
router.post("/crearVenta", (req, res) => {
    const venta = ventaSchema(req.body);
    venta
      .save()
      .then((data) => res.json(data))
      .catch((error)=> res.json({message: error}))
  });

  module.exports = router;