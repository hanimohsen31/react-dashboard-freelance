import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import parse from "html-react-parser";
import { usersFireBase } from "../../store/Globals";

const loopItems = (elmz) => {
  let content = [];
  for (let i = 0; i < elmz.items.length; i++) {
    content.push(
      `<span className="spanIjnected rtl text-end" > الصنف : <span className="text-danger">${elmz.items[i].title}</span> - العدد المطلوب : <span className="text-danger">${elmz.items[i].quantity}</span></span>`
    );
  }
  return content;
};

export const OrdersTable = () => {
  const [finalArray, setFinalArray] = useState([]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
      // console.log("Timer")
    }, 50000);

    return () => clearInterval(interval);
  }, []);

  // -------------------------------------------------------------------------------------------------
  // handle class
  const handleClass = (event, elm) => {
    document.querySelector(`.CheckClass${elm.dateId}`).checked =
      !document.querySelector(`.CheckClass${elm.dateId}`).checked;
    document.querySelector(`.bg${elm.dateId}`).classList.toggle("bg-light");
    if (
      document.querySelector(`.status${elm.dateId}`).innerText === "قيد التحضير"
    ) {
      document.querySelector(`.status${elm.dateId}`).innerText = "منتهي";
    } else {
      document.querySelector(`.status${elm.dateId}`).innerText = "قيد التحضير";
    }
  };
  // -------------------------------------------------------------------------------------------------
  // calling data from firebase
  useEffect(() => {
    // GET :: calling data from firebase
    const GetDataFromFireBase = async () => {
      const emptyArray = [];
      const response = await fetch(`${usersFireBase}/orders.json`);
      if (!response.ok) {
        console.log("ERROR 1");
      }
      const data = await response.json();
      for (let i in data) {
        let element1 = data[i];
        for (let k in element1) {
          let element2 = element1[k];
          for (let x in element2) {
            let element3 = element2[x];
            emptyArray.push(element3);

            // setFinalArray((prev) => {
            //   return [...prev, element3];
            // });
          }
        }
      }

      // console.log(emptyArray.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0)))
      // console.log(finalArray)
      setFinalArray(
        emptyArray.sort((a, b) =>
          a.date > b.date ? -1 : b.date > a.date ? 1 : 0
        )
      );
      return finalArray;
    };
    GetDataFromFireBase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);
  // -------------------------------------------------------------------------------------------------
  // toggle is done
  const isDoneTogglexx = async (event, elm, uid, dateId) => {
    const response = await fetch(`${usersFireBase}/orders.json`);
    if (!response.ok) {
      console.log("ERROR 1");
    }
    const data = await response.json();
    let toggleDone = !Object.values(data[`${uid}`][`${dateId}`])[0].isDone;
    const response2 = await fetch(
      `${usersFireBase}/orders/${uid}/${dateId}/${
        Object.keys(data[`${uid}`][`${dateId}`])[0]
      }.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          date: elm.date,
          user: elm.user,
          cart: elm.cart,
          form: elm.form,
          uid: elm.uid,
          dateId: elm.dateId,
          isDone: toggleDone,
        }),
      }
    );
    if (!response2.ok) {
      throw new Error("this error from sending - line37 app file");
    }
    handleClass(event, elm);
  };
  // -------------------------------------------------------------------------------------------------
  // delete
  const deleteRow = async (event, elm, uid, dateId) => {
    const response = await fetch(`${usersFireBase}/orders.json`);
    if (!response.ok) {
      console.log("ERROR 1");
    }
    const data = await response.json();
    const response2 = await fetch(
      `${usersFireBase}/orders/${uid}/${dateId}/${
        Object.keys(data[`${uid}`][`${dateId}`])[0]
      }.json`,
      {
        method: "PUT",
        body: JSON.stringify({}),
      }
    );
    if (!response2.ok) {
      throw new Error("this error from sending - line37 app file");
    }
    document.querySelector(`.bg${elm.dateId}`).style.display = "none";
  };
  // -------------------------------------------------------------------------------------------------

  return (
    <div className="cardStyle TableBootstrap text-center my-3">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">حذف</th>
            <th scope="col">حالة&nbsp;الطلب</th>
            <th scope="col">تغيير&#160;الحالة</th>
            <th scope="col">الطلب</th>
            <th scope="col">بيانات&nbsp;العميل</th>
            <th scope="col">#</th>
            <th scope="col">
              <input type="checkbox" />
            </th>
          </tr>
        </thead>
        <tbody>
          {finalArray.map((elm, indx) => (
            <tr
              key={indx}
              className={
                elm.isDone ? `bg${elm.dateId} bg-light` : `bg${elm.dateId}`
              }
            >
              {/* delete */}
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={(event) =>
                    deleteRow(event, elm, elm.uid, elm.dateId)
                  }
                >
                  حذف
                </button>
              </td>
              {/* status */}
              <td>
                <p className={`status${elm.dateId}`}>
                  {elm.isDone ? "منتهي" : "قيد التحضير"}
                </p>
              </td>
              {/* edit */}
              <td>
                <button
                  onClick={(event) =>
                    isDoneTogglexx(event, elm, elm.uid, elm.dateId)
                  }
                  className="btn btn-outline-primary"
                >
                  تغيير
                </button>
              </td>
              {/* order */}
              <td className="text-end">
                <div
                  className="pe-2"
                  style={{ maxHeight: "200px", overflowY: "auto" }}
                >
                  <span
                    className="d-flex felx-column"
                    style={{ flexDirection: "column", textAlign: "end" }}
                  >
                    {parse(loopItems(elm.cart).toString().replaceAll(",", ""))}
                  </span>
                  <span className="my-2">ملحوظات: {elm.form.notes}</span>
                  <span className="d-block text-primary">
                    السعر شامل التوصيل: {elm.cart.OverAllPrice} ج.م
                  </span>
                  <div />
                </div>
              </td>
              {/* client details */}
              <td className="text-end">
                <div className="user d-flex flex-column">
                  <span>
                    {elm.form.uname} :<bdi>الاسم</bdi>
                  </span>
                  <span>
                    <a style={{ color: "blue" }} href={`tel:${elm.form.phone}`}>
                      {elm.form.phone}
                    </a>
                    :<bdi>الهاتف</bdi>
                  </span>
                  <span>
                    {elm.form.adress} : <bdi>العنوان</bdi>
                  </span>
                  <span>
                    {moment(elm.date).format("MMMM Do YYYY, h:mm:ss a")}
                  </span>
                </div>
              </td>
              {/* index */}
              <td>{indx + 1}</td>
              {/* check */}
              <td>
                <input
                  readOnly
                  disabled
                  type="checkbox"
                  checked={elm.isDone}
                  className={`CheckClass${elm.dateId}`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
