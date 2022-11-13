const express = require("express");
const carShop = require("../models/carritoCompras");
const router = express.Router();
const productosStock = require("../models/productos");
const ventas = require("../models/ventas");


// ! VER PRODUCTOS EN CARRITO CON VALOR TOTAL
router.get("/carritoCompras", async (req, res) => {
    let total = 0;
   //validacionStock()
    await carShop
        .find()
        .then((datos) => {
        res.status(200);
        datos.forEach((iterador) => {
            total = (iterador.precio * iterador.cantidad) + total;
        });

        // ? Total de la compra
        datos.push({ Valor_total: total });

        res.json(datos);
        })
        .catch((error) => {
        res.status(404);
        res.send("Carrito Vacio " + error);
        });
    });

// ! AGREGAR AL CARRITO

router.post("/carritoCompras", (req, res) => {
    // recibimos el id
   //validacionStock()
    const dat = carShop(req.body);
    // buscamos el id en nuestros productos
    productosStock
    .findById(dat._id)
    // Si el id esta entonces{
    .then((daticos => {
        carShop
        // Verificamos si el mismo producto ya lo tenemos en el carrito
        .findById(dat._id)
        // Si lo tenemos entonces sumamos cantidad
        .then((p) => {
            let s = p.cantidad + 1
            let h = p.stock - 1
            carShop
            .findByIdAndUpdate({ _id: dat._id }, {
                $set: {cantidad: s, stock: h}
            })
            .then(() => {
                res.send('Se agrego cantidad')
                }
            )
            .catch(() => res.send('No se agrego nada'))
        })
        // Si el producto no esta en el carrito entonces lo agregamos
        .catch(() => {
            res.send('Se agrego el producto')
            // si es nulo entonces cree el dato
            const u = carShop.create({
                _id: daticos._id,
                imagen: daticos.imagen,
                nombre: daticos.nombre,
                fecha: daticos.fecha,
                precio: daticos.precio,
                stock: daticos.stock - 1,
                descripcion: daticos.descripcion,
                cantidad: 1
            })
        })
        }))
    // Si el producto no esta en la lista de productos entonces informamos que no esta
    .catch((error) => res.send('El producto no esta en el catalogo ' + error))
});

router.get("/confirmarCompra", (req, res) => {
   // validacionStock()
    const confirmacion = ventas(req.body);
    if(confirmacion.respuesta === "yes" || confirmacion.respuesta === "Yes"){
        carShop
        .find()
        .then((carrito) => {
            carrito.forEach(recorrido => {
                ventas.create({
                    imagen: recorrido.imagen,
                    nombre: recorrido.nombre,
                    fecha: recorrido.fecha,
                    precio: recorrido.precio,
                    stock: recorrido.stock - 1,
                    descripcion: recorrido.descripcion,
                    cantidad: 1
                })
                // Actualizar productos

                productosStock
                .findByIdAndUpdate({_id: recorrido._id}, {$set: {stock: (recorrido.stock - recorrido.cantidad)}})
                .then(() => console.log('Se actualizo el stock del producto ' + recorrido.nombre))
                .catch((error) => console.log('No se pudo actualizar el stock del producto ' + recorrido.nombre + ' ' + error))
                // Borra registro por registro
                carShop
                .deleteOne({_id: recorrido._id})
                .then(() => console.log('Dato eliminado del carrito'))
                .catch(() => console.log('No se encontro el id para eliminar'))
            })
        }, 
        res.send('Se ha hecho la venta')
        )
        .catch(() => res.send('El carrito esta vacio'))
    }
    
})

router.get("/mostrarVentas", (req, res) => {
    //validacionStock()
    ventas
    .find()
    .then((ventas) => res.json(ventas))
    .catch(() => res.send('No hay ventas'))
})
module.exports=router;