import React, { useState, useEffect } from "react";
import { productsAndCats } from "../../store/Globals";
import { Input } from "./../Input/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddCategory = () => {
  const navigate = useNavigate();

  // query params
  const queryParameters = new URLSearchParams(window.location.search);
  let categoryIndex = queryParameters.get("category");

  // product
  const [categoryToEdit, setCategoryToEdit] = useState({});

  const [currentTime, setCurrentTime] = useState(new Date().getTime());
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState(currentTime);
  const [value, setValue] = useState(currentTime);
  const [category, setCategory] = useState([]);

  // just to re-render the component
  let [check, setCheck] = useState(false);

  useEffect(() => {
    axios.get(productsAndCats + "categories.json").then((response) => {
      if (response.data !== null) {
        setCategory(response.data);
      }

      if (categoryIndex !== null) {
        setCategoryToEdit(() => response.data[+categoryIndex]);
        setName(categoryToEdit?.name);
        setImage(categoryToEdit?.image);
        setId(categoryToEdit?.id);
        setValue(categoryToEdit?.value);
        setCheck(true);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  const handleSubmission = async (event) => {
    event.preventDefault();

    const newObject = {
      name: name,
      image: image,
      id: id,
      value: value,
    };

    // get prev data
    const data = await category;

    if (categoryIndex !== null) {
      data.splice(+categoryIndex, 1);
    }

    // add new product to data array
    data.push(newObject);

    // put new data
    await fetch(`${productsAndCats}/categories.json`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    // reset values
    setName("");
    setImage("");
    setCurrentTime(new Date().getTime());

    // alert

    if (categoryIndex !== null) {
      alert("Category Has been Edited Successfully");
    } else {
      alert("Category Added Successfully");
    }
    navigate("/categories");
  };

  return (
    <div className="AddCategory cardStyle container text-end">
      <form onSubmit={handleSubmission} action="">
        {/* name */}
        <Input
          label="اسم&#160;الفئة"
          name="name"
          type="text"
          value={name}
          setValue={setName}
          inputClass="rtl"
        />
        {/* image */}
        <Input
          label="رابط&#160;صورة&#160;الفئة"
          name="image"
          type="url"
          value={image}
          setValue={setImage}
        />
        <div className="text-end">
          <input
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-primary my-4 px-5"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};
