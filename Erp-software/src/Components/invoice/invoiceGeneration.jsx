import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function InvoiceGeneration({ onGenerate = () => {} }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    companyName: "",
    customerName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    gstNumber: "",
    email: "",
    invoiceNumber: "",
    date: "",
    poNumber: "",
    poDate: "",
    items: [
      {
        description: "",
        hsn: "",
        unitPrice: "",
        gstRate: ""
      }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleArrayChanges = (index, field, value) => {
    const updatedItems = [...data.items];
    updatedItems[index][field] = value;
    setData({ ...data, items: updatedItems });
  };

  const addNewEntry = () => {
    setData({
      ...data,
      items: [
        ...data.items,
        { description: "", hsn: "", unitPrice: "", gstRate: "" }
      ]
    });
  };

  const handleGenerateInvoice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/invoice', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Invoice from backend:", result);
        localStorage.setItem("invoice", JSON.stringify(result));
        onGenerate(result);

        // Reset form
        setData({
          companyName: "",
          customerName: "",
          phoneNumber: "",
          streetAddress: "",
          city: "",
          state: "",
          gstNumber: "",
          email: "",
          invoiceNumber: "",
          date: "",
          poNumber: "",
          poDate: "",
          items: [
            { description: "", hsn: "", unitPrice: "", gstRate: "" }
          ]
        });
      }
      navigate('/invoice')
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
    <h1 >Generate Invoice</h1>
    <form onSubmit={handleGenerateInvoice}>
      <input name="companyName" placeholder="Company Name" value={data.companyName} onChange={handleChange} />
      <input name="customerName" placeholder="Customer Name" value={data.customerName} onChange={handleChange} />
      <input name="phoneNumber" placeholder="Customer Phone Number" value={data.phoneNumber} onChange={handleChange} />
      <input name="streetAddress" placeholder="Street Address" value={data.streetAddress} onChange={handleChange} />
      <input name="city" placeholder="City" value={data.city} onChange={handleChange} />
      <input name="state" placeholder="State" value={data.state} onChange={handleChange} />
      <input name="gstNumber" placeholder="GST Number" value={data.gstNumber} onChange={handleChange} />
      <input name="email" placeholder="Customer Email Address" value={data.email} onChange={handleChange} />
      <input name="poDate" placeholder="PO Date (DD/MM/YYYY)" value={data.poDate} onChange={handleChange} />

      <h3>Products</h3>
      {data.items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Description"
            value={item.description}
            onChange={(e) => handleArrayChanges(index, "description", e.target.value)}
          />
          <input
            type="text"
            placeholder="HSN Code"
            value={item.hsn}
            onChange={(e) => handleArrayChanges(index, "hsn", e.target.value)}
          />
          <input
            type="text"
            placeholder="Unit Price"
            value={item.unitPrice}
            onChange={(e) => handleArrayChanges(index, "unitPrice", e.target.value)}
          />
          <input
            type="text"
            placeholder="GST Rate"
            value={item.gstRate}
            onChange={(e) => handleArrayChanges(index, "gstRate", e.target.value)}
          />
        </div>
      ))}

      <button type="button" onClick={addNewEntry}>Add Product</button>
      <br /><br />
      <button type="submit">Generate Invoice</button>
    </form>
    </div>
  );
}

export default InvoiceGeneration;
