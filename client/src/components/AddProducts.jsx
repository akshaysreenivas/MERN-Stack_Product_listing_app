import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addProduct, getCategories } from "../axios";
import { Button,  Form } from "react-bootstrap";
import NestedSelect from "./NestedDropdown";

const AddProducts = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async () => {
    if (!name || name.match(/^\s*$/))
      return toast.error("Valid product name required ");
    if (!selectedCategory || selectedCategory.match(/^\s*$/))
      return toast.error("Valid categoryId required ");
    try {
      await addProduct({ name, categoryId: selectedCategory });
      toast.success("Scuccessfully added Product ", name);

      setName("");
      setSelectedCategory("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getCategory = async () => {
    try {
      const { data } = await getCategories();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="form rounded p-3 mt-5 mx-auto">
      <h2>Add Product</h2>
      <div>
        <Form.Group controlId="ProductName" className="my-3 mx-2">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product name"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <div>
          <label className="mx-2" htmlFor="categoryId">
            Category{" "}
          </label>

          <NestedSelect
            categories={categories}
            onChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
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
