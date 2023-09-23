import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { addCategory, getCategories } from "../axios";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const [state, setState] = useState({ categoryName: "", ParentCategory: "" });
  const [categories, setCategories] = useState([]);

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  
  const handleCategoryAdd = async () => {
    if (!state.categoryName || state.categoryName.match(/^\s*$/))
      return toast.error("Valid category name required ");
    try {
      const { data } = await addCategory(state);
      if (data.status) {
        toast.success("Scuccessfully added Category ", state.categoryName);
        setState({ categoryName: "", ParentCategory: "" });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCategory = async () => {
    try {
      const { data } = await getCategories (state);
      if (data) {
        setCategories(data)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCategory()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="form rounded p-3 mt-5 mx-auto">
      <h2 className="mb-3">Add Category</h2>
      <Form.Group controlId="categoryName" className="my-3 mx-2">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category name"
          value={state.categoryName}
          name="categoryName"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="parentCategory">
        <Form.Label>Parent Category (optional):</Form.Label>
        <select
          id="ParentCategory"
          name="ParentCategory"
          value={state.ParentCategory}
          onChange={handleInputChange}
          required
          className="mx-2"
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </Form.Group>
      <div className="mt-3  text-center">
        <Button variant="primary" type="button" onClick={handleCategoryAdd}>
          Add Category
        </Button>
      </div>
    </div>
  );
};

export default CategoryForm;
