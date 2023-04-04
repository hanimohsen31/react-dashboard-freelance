import React, { useState, useEffect } from "react";
import { productsAndCats } from "../../store/Globals";
import { Card } from "./Card";

export const ProductsCards = () => {
  const [finalArray, setFinalArray] = useState([]);

  useEffect(() => {
    // GET :: calling data from firebase
    const GetDataFromFireBase = async () => {
      const response = await fetch(`${productsAndCats}/products.json`);
      if (!response.ok) {
        console.log("ERROR");
      }
      const data = await response.json();

      if (data == null) {
        setFinalArray([]);
      } else {
        setFinalArray(data);
      }
      return finalArray;
    };
    GetDataFromFireBase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="ProductsCards row">
      {finalArray.map((elm , indx) => (
        <Card key={indx} product={elm} />
      ))}
    </div>
  );
};
