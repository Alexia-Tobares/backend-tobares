const fs = require('fs')

class ProductManager{
    products = []
    id = 0
    constructor(path){
        this.path = path
    }
    
   async getProducts(){
        let productsInFile = await fs.promises.readFile('products.json', 'utf-8')
        productsInFile = JSON.parse(productsInFile)
        console.log(productsInFile)
        return productsInFile
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        if(!title || !description || !price || !thumbnail || !code || !stock){
            console.error( 'Error! Debe completar todos los campos')
            return
        }
        const previousProduct = this.products.find((element)=> element.code === code)
        previousProduct ? console.error('Error! No puedes repetir el codigo') : this.products.push({id:this.id++, title, description, price, thumbnail, code, stock})
        const productsEnString = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile('products.json', productsEnString)
    }

    async getProductById(id){
        let productsEnArchivo = await fs.promises.readFile('products.json', 'utf-8')
        productsEnArchivo = JSON.parse(productsEnArchivo)
        const searchedProduct = productsEnArchivo.find((element)=> element.id === id)
        return searchedProduct ? console.log(searchedProduct) : console.error('Error! No se ha encontrado el producto')
    }

    async updateProduct(id, updatedFields) {
        let productsEnArchivo = await fs.promises.readFile('products.json', 'utf-8');
        let productsEnArray = JSON.parse(productsEnArchivo);

        const index = productsEnArray.findIndex((element) => element.id === id);

        if (index !== -1) {
            productsEnArray[index] = { ...productsEnArray[index], ...updatedFields, id };
            const productsEnString = JSON.stringify(productsEnArray, null, 2);
            await fs.promises.writeFile('products.json', productsEnString);
            console.log('Producto actualizado:', productsEnArray[index]);
        } else {
            console.error('Error! Producto no encontrado');
        }
    }

    async deleteProduct(id) {
        let productsEnArchivo = await fs.promises.readFile('products.json', 'utf-8');
        let productsEnArray = JSON.parse(productsEnArchivo);

        const index = productsEnArray.findIndex((element) => element.id === id);

        if (index !== -1) {
            const deletedProduct = productsEnArray.splice(index, 1);
            const productsEnString = JSON.stringify(productsEnArray, null, 2);
            await fs.promises.writeFile('products.json', productsEnString);
            console.log('Producto eliminado:', deletedProduct[0]);
        } else {
            console.error('Error! Producto no encontrado');
        }
    }
}


module.exports = ProductManager;