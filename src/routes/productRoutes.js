const express = require("express");
const router = express.Router();
const Products = require("../models/productSchema");
const mongoose = require("mongoose");



// create Studesnts
router.post("/addProducts", async (req, res) => {
    console.log(req.body)
    const { name, price, category, tags, specifications } = req.body
    try {
        const productData = new Products({
            _id: new mongoose.Types.ObjectId(),
            name, price, category, tags, specifications

        });
        const result = await productData.save();
        res.json(result);
    } catch (error) {
        console.log("error", error)
        res.json("something went wrong when adding product")
    }
})

// get students
// Read users data
router.get("/products", async (req, res) => {
    const productsData = await Products.find();
    res.json(productsData);
});

// delete students
router.delete("/deleteProduct/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Products.findByIdAndRemove(productId);
        console.log("deletedUser : ", deletedProduct);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found!" });
        }

        return res.json({ message: "Product deleted successfuly!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// update students
router.put("/updateProduct/:id", async (req, res) => {
    try {
        const { name, price, category, tags, specifications } = req.body
        const productId = req.params.id;
        const productUpdate = new Products({
            name, price, category, tags, specifications
        });

        const updatedProducts = await Products.findByIdAndUpdate(productId, productUpdate, {
            new: true,
        });
        console.log("updatedData : ", updatedProducts);

        if (!updatedProducts) {
            return res.status(404).json({ message: "Product not found!" });
        }

        return res.json({ message: "product updated successfuly!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;