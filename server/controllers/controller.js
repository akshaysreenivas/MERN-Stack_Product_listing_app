const { default: mongoose } = require("mongoose");
const { Category } = require("../models/CategoriesModel");
const { Product } = require("../models/ProductsModel");
const { default: slugify } = require("slugify");


function createCategories(categories, parentId = null) {
	const categoriesList = [];
	let category;
	if (parentId === null) {
		category = categories.filter(item => item.parentId === undefined || item.parentId === null);
	} else {
		category = categories.filter(item => item.parentId && item.parentId.toString() === parentId.toString());
	}

	for (let item of category) {
		categoriesList.push({
			_id: item._id,
			name: item.name,
			slug: item.slug,
			parent:item.parentId,
			children: createCategories(categories, item._id)
		});
	}

	console.log(categoriesList);
	return categoriesList;
}


module.exports.addProduct = async (req, res) => {
	try {
		console.log(req.body);
		if (!req.body.name || !req.body.categoryId) return res.status(400).json({ message: "All fields required" });
		const categoryId =new mongoose.Types.ObjectId(req.body.categoryId);
		// Create a new product instance
		const newProduct = new Product ({
			name:req.body.name,
			slug: slugify(req.body.name),
			category: categoryId, 
		});

		// Save the new product to the database
		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct); 
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports.getProducts = async (req, res) => {
	try {
	
		// Save the new product to the database
		const Products = await Product.find().populate("category").lean();

		res.status(201).json(Products); // Respond with the saved product
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};

module.exports.addCategory = async (req, res) => {
	try {
		if (!req.body.categoryName) return res.status(400).json({ message: "All fields required" });

		const categoryObj = {
			name: req.body.categoryName,
			slug: slugify(req.body.categoryName)
		};
		if (req.body.ParentCategory) {
			categoryObj.parentId = req.body.ParentCategory;
		}
		const newCategory = new Category(categoryObj);

		await newCategory.save();

		res.status(201).json({status:true});
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};


module.exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.find().lean();
		if (!categories) return res.status(400).json({ message: "Server error" });

		// creating a nested categories list     
		const categoryList = await createCategories(categories);

		res.status(200).json(categoryList);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Server error" });
	}
};