const mongoose=require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
},{ timestamps: true });
  
const Product = mongoose.model("Product", productSchema);
module.exports = {Product};