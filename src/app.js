const express = require('express')
const ProductManager = require('./managers/productManager')
const app = express()
const {Server} = require('socket.io')
const handlebars = require('express-handlebars')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join('./public')))
app.engine('handlebars', handlebars.engine())

app.set('view engine', '.handlebars')
app.set('views', './src/views')

const productsRouter = require('./routes/apis/products.router.js')
const cartRouter = require('./routes/apis/carts.router.js')
const viewsRouter = require('./routes/views.router.js')

app.use('/views', viewsRouter)

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

const httpServer = app.listen(8080, () => {
  console.log(`Example app listening on port 8080`)
})
const io = new Server(httpServer)
io.on('connection', socket =>{
  console.log('Nuevo cliente conectado')

  socket.on('recibirMensajeCliente', data =>{
    console.log(data)
  })
})