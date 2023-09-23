import React from 'react';

const NestedSelect = ({ categories, onChange, selectedCategory }) => {
  return (
    <select value={selectedCategory} onChange={onChange}>
      <option value="">Select Category</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
      {categories.map((category) => (
        <optgroup key={category._id} label={category.name}>
          <NestedSelect
            categories={category.children}
            onChange={onChange}
            selectedCategory={selectedCategory}
          />
        </optgroup>
      ))}
    </select>
  );
};

export default NestedSelect;
