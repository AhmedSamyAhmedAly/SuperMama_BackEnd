const Product = require('../models/Product')

exports.getProducts = async (req, res) => {
    try {
        // const userById = await User.findById(req.signedData.id);
         //  const userById = await User.findById(req.signedData.id);
         const { name, category, brand, maxPrice, minPrice, id, latestdate, oldestdate } = req.query;
         if (name) {
             products = await Product.find({ name: name });
         } else if (category) {
             products = await Product.find({ category: category });
         } else if (brand) {
             console.log(req.params)
             products = await Product.find({ brand: brand });
         } else if (maxPrice) {
             products = await Product.find().sort({ price: -1 });
         } else if (minPrice) {
             products = await Product.find().sort({ price: 1 });
         } else if (latestdate) {
             products = await Product.find().sort({ createdAt: 'desc' }).exec();
         } else if (oldestdate) {
             products = await Product.find().sort({ createdAt: 'asc' }).exec();;
         } else if (id) {
             products = await Product.find({ _id: id });
         } else {
             products = await Product.find({});
         }
 
         const obj = {
             statusCode: 201,
             success: true,
             products: products
         }
         res.send(obj)
     } catch (err) {
         res.json({ statusCode: 422 ,success: false, message: err.message });
     }
   
}
exports.getProductsByID = async (req, res) => {
    try {
        products = await Product.find({ _id:req.params.id });
        const obj = {
            statusCode: 201,
            success: true,
            products: products
        }
        res.send(obj)
     
    } catch (err) {
        res.json({ statusCode: 422 ,success: false, message: err.message });

    }
   
}
exports.getCategories = async (req, res) => {
    try {
        // const { category } = req.query;
         products = await Product.find({});
         const CategoryArr = []
         for (let c in products) {
             if (!CategoryArr.includes(c.category)) {
                 CategoryArr.push(c.category);
             }
         }
         const obj = {
             statusCode: 201,
             success: true,
             categories: CategoryArr
         }
         res.send(obj)
     } catch (err) {
         res.json({ statusCode: 422 ,success: false, message: err.message });
 
     }
   
}
exports.getBrands = async (req, res) => {
    try {
        //   const { brand } = req.query;
           products = await Product.find({});
           const brandArr = []
           for (let c in products) {
               if (!brandArr.includes(c.brand)) {
                   brandArr.push(c.brand);
               }
           }
           const obj = {
               statusCode: 201,
               success: true,
               brands: brandArr
           }
           res.send(obj)
       } catch (err) {
           res.json({ statusCode: 422 ,success: false, message: err.message });
   
       }
   
}