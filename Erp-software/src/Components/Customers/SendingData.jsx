import React, { useState } from 'react';
import '../Customers/customers.css';

function SendingData() {
    // State inside the component
    const [submit , setSubmit] = useState("");
    const [formData, setFormData] = useState({
        companyName: "",
        zone: "",
        state: "",
        classification: "",
        name: "",
        number: ""
    });

    // Handle input changes
    const handleChangeRequired = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevents page reload
        try {
            const response = await fetch("http://localhost:8080/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log("Data is sent successfully");
                setFormData({
                    companyName: "",
                    zone: "",
                    state: "",
                    classification: "",
                    name: "",
                    number: ""
                });
               setSubmit("Your data has been submitted!");
            } else {
                alert("Error submitting data");
                setSubmit("Your data is not submitted")
            }
        } catch (error) {
            console.error("Error:", error);
        }
        
    };

    return (
        <div >
  <h1 >
    Enter customers
  </h1>
        <div className='box'>

        <form onSubmit={handleFormSubmit}>
            <input type="text" name="companyName" placeholder="Enter the company name" value={formData.companyName} onChange={handleChangeRequired} required />
            <input type="text" name="zone" placeholder="East/West/North/South" value={formData.zone} onChange={handleChangeRequired} required />
            <input type="text" name="state" placeholder="Enter the state name" value={formData.state} onChange={handleChangeRequired} required />
            <input type="text" name="classification" placeholder="Trader/OEM" value={formData.classification} onChange={handleChangeRequired} required />
            <input type="text" name="name" placeholder="Enter the customer name" value={formData.name} onChange={handleChangeRequired} required />
            <input type="text" name="number" placeholder="Enter the customer number" value={formData.number} onChange={handleChangeRequired} required />
            <button type="submit" className='btn'>Submit</button>
        </form>
        <h1>
 {submit}
        </h1>
        </div>
        </div>
    );
}

export default SendingData;
