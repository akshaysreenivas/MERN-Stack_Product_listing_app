import React, { useState } from "react";
import { toast } from "react-toastify";
import { addProduct } from "../axios";
import { Button, Form } from "react-bootstrap";

const AddProducts = ({ onSubmit }) => {
  let categories = ["m", "k"];
  const [state, setState] = useState({
    name: "",
    categoryId: "", // Assuming you have a select input for choosing the category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    if (!state.name || state.name.match(/^\s*$/))
      return toast.error("Valid product name required ");
    if (!state.categoryId || state.categoryId.match(/^\s*$/))
      return toast.error("Valid categoryId required ");
    try {
      await addProduct(state);
      setState({ categoryName: "", ParentCategory: "" });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="form rounded p-3 m-3 ">
      <h2>Add Product</h2>
      <div>  
        <Form.Group controlId="ProductName" className="my-3 mx-2">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Product name"
          value={state.name}
          name="name"
          onChange={handleChange}
          required
        />
      </Form.Group>
        <div>
          <label htmlFor="categoryId">Category </label>
          <select
            id="categoryId"
            name="categoryId"
            value={state.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3  text-center">
          <Button
            variant="primary"
            type="button"
            varient
            onClick={handleSubmit}
          >
            Add Product
          </Button>
          
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
