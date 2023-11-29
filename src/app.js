const express = require('express')
const ProductManager = require('./managers/productManager')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const productsRouter = require('./routes/products.router.js')

/* app.get('/products', async(req, res) => {
    const limit = req.query.limit;
    const products = await productManager.getProducts();

    limit ? res.json(products.slice(0, limit)) : res.json(products);
    })


app.get('/products/:pid',async (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado o inexistente' })
    
  })
 */

app.use('/api/products', productsRouter)

app.use('/api/carts', (req, res) =>{
  res.send('hola carts')
})

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})