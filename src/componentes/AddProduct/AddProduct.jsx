import React, { useState, useEffect } from "react";
import { productsAndCats } from "../../store/Globals";
import { Input } from "./../Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddProduct = () => {
  const navigate = useNavigate();

  // query params
  const queryParameters = new URLSearchParams(window.location.search);
  let productIndex = queryParameters.get("product");

  // product
  const [productToEdit, setProductToEdit] = useState({});

  // inputs
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState();
  const [stock, setStock] = useState();
  const [stockLimit, setStockLimit] = useState();
  const [categories, setCategories] = useState([]);
  const [catOption, setCatOption] = useState("");

  // not inputs
  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [id, setId] = useState(currentTime);
  const [discount, setDiscount] = useState(0);
  const [products, setProducts] = useState([]);
  // just to re-render the component
  const [check, setCheck] = useState(false);

  useEffect(() => {
    axios.get(productsAndCats + "categories.json").then((response) => {
      setCategories(response.data);
    });

    axios.get(productsAndCats + "products.json").then((res) => {
      console.log(res.data);
      setProducts(res);

      if (productIndex !== null) {
        setProductToEdit(() => res.data[+productIndex]);
        setName(productToEdit?.name);
        setDescription(productToEdit?.description);
        setImage(productToEdit?.image);
        setPrice(productToEdit?.price);
        setStock(productToEdit?.stock);
        setStockLimit(productToEdit?.stockLimit);
        setCatOption(productToEdit?.category);
        setDiscount(productToEdit?.discount);
        setId(productToEdit?.id);
        setCurrentTime(productToEdit?.createdAt);
        setCheck(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  const handleSubmission = async (event) => {
    event.preventDefault();

    const newObject = {
      id: id,
      name: name,
      price: price,
      description: description,
      image: image,
      stock: +stock,
      stockLimit: +stockLimit,
      category: catOption,
      discount: +discount,
      createdAt: new Date(currentTime),
    };

    // get prev data
    const data = (await products.data) || [];
    console.log(data);

    if (productIndex !== null) {
      data.splice(+productIndex, 1);
    }
    // add new product to data array
    data.push(newObject);

    // put new data
    await fetch(`${productsAndCats}/products.json`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    // reset values
    setName("");
    setDescription("");
    setImage("");
    setPrice("");
    setStock("");
    setStockLimit("");
    setCatOption("");
    setDiscount("");
    setId("");
    setCurrentTime(new Date().getTime());

    // alert
    if (productIndex !== null) {
      alert("Product Has been Edited Successfully");
    } else {
      alert("Product Added Successfully");
    }
    navigate("/products");
  };

  return (
    <div className="AddProduct cardStyle container text-end">
      <form onSubmit={handleSubmission} action="">
        {/* name */}
        <Input
          label="اسم&#160;المنتج"
          name="name"
          type="text"
          value={name}
          setValue={setName}
          inputClass="rtl"
        />

        {/* description */}
        <Input
          label="الوصف"
          name="description"
          type="text"
          value={description}
          setValue={setDescription}
          inputClass="rtl"
        />

        {/* image */}
        <Input
          label="رابط&#160;صورة&#160;المنتج"
          name="image"
          type="url"
          value={image}
          setValue={setImage}
        />

        <div className="d-flex justify-content-between flex-row-reverse">
          {/* sell_price */}
          <Input
            wrapperClass="my-3 w-100"
            label="سعر&#160;المنتج"
            name="price"
            type="number"
            value={price}
            setValue={setPrice}
          />

          {/* stock */}
          <Input
            wrapperClass="my-3 w-100 me-3"
            label="المتاح&#160;بالمخزن"
            name="description"
            type="number"
            value={stock}
            setValue={setStock}
          />

          {/* stock limit */}
          <Input
            wrapperClass="my-3 w-100 me-3"
            label="حد&#160;الطلب"
            name="description"
            type="number"
            value={stockLimit}
            setValue={setStockLimit}
          />
        </div>

        {/* categories */}
        {categories ? (
          <>
            <label className="mb-1" htmlFor="category">
              اختار&#160;فئة
            </label>
            <select
              value={catOption}
              required
              onChange={(choice) => {
                let val = choice.target.value;
                setCatOption(val);
              }}
              className="form-select"
              name="category"
            >
              <option value="" disabled={true}>
                اختر فئة
              </option>
              {categories.map((elm) => {
                return (
                  <option key={elm.id} value={JSON.stringify(elm)}>
                    {elm.name}
                  </option>
                );
              })}
            </select>
          </>
        ) : (
          <h1>Add Category First</h1>
        )}

        <div className="text-end">
          {categories ? (
            <input
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              className="btn btn-primary my-4 px-5"
              type="submit"
            />
          ) : (
            <button className="btn btn-primary my-4 px-5" disabled={true}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
