import React from 'react'
import { useState,useEffect } from 'react'
import '../Customers/customers.css'
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material"; // MUI Component



function Customers() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "companyName", headerName: "Product", width: 200 },
    { field: "zone", headerName: "Zone", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "classification", headerName: "Classification", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "number", headerName: "Phone Number", width: 150 },
  ];
  
  const [customers, setCustomers] = useState([]);
  
  // Fetch Customers from backend on component mount
  useEffect(()=>{
    fetch("http://localhost:8080/api")
    .then((res)=>res.json())
    .then((data)=> setCustomers(data))
    .catch((error)=>console.log("Error fetching customers", error))
  },[])
  const rows = customers.map((customer, index)=>({
    id:customer.id,
    companyName:customer.companyName,
    zone:customer.zone,
    state:customer.state,
    classification:customer.classification,
    name:customer.name,
    number:customer.number


  }))
  return(
    <Box sx={{ width: "90vw", p: 2, backgroundColor: "#8E9DA1 ", borderRadius: 2 }}>

      <DataGrid
       sx={{
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#007bff",
            color: "black",
            fontSize: "16px",
          },
          "& .MuiDataGrid-row": {
      fontSize: "14px",
      "&:hover": {
        backgroundColor: "#f5f5f5",
      },
      "& .MuiTablePagination-root": {
      backgroundColor: "#f0f0f0",
    },
    },
        }}
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20, 50, 100 ]}
        checkboxSelection
      />
        </Box>
);
}


export default Customers;
