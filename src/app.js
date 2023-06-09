import express from 'express'
import ProductManager from '../src/productManager.js'

const app = express();
const productM = new ProductManager()


app.get("/", (req, res) => {
  res.send("Hola");
});

app.use(express.urlencoded({ extended: true }))
app.get('/productos', async (req, res) => {

  const productos = await productM.getProducts()
  

  let limit = req.query.limit
  if (!limit || (limit > 5)) return res.send(productos)
  let cantidadproductos = productos.filter(productos => productos.id <= limit)
  res.send({ productos: cantidadproductos })
});

app.get('/productos/:id', async (req, res) => {


  const producto = await productM.getProductsById(req.params.id)
  res.send(producto)
})

app.listen(8080, () => {
  console.log("ok");
});