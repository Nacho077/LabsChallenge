const { Product, Attribute, Search } = require('../db.js')
const axios = require('axios')

function addSearch(q, offset, finalSet){
    return Search.findOrCreate({
        where:{
            name: q
        }
    })
    .then(([search]) => this.addProducts(q, offset, finalSet, search.id))
}

var arr = []
function addProducts(q, offset, finalSet, searchId){
    return axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${q}&offset=${offset * 50}&limit=50`)
    .then(({data}) => {
        for(var i = 0; i < data.results.length; i++){
            arr.push(Product.findOrCreate({
                where:{
                    name: data.results[i].title,
                    pais: data.results[i].seller_address.country.name,
                    city: data.results[i].seller_address.city.name,
                    prov: data.results[i].seller_address.state.name,
                    condition: data.results[i].condition,
                    currency_id: data.results[i].currency_id,
                    available_quantity: data.results[i].available_quantity,
                    price: data.results[i].price,
                    seller_reputation_level: data.results[i].seller.seller_reputation && data.results[i].seller.seller_reputation.level_id || null,
                    img: data.results[i].thumbnail,
                    acept_MP: data.results[i].accepts_mercadopago,
                    searchId: Number(searchId),
                    product_id: data.results[i].id,
                    permalink: data.results[i].permalink
                }
            }))
        }
        arr.push(Search.update({total_products: data.paging.total}, {where: {name: q }}))
        return arr
    })
    .then(() => {
        if(finalSet > offset){
            return this.addProducts(q, Number(offset) + 1, Number(finalSet), searchId)
        }else{
            return this.read(q)
        }
    })
}

function read(q){
    return Search.findOne({
        where:{
            name: q
        },
        attributes: ['total_products', 'name'],
        include:{
            model: Product
        },
        order: [
            [Product, 'id']
        ]
    })
    .then(r => {
        arr = []
        return r
    })
}

function getCategories(){
    return axios.get('https://api.mercadolibre.com/sites/MLA/categories')
    .then(({data}) => data)
}

var prod = []
var idProd = 0
function getProduct(id){
    return Product.findOne({
        where: {
            product_id: id
        }
    })
    .then(r => {
        idProd = r.id
        return this.addAttributes(id)
    })
}

function addAttributes(id){
    return axios.get(`https://api.mercadolibre.com/items/${id}`)
    .then(({data}) => {
        prod.push(Product.update({seller_id: data.seller_id},{where: {id: idProd}}))
        prod.push(Product.update({sold_quantity: data.sold_quantity},{where: {id: idProd}}))

        for(var i = 0; i < data.sale_terms.length; i++){
            prod.push(Attribute.findOrCreate({
                where: {
                    name: data.sale_terms[i].name,
                    value: data.sale_terms[i].value_name,
                    productId: idProd 
                }
            }))
        }
        for(var i = 0; i < data.pictures.length; i++){
            prod.push(Attribute.findOrCreate({
                where: {
                    name: 'pictures',
                    value: data.pictures[i].url,
                    productId: idProd 
                }
            }))
        }
        for(var i = 0; i < data.attributes.length; i++){
            prod.push(Attribute.findOrCreate({
                where: {
                    name: data.attributes[i].name,
                    value: data.attributes[i].value_name,
                    productId: idProd 
                }
            }))
        } 
        return Promise.all(prod)
    })
    .then(() => {
        return this.addDescription(idProd, id)
    })
}

function addDescription(idProd, id){
    return axios.get(`https://api.mercadolibre.com/items/${id}/descriptions`)
    .then(({data}) => Product.update({description: data[0].plain_text}, {where: {id: idProd}}))
    .then(() => this.readProduct(idProd))
}

function readProduct(id){
    return Product.findOne({
        where:{
            id: id
        },
        attributes: [
            'name',
            'pais',
            'city',
            'prov',
            'condition',
            'currency_id',
            'available_quantity',
            'price',
            'seller_reputation_level',
            'acept_MP',
            'sold_quantity',
            'seller_id',
            'description',
            'product_id',
            'id',
            'permalink'
        ],
        include:[
            {
                model: Attribute,
                attributes: ['value', 'name']
            }
        ]
    })
    .then(r => {
        idProd = 0
        prod = []
        return r
    })
}

function readCats(id, offset, finalset){
    return Search.findOrCreate({
        where: {
            name: id
        }
    })
    .then(([r]) => this.addProductsToCat(id, offset, finalset, r.id))
}

function addProductsToCat(id, offset, finalSet, searchId){
    return axios.get(`https://api.mercadolibre.com/sites/MLA/search?category=${id}`)
    .then(({data}) => {
        for(var i = 0; i < data.results.length; i++){
            arr.push(Product.findOrCreate({
                where:{
                    name: data.results[i].title,
                    pais: data.results[i].seller_address.country.name,
                    city: data.results[i].seller_address.city.name,
                    prov: data.results[i].seller_address.state.name,
                    condition: data.results[i].condition,
                    currency_id: data.results[i].currency_id,
                    available_quantity: data.results[i].available_quantity,
                    price: data.results[i].price,
                    seller_reputation_level: data.results[i].seller.seller_reputation && data.results[i].seller.seller_reputation.level_id || null,
                    img: data.results[i].thumbnail,
                    acept_MP: data.results[i].accepts_mercadopago,
                    searchId: Number(searchId),
                    product_id: data.results[i].id,
                    permalink: data.results[i].permalink
                }
            }))
        }
        arr.push(Search.update({total_products: data.paging.total}, {where: {id: searchId }}))
        return arr
    })
    .then(() => {
        if(finalSet > offset){
            return this.addProductsToCat(id, Number(offset) + 1, Number(finalSet), searchId)
        }else{
            return this.addSubCats(id, searchId)
        }
    })
}

var subCats = []
function addSubCats(id, searchId){
    return axios.get(`https://api.mercadolibre.com/categories/${id}`)
    .then(({data}) => {
        subCats.push(Attribute.findOrCreate({
            where: {
                name: 'pictures',
                value: data.picture,
                searchId: Number(searchId)
            }
        }))
        for(var i = 0; i < data.children_categories.length; i++){
            subCats.push(Attribute.findOrCreate({
                where: {
                    name: data.children_categories[i].id,
                    value: data.children_categories[i].name,
                    searchId: Number(searchId)
                }
            }))
        }
        return Promise.all(subCats)
    })
    .then(() => {
        return this.readCat(id)
    })
}

function readCat(id){
    return Search.findOne({
        where:{
            name: id
        },
        attributes: ['total_products', 'name'],
        include:[{
            model: Product
        },{
            model: Attribute,
            attributes: ['name', 'value']
        }],
        order: [
            [Product, 'id']
        ]
    })
    .then(r => {
        arr = []
        subCats = []
        return r
    })
}

module.exports = {
    addSearch,
    addProducts,
    read,
    getCategories,
    getProduct,
    addAttributes,
    addDescription,
    readProduct,
    readCats,
    addProductsToCat,
    addSubCats,
    readCat,
}