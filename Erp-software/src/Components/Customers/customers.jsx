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
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:8080/customer", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      if (!res.ok) alert("Unauthorized or error fetching customers");
      
      return res.json();
    })
    .then(data => {
      console.log("API response:", data);
      setCustomers(data);
    })
    .catch((error) => console.log("Error fetching customers", error));
  }, []);
  
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
    
    <Box 
    sx={{ 
      width: "100%", 
      p: 2, 
      backgroundColor: "var(--box-primary)",
      color: "var(--box-text)",

      borderRadius: 2,
      boxSizing: "border-box",
      overflowX: "auto",
      marginLeft: "-40px",
    }}
  >
<h1 style={{ textAlign: "center", color: "white", fontFamily: "serif", fontWeight: "bold" }}>Customers</h1>
<DataGrid
    autoHeight
    sx={{
      minWidth: "800px", // This ensures it's scrollable if needed
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "black",
        color: "black",
        fontSize: "16px",
      },
      "& .MuiDataGrid-row": {
        fontSize: "14px",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      },
      "& .MuiTablePagination-root": {
        backgroundColor: "#f0f0f0",
      },
    }}
    rows={rows}
    columns={columns}
    pageSizeOptions={[5, 10, 20, 50, 100]}
    checkboxSelection
  />
        </Box>
);
}


export default Customers;
