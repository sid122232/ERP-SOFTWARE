import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Customers from './Components/Customers/customers.jsx';
import SendingData from './Components/Customers/SendingData.jsx';
import SignUp from './Components/SignUp/signUp.jsx';
import SetEmployee from './Components/Employees/setEmployee.jsx';
import MyEmployees from './Components/Employees/employees.jsx';
import Login from './Components/Login/login.jsx';
import Layout from './Components/Layout/layout.jsx';
import Dashboard from './Components/Dashboard/dashboard.jsx';
import Invoice from './Components/invoice/invoiceTemp.jsx';
import InvoiceGeneration from './Components/invoice/invoiceGeneration.jsx';
import './App.css';

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('invoice');
    if (saved) {
      try {
        setInvoiceData(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse invoice data", error);
      }
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/invoice" element={<Invoice invoice={invoiceData} />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/customerData" element={<SendingData />} />
          <Route path="/employee/fillDetails" element={<SetEmployee />} />
          <Route path="/employee" element={<MyEmployees />} />
          <Route path="/invoice-creation" element={<InvoiceGeneration/>} />

          {/* Invoice Form */}
          <Route path="/fill-invoice" element={<InvoiceFormWrapper setInvoiceData={setInvoiceData} />} />
        </Route>
      </Routes>
    </Router>
  );
}

// Wrapper to handle routing on invoice generation
function InvoiceFormWrapper({ setInvoiceData }) {
  const navigate = useNavigate();

  const handleGenerate = (data) => {
    setInvoiceData(data);
    localStorage.setItem('invoice', JSON.stringify(data)); // Optionally save the invoice data to localStorage
    navigate('/invoice');
  };

  return <InvoiceGeneration onGenerate={handleGenerate} />;
}

export default App;
