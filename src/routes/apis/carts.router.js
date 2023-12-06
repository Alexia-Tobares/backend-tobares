const { Router } = require("express") ;
const CartsManagerFile = require('../../managers/cartsManager')
const cartsServices = new CartsManagerFile()
 const router = Router();

router
    .get('/:cid', async (req, res) => {
        try {
          const { cid } = req.params;
          const cart = await cartsServices.getCartById(parseInt(cid));
          if (typeof cart === 'string') {
            res.status(404).send({
              status: 'error',
              message: cart
            });
          } else {
            res.send({
              status: 'success',
              payload: cart
            });
          }
        } catch (error) {
          console.log(error);
          res.status(500).send({
            status: 'error',
            message: 'Error interno del servidor'
          });
        }
      })
    
    .post('/', async (req, res) => {
        try {
          const result = await cartsServices.createCart();
          res.send({
            status: 'success',
            payload: result
          });
        } catch (error) {
          console.log(error);
          res.status(500).send({
            status: 'error',
            message: 'Error interno del servidor'
          });
        }
      })

      .post('/:cid/product/:pid', async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const result = await cartsServices.addProductToCart(parseInt(cid), parseInt(pid));
      if (typeof result === 'string') {
        res.status(404).send({
          status: 'error',
          message: result
        });
      } else {
        res.send({
          status: 'success',
          payload: result
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 'error',
        message: 'Error interno del servidor'
      });
    }
    })
 module.exports = router;