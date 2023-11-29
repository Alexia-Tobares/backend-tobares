const express = require('express')
const ProductManager = require('./managers/productManager')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const productsRouter = require('./routes/products.router.js')
const cartRouter = require('./routes/carts.router.js')

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})