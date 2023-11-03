class ProductManager{
    array1 = []
    constructor(){}
    getProducts(){
        console.log(this.array1)
    }
    addProduct(title, description, price, thumbnail, code, stock){
        const previousProduct = this.array1.find((element)=> element.code === code)
        if (previousProduct){
            console.log('Error! No puedes repetir el codigo')
        }else{
            this.array1.push({id:Math.random(), title, description, price, thumbnail, code, stock})
        }
        

    }
    getProductById(id){
        const searchedProduct = this.array1.find((element)=> element.id === id)
        if(searchedProduct){
            return searchedProduct
        }else{
            console.log('Error! No se ha encontrado el producto')
        }
    }
}

const product = new ProductManager()
product.getProducts()
product.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25)
product.getProducts()
product.addProduct('producto nuevo', 'Este es un producto nuevo', 100, 'Sin imagen', 'abc123', 15)
