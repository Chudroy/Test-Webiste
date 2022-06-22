const express = require('express');
const app = require('../app');
const Product = require('../models/product');
const router = express.Router();

const categories = ["fruit", "vegetable", "dairy", "mushroom"]

/* GET users listing. */
router.get('/', async (req, res, next) => {
    let products = null
    let title = "All Products"
    const { category } = req.query
    if (category) {
        products = await Product.find({ category: category })
        title = category
    } else {
        products = await Product.find({})
    }

    res.render('products/allProducts', { title, products });
});

router.get("/new", (req, res) => {
    res.render("products/new", { categories })
})

router.post("/", async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    console.log(newProduct)
    res.redirect(`products/${newProduct.id}`)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const foundProduct = await Product.findById(id)
    res.render("products/showProduct", { foundProduct })
})

router.get("/:id/edit", async (req, res) => {
    const { id } = req.params
    const editProduct = await Product.findById(id);
    res.render("products/edit", { editProduct, categories })
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body,
        {
            runValidators: true,
            new: true
        })
    res.redirect(`${product._id}`)

})

router.delete("/:id", async (req, res) => {
    console.log("deleting")
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect("/products")
})

module.exports = router;