import React from "react";
import { useRef } from "react";
import { productsAndCats } from "../../store/Globals";

export const AdsForm = () => {
  const img1 = useRef();
  const link1 = useRef();
  const img2 = useRef();
  const link2 = useRef();
  const img3 = useRef();
  const link3 = useRef();
  const handelSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${productsAndCats}/slider.json`, {
      method: "PUT",
      body: JSON.stringify([
        {
          id: (Math.random() * 100000000).toFixed(),
          img: img1.current.value,
          link: link1.current.value,
        },
        {
          id: (Math.random() * 100000000).toFixed(),
          img: img2.current.value,
          link: link2.current.value,
        },
        {
          id: (Math.random() * 100000000).toFixed(),
          img: img3.current.value,
          link: link3.current.value,
        },
      ]),
    });
    if (!response.ok) {
      throw new Error("this error from sending - line37 app file");
    }
  };

  return (
    <div className="DeleveryForm cardStyle container py-3 text-end">
      <form onSubmit={handelSubmit} action="">
        <span>الاعلان الاول</span>
        <div className="d-flex">
          <div className="w-50 me-3">
            <label className="label my-2" htmlFor="img1">
              رابط الصورة المعروضة
            </label>
            <input
              type="url"
              name="img1"
              className="form-control text-end"
              placeholder="رابط الصورة المعروضة"
              ref={img1}
              required
            />
          </div>
          <div className="w-50">
            <label className="label my-2" htmlFor="link1">
              رابط الاعلان
            </label>
            <input
              type="url"
              name="link1"
              className="form-control text-end"
              placeholder="رابط الاعلان"
              ref={link1}
              required
            />
          </div>
        </div>
        <hr/>
        <span>الاعلان الثاني</span>
        <div className="d-flex">
          <div className="me-3 w-50">
            <label className="label my-2" htmlFor="img2">
            رابط الصورة المعروضة
            </label>
            <input
              type="url"
              name="img2"
              className="form-control text-end"
              placeholder="رابط الصورة المعروضة"
              ref={img2}
              required
            />
          </div>
          <div className="w-50">
            <label className="label my-2" htmlFor="link2">
            رابط الاعلان
            </label>
            <input
              type="url"
              name="link2"
              className="form-control text-end"
              placeholder="رابط الاعلان"
              ref={link2}
              required
            />
          </div>
        </div>
        <hr/>
        <span>الاعلان الثالث</span>
        <div className="d-flex">
          <div className="me-3 w-50">
            <label className="label my-2" htmlFor="img3">
            رابط الصورة المعروضة
            </label>
            <input
              type="url"
              name="img3"
              className="form-control text-end"
              placeholder="رابط الصورة المعروضة"
              ref={img3}
              required
            />
          </div>
          <div className="w-50">
            <label className="label my-2" htmlFor="link3">
            رابط الاعلان
            </label>
            <input
              type="url"
              name="link3"
              className="form-control text-end"
              placeholder="رابط الاعلان"
              ref={link3}
              required
            />
          </div>
        </div>
        <hr/>
        <div className="text-end">
          <input type="submit" className="btn btn-primary my-2 px-4" />
        </div>
      </form>
    </div>
  );
};
