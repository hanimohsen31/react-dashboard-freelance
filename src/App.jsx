import { Routes, Route } from "react-router-dom";
// styles
import "./App.scss";
// views and routes
import { SideSection } from "./componentes/SideSection/SideSection";
import { Navbar } from "./componentes/Navbar/Navbar";
import { AddProduct } from "./componentes/AddProduct/AddProduct";
import { OrdersTable } from "./componentes/OrdersTable/OrdersTable";
import { ProductsTable } from "./componentes/ProductsTable/ProductsTable";
import { DeleveryForm } from "./componentes/DeleveryForm/DeleveryForm";
import { Categories } from "./componentes/Categories/Categories";
import { About } from "./componentes/About/About";
import { AdsForm } from "./componentes/AdsForm/AdsForm";
import { AddCategory } from "./componentes/AddCategory/AddCategory";
import { DataTable } from "./componentes/ProductsTable/MaterialUITable";
import { ProductsCards } from "./componentes/ProductsCards/ProductsCards";
import { Login } from "./componentes/Login/Login";

function App() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  console.log(isAdmin);
  return (
    <>
      {isAdmin ? (
        <div className="App d-flex">
          <SideSection />
          <div className="MainSection mx-lg-4">
            <div className="container">
              <Navbar />
              <Routes>
                <Route exact path="/add-product" element={<AddProduct />} />
                <Route exact path="/add-category" element={<AddCategory />} />
                <Route exact path="/ads" element={<AdsForm />} />
                <Route exact path="/products" element={<ProductsTable />} />
                <Route
                  exact
                  path="/products-cards"
                  element={<ProductsCards />}
                />
                <Route exact path="/ui" element={<DataTable />} />
                <Route exact path="/delevery" element={<DeleveryForm />} />
                <Route exact path="/categories" element={<Categories />} />
                <Route exact path="/about" element={<About />} />
                <Route exact path="/" element={<OrdersTable />} />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <div className="100vh">
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
