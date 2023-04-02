import React, { useState } from "react";
import Select from "react-select";
import './table.css'
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const categoryOptions = [
  { value: "fruit", label: "Fruit" },
  { value: "vegetable", label: "Vegetable" },
  { value: "meat", label: "Meat" }
];

const productOptions = {
  fruit: [
    { value: "ProductSelectorle", label: "ProductSelectorle" },
    { value: "orange", label: "Orange" },
    { value: "banana", label: "Banana" }
  ],
  vegetable: [
    { value: "carrot", label: "Carrot" },
    { value: "tomato", label: "Tomato" },
    { value: "broccoli", label: "Broccoli" }
  ],
  meat: [
    { value: "chicken", label: "Chicken" },
    { value: "beef", label: "Beef" },
    { value: "pork", label: "Pork" }
  ]
};

const ProductSelector = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    setSelectedProducts([]);
  };

  const handleProductChange = (selectedOptions) => {
    setSelectedProducts(selectedOptions);
  };

  const getProductOptions = () => {
    let options = [];
    selectedCategories.forEach((category) => {
      options = options.concat(productOptions[category.value]);
    });
    return options;
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div />
        <h1 className="text-center">MULTI SELECT DROPDOWN</h1>
        <Link to='/'> <button className="btn btn-info text-light">Back to Home</button></Link>
      </div>
      <div className="d-flex justify-content-between mt-5">
        <div className="w-75 m-3" >
          <h3 className="text-dark font-weight-bold">Select Categories</h3>
          <Select
            isMulti
            options={categoryOptions}
            value={selectedCategories}
            onChange={handleCategoryChange}
          />
        </div>
        <div className="w-75 m-3">
          <h3 className="text-dark font-weight-bold">Select Products</h3>
          <Select
            isMulti
            options={getProductOptions()}
            value={selectedProducts}
            onChange={handleProductChange}
          />
        </div>
      </div>
      <h3 className="text-dark font-weight-bold mt-5 mx-auto d-flex justify-content-center">Selected Products</h3>
      <div className="d-flex justify-content-start flex-wrap ">
        {selectedProducts.map((product) => (
          <div key={product.value} className="alert alert-success m-2 " style={{ width: "fit-content" }}>
            <p className="m-0"> {product.label}{" "}
            &nbsp;            &nbsp;
              <button
                onClick={() =>
                  setSelectedProducts(selectedProducts.filter((p) => p !== product))
                }
                className="rounded alert alert-danger p-1"
              >
                <MdDelete className="" />
              </button></p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductSelector;
