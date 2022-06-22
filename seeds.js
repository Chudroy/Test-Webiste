const mongoose = require("mongoose")
const Product = require("./models/product")

mongoose.connect('mongodb://localhost:27017/shopApp')
    .then(() => {
        console.log("connected")
    })
    .catch((err) => {
        console.log("there was an error")
        console.log(err)
    })

const p = new Product()

const seedProducts = [
    {
        name: "Tomato",
        price: 1,
        category: "vegetable"
    },
    {
        name: "Orange",
        price: 0.5,
        category: "fruit"
    },
    {
        name: "Broccoli",
        price: 0.99,
        category: "vegetable"
    },
    {
        name: "Milk",
        price: 0.7,
        category: "dairy"
    },
    {
        name: "Cheese",
        price: 2.5,
        category: "dairy"
    },
    {
        name: "Carrot",
        price: 0.25,
        category: "vegetable"
    },
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    }).catch(err => {
        console.log(err)
    })