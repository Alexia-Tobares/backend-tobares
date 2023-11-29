const { Router } = require("express") ;
const ProductManager = require("../managers/productManager");

 const router = Router();
 const productService = new ProductManager('/src/mockDB/products.json')

 router
    .get('/', async(req, res)=>{
        const products = await productService.getProducts()
        res.send({status:'succes', payload: products})
    })
    .get('/:pid', async(req, res)=>{
        const {pid} = parseInt(req.params)
        const product = await productService.getProductById(pid)
        if(!product){
            return res.status(400).send({status: 'error', message: 'Producto no encontrado o inexistente'})
        }
        res.send({status:'succes', payload: product})
    })

    .post('/', async(req, res)=>{
        const product = req.body
        res.send('post product')
    })

    .put('/:pid', async(req, res)=>{
        const {pid} = req.params
        res.send('put product' + pid)
    })

    .delete('/:pid', async(req, res)=>{
        const {pid} = req.params
        res.send('delete product' + pid)
    })

 module.exports = router;