const express = require('express');
const router = new express.Router();

const Product = require("../models/Product");
const ProductHelper = require("../routers_helpers/ProductRouterHelper");


///api to create new product
router.post('/', async(req, res) => {
    try {
        req.body.totalRating = 1;
        const { name, category, brand, numberInStock, price } = req.body ////required fields
        if (name && category && brand && numberInStock && price) {
            const product = await Product.create(req.body)
            const obj = {
                success: true,
                message: "product was created succesfully",
                product: product
            }
            res.send(obj)
        } else throw new Error("name ,category ,brand,numberInStock and price are required")
    } catch (err) {
        res.send({ success: false, message: err.message })
    }
})

///MANIPULATE product comments with ID
router.route('/:id')
    .delete(async(req, res) => { ///delete product
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndDelete(id)
            const obj = {
                success: true,
                message: (product) ? "product deleted successfully" : "product not found"
            }
            res.send(obj)
        } catch (err) {
            res.json({ success: false, message: err.message })
        }
    })
    .patch(async(req, res) => { ///edit product
        try {
            const { id } = req.params;
            const { name, description, category, brand, numberInStock, price } = req.body
            const product = await Product.findByIdAndUpdate(id, { name, description, category, brand, numberInStock, price }, { returnOriginal: false })
            const obj = {
                success: true,
                message: (product) ? "product edited successfully" : "product not found",
                product: product
            }
            res.send(obj);
        } catch (err) {
            res.json({ success: false, message: err.message })
        }
    })


///MANIPULATE product rating
router.route('/:id')
    .patch(async(req, res) => { ///delete rating
        try {
            const { id } = req.params;
            const ratingValue = req.query
            const userId = req.signedData;
            const product = await Product.findById(id)
            const total = product.totalRating
            product.ratings.forEach(element => {
                if (element.user == userId) {
                    product.totalRating = (total * 2) - element.rating; ///delete old rating from total rating
                    element.rating = ratingValue;
                    product.totalRating = (total + ratingValue) / 2; ///update total rating with new rating
                    //break;
                }
            });
            await product.save();
            const obj = {
                success: true,
                message: (product) ? "product rating deleted successfully" : "rating not found"
            }
            res.send(obj)
        } catch (err) {
            res.json({ success: false, message: err.message })
        }
    })


///add comment
router.post('/:id/comments', async(req, res) => {
    try {
        const { id } = req.params; ///product id
        const { body } = req.body
        const userId = req.signedData;
        if (body) {
            const comment = {
                body,
                user: userId
            };
            let product = await Product.findById(id)
            product.comments.push(comment);
            product.save();
            const obj = {
                success: true,
                message: "comment was added succesfully",
                product: product
            }
            res.send(obj)
        } else throw new Error("comment body is required")
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
})

///delete comment
router.delete('/:productId/comments/:commentId', async(req, res) => {
    try {
        const { productId, commentId } = req.params;
        const product = await Product.findByIdAndDelete(productId, { $pull: { comments: { $elemMatch: { _id: commentId } } } }, { returnOriginal: false })

        const obj = {
            success: true,
            message: (product) ? "product deleted successfully" : "product not found"
        }
        res.send(obj)
    } catch (err) {
        res.json({ success: false, message: err.message })
    }
})






router.get('/', ProductHelper.getProducts)

router.get('/:id', ProductHelper.getProductsByID)

router.get('/getCategory', ProductHelper.getCategories)

router.get('/getBrand', ProductHelper.getBrands)


module.exports = router;