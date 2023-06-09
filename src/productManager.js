//const fs = require("fs")
import fs from 'fs'

export default class ProductManager {

    constructor() {

        this.path = "src/files/productos.json"
        this.products = []
    }


    addProduct = async (id, title, descripcion, price, code, stock) => {

        let productN = {
            id,
            title,
            descripcion,
            price,
            code,
            stock,

        }
        //console.log(productN)
        this.products.push(productN);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
    };

    getProducts = async () => {


        if (fs.existsSync(this.path)) {
            let data = await fs.promises.readFile(this.path, "utf-8")

            let products = JSON.parse(data)


            return products;

        } else {

            return []
        }



        // await fs.promises.readFile(this.path, "utf-8")
    };


    read = async () => {

        let leerarchivo = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(leerarchivo)
    }
    getProductsById = async (id) => {
        let buscarp = await this.read()
        if (!buscarp.find(product => product.id == id)) {

          //  console.log("producto no encontrado")
            return "Producto no encontrado";
        } else {
            return (buscarp.find(product => product.id == id));
           // console.log(buscarp.find(product => product.id == id))
        }


    }

    deleteProduct = async (id) => {

        let borrar = await this.read();
        let borrar2 = borrar.filter(products => products.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(borrar2, null, '\t'));
        console.log("producto eliminado")
    };

    updateProducts = async ({id, ...product}) => {
        await this.deleteProduct(id);
        let old = await this.read()
        let modificado = [{ id, ...product }, ...old];
       // console.log(modificado)
       await fs.promises.writeFile(this.path, JSON.stringify(modificado, null, '\t'))
    };


}

var idCounter = 0;
function uniqueId(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
};
/*
const producto = new ProductManager();

producto.addProduct(uniqueId(), "Papas Fritas", "paquete de papas de 1000g", 3000, 345345, 45);
producto.addProduct(uniqueId(), "Salsa de tomate", "paquete de salsa de tomate de 100g", 13000, 1251256, 45);
producto.addProduct(uniqueId(), "Salsa mayonesa", "paquete de salsa de 1000g", 13000, 125125, 45);
producto.addProduct(uniqueId(), "aguacate", "paquete de 6 ahuacates", 15000, 12521, 20);
producto.addProduct(uniqueId(), "tomates", "paquete de tomates de 1000g", 8000, 1525, 45);
producto.addProduct(uniqueId(), "mantequila", "paquete de mantequilla ed 1000g", 1245, 0006, 45);
producto.addProduct(uniqueId(), "leche", "paquete de 6 bolsas de 1000g", 23000, 124, 45);

producto.getProducts();
producto.getProductsById(2);
producto.deleteProduct(7);

producto.updateProducts({
    id: 3 ,
    title: "Salsa mayonesa",
    descripcion:"paquete de salsa de 1000g",
    price: 12500,
    code: 125125,
    stock: 30,
});*/