const { Router } = require("express") ;
const ProductManager = require("../managers/productManager");

 const router = Router();
 const productService = new ProductManager('./mockDB/products.json')

 router
    .get('/', async(req, res)=>{
        const limit = req.query.limit;
        const products = await productService.getProducts()
        if(limit){
            return res.json(products.slice(0, limit))
        }
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

    .post('/', (req, res) => {
        const { title, description, price, thumbnail, code, stock} = req.body;

        productService.addProduct(title, description, price, thumbnail, code, stock);
        res.json({ message: 'Producto agregado con éxito.' });
    })

    .put('/:id', (req, res) => {
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'ID no válido.' });
        }

        const updatedProductData = req.body;

        productService.updateProduct(productId, updatedProductData);
        res.json({ message: `Producto con ID ${productId} actualizado con éxito.` });
    })

    .delete('/:id', (req, res) => {
        const productId = parseInt(req.params.id);
        if (isNaN(productId)) {
            return res.status(400).json({ error: 'ID no válido.' });
        }
        res.json(productService.deleteProduct(productId));

    })

 module.exports = router;