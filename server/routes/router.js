const { addCategory, addProduct, getCategories, getProducts } = require("../controllers/controller");

const router = require("express").Router();


// Add categories
router.post("/api/add_category",addCategory);

// Add Products 
router.post("/api/add_product",addProduct);

// Products Listing   
router.get("/api/get_products",getProducts);

// category Listing   
router.get("/api/get_categories",getCategories);



module.exports = router;