const {Router} = require('express')

const router = Router()

router.get('/', (req, res)=>{
    res.render('index', {title: 'Ecommerce', name: 'alexia'})
  })

module.exports = router