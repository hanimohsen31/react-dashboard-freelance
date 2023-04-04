import React, { useState, useEffect } from "react";
import { productsAndCats } from "../../store/Globals";
import { Link } from "react-router-dom";

export const Categories = () => {
  const [finalArray, setFinalArray] = useState([]);

  useEffect(() => {
    // GET :: calling data from firebase
    const GetDataFromFireBase = async () => {
      const response = await fetch(`${productsAndCats}/categories.json`);
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

  // delete
  const deleteRow = async (event, elm) => {
    const response = await fetch(`${productsAndCats}/categories.json`);
    if (!response.ok) {
      console.log("ERROR");
    }

    const data = await response.json();

    const filtered = data.filter((Elm) => {
      return Elm.id !== elm.id;
    });

    await fetch(`${productsAndCats}/categories.json`, {
      method: "PUT",
      body: JSON.stringify(filtered),
    });

    document.querySelector(`.bg${elm.id}`).style.display = "none";
  };

  return (
    <div className="Categories">
      <div className="cardStyle TableBootstrap text-center">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">حذف</th>
              <th scope="col">تعديل</th>
              <th scope="col">اسم&nbsp;الفئة</th>
              <th scope="col">#</th>
            </tr>
          </thead>
          <tbody>
            {finalArray.map((elm, indx) => (
              <tr className={`bg${elm.id}`} key={indx}>
                <td>
                  <button
                    // disabled={true}
                    className="btn btn-outline-danger"
                    onClick={(event) => deleteRow(event, elm)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <Link
                    className="btn btn-outline-info"
                    to={{
                      pathname: "/add-category",
                      search: `?category=${indx}`,
                      state: { fromHome: true },
                    }}
                  >
                    تعديل
                  </Link>
                </td>
                <td> {elm.name} </td>
                <td>{indx + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
