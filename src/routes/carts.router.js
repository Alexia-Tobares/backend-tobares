const { Router } = require("express") ;
const CartsManagerFile = require('../managers/cartsManager')
const cartsServices = new CartsManagerFile()
 const router = Router();

router
    .get('/:cid', async(req, res)=>{
        const {cid} = parseInt(req.params)
        const cart = await cartsServices.getCartById(cid)
        res.send({status: 'success', playload: cart})
    })

 module.exports = router;