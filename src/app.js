const express = require('express')
const ProductManager = require('./productManager')
const app = express()
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./src/products.json");

app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const products = productManager.getProducts();

    limit ? res.json(products.slice(0, limit)) : res.json(products);
    })


app.get('/products/:pid',(req, res) => {
    const productId = parseInt(req.params.pid);
    const product = productManager.getProductById(productId);

    product ? res.json(product) : res.status(404).json({ error: 'Producto no encontrado' })
    
  })


app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})