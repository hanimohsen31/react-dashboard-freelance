import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { productsAndCats } from "../../store/Globals";
import axios from "axios";

export function DataTable() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios.get(productsAndCats + "products.json").then((response) => {
      response.data.map((elm) => setRows((prev) => [...prev, elm]));
    });
    console.log(rows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Product Name", width: 130 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "category", headerName: "Category", width: 90 },
    // { field: "Image", headerName: "Image", width: 90 },
    { field: "price", headerName: "Price", width: 90 },
    { field: "stock", headerName: "Stock", width: 90 },
    { field: "stockLimit", headerName: "Stock Limit", width: 90 },
    // { field: "Edit", headerName: "Edit", width: 90 },
    // { field: "Delete", headerName: "Delete", width: 90 },
  ];

  return (
    <div className="cardStyle my-4" style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
