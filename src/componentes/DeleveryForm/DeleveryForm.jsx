import React, { useState } from "react";
import { productsAndCats } from "../../store/Globals";
import { Input } from "../Input/Input";

export const DeleveryForm = () => {
  // const time = useRef();
  // const cost = useRef();
  const [time, setTime] = useState();
  const [cost, setCost] = useState();

  const handelSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${productsAndCats}/delevery.json`, {
      method: "PUT",
      body: JSON.stringify({
        time: +time,
        cost: +cost,
      }),
    });
    
    setTime("")
    setCost("")
    alert("Delevery Data Updated");
  };

  return (
    <div className="DeleveryForm cardStyle container">
      <form onSubmit={handelSubmit}>
        {/* name */}
        <Input
          label="وقت&#160;التوصيل"
          name="time"
          type="number"
          value={time}
          setValue={setTime}
          wrapperClass="my-2 text-end"
        />

        <Input
          label="سعر&#160;التوصيل"
          name="time"
          type="number"
          value={cost}
          setValue={setCost}
          wrapperClass="my-2 text-end"
        />

        <div className="text-end">
          <input type="submit" className="btn btn-primary my-2 px-4" />
        </div>
      </form>
    </div>
  );
};
