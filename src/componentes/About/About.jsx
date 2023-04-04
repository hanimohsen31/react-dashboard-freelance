import React from "react";
import { productsAndCats, usersFireBase } from "../../store/Globals";

export const About = () => {
  return (
    <div className="About text-center container w-75">
      <h1>About</h1>
      <p className="h5 my-4">
        This is a Dashboard Admin Pannel To Controle Products And Follow Up With
        Customers Orders.
      </p>
      <p className="h5 my-4 alert-info p-3" style={{ borderRadius: "8px" }}>
        For Any Problems You May Face Please Follow Up With Videos Provided to
        Show you How to Deal With the Dashboard or Feel Free to Contact with the
        Developers anytime.
      </p>
      <p>
        Link OF Products Database :
        <a style={{ color: "blue" }} href={productsAndCats}>
          {productsAndCats}
        </a>
      </p>
      <p>
        Link OF Orders Database :
        <a style={{ color: "blue" }} href={usersFireBase}>
          {usersFireBase}
        </a>
      </p>
    </div>
  );
};
