import React from 'react';

import '../invoice/invoice.css'; // Assuming you have your CSS for styling

const numberToWords = (num) => {
  // Convert number to words
  const a = [
    '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen',
    'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen',
  ];
  const b = [
    '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty',
    'Sixty', 'Seventy', 'Eighty', 'Ninety',
  ];

  const inWords = (n) => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
    if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + inWords(n % 100) : '');
    if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand ' + inWords(n % 1000);
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh ' + inWords(n % 100000);
    return inWords(Math.floor(n / 10000000)) + ' Crore ' + inWords(n % 10000000);
  };

  return inWords(Math.floor(num));
};

const Invoice = ({ invoice }) => {
  if (!invoice) {
    return <p>No invoice data found. Please fill the invoice form.</p>;
  }

  const { companyName, customerName, phoneNumber, streetAddress, city, state, gstNumber, email, invoiceNumber, date, poNumber, poDate } = invoice;

  return (
    <div className='backgrounds'>
   
          <div className="invoice-box">
            <h1 className="center">Tax Invoice</h1>
            <div className="row">
              <div className="boxer">
                <div className="first">
                  <h2>Adept Automation</h2>
                  <p className="address name">469 G.F., H.B. Colony, Sector-21 D,<br/> Faridabad-121001( HR)</p>
                  <p className="email name">adeptautomation.cs@gmail.com</p>
                  <p className="phone name">9811306205, 9315878921</p>
                  <p className="GST name">06BLAPS9064A1Z7</p>
                </div>
                <div className="box1">
                  <h3>Consignee (Bill To)</h3>
                  <h3>{companyName}</h3>
                  <p className="address">{streetAddress},</p>
                  <p className="address">{city}</p>
                  <p className="address">{state}</p>
                  <p className="GST">GSTIN/UIN: {gstNumber}</p>
                </div>
              </div>
              <hr />
              <div className="row-details">
                <div>
                  <h3>Consignee (Ship to)</h3>
                  <h3>{companyName}</h3>
                  <p className="address">{streetAddress},</p>
                  <p className="address">{city}</p>
                  <p className="address">{state}</p>
                  <p className="GST">GSTIN/UIN: {gstNumber}</p>
                  <p className="email">E-Mail : {email}</p>
                  <br />
                  <p><b>Kind Attn: {customerName}, Mob - {phoneNumber}</b></p>
                  <p>EMAIL: purchase@dtekinnovative.com</p>
                </div>
                <div>
                  <table className="right-table">
                    <tbody>
                      <tr><td className="headings">Invoice No. :</td><td>{invoiceNumber}</td></tr>
                      <tr><td className="headings">Invoice Date :</td><td> {date}</td></tr>
                      <tr><td className="headings">PO. No. :</td><td>{poNumber}</td></tr>
                      <tr><td className="headings">PO. Date:</td><td> {poDate}</td></tr>
                      <tr><td className="headings">Payment Terms:</td><td> Against PI</td></tr>
                      <tr><td className="headings">Vendor Code:</td><td></td></tr>
                      <tr><td className="headings">Dispatch Through:</td><td> By Transport/Courier</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Item Table */}
              <div className="goods-table-wrapper">
                <table className="goods-table">
                  <thead>
                    <tr>
                      <th>Sl. No.</th>
                      <th>Description of Goods</th>
                      <th>HSN</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Taxable Value</th>
                      <th>GST Rate</th>
                      <th>GST Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items && invoice.items.map((item, index) => {
                      const { description, hsn, unitPrice, gstRate } = item;
                      const quantity = 1; // You can make quantity dynamic if it's available
                      const taxableValue = parseFloat(unitPrice || 0) * quantity;
                      const gstValue = (taxableValue * parseFloat(gstRate || 0)) / 100;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="td">{description}</td>
                          <td className="td1">{hsn}</td>
                          <td className="td1">{quantity}</td>
                          <td className="td1">{unitPrice}</td>
                          <td className="td1">{taxableValue.toFixed(2)}</td>
                          <td className="td1">{gstRate}%</td>
                          <td className="td1">{gstValue.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '19px' }}>Grand Total</td>
                      <td style={{ fontWeight: 'bold', fontSize: '18px' }}>
                        {invoice.items.reduce((acc, item) => {
                          const cleanUnitPrice = parseFloat((item.unitPrice || '0').replace(/,/g, ''));
                          const quantity = 1;
                          const taxable = cleanUnitPrice * quantity;
                          const gst = (taxable * parseFloat(item.gstRate || 0)) / 100;
                          return acc + taxable + gst;
                        }, 0).toFixed(2)}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="8" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                        Amount in words: {numberToWords(invoice.items.reduce((acc, item) => {
                          const cleanUnitPrice = parseFloat((item.unitPrice || '0').replace(/,/g, ''));
                          const quantity = 1;
                          const taxable = cleanUnitPrice * quantity;
                          const gst = (taxable * parseFloat(item.gstRate || 0)) / 100;
                          return acc + taxable + gst;
                        }, 0))} only.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
       
    </div>
  );
};

export default Invoice;
