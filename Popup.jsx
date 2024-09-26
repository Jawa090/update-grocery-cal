import React, { useState } from 'react';
import './Popup.css';
import { FaWeight } from 'react-icons/fa';
import pic from './pic.png.jpeg'; 

const Popup = ({ customerId, date, totalPrice, totalDiscount, totalAmount, isVisible, items = [] }) => {  
    if (!isVisible) return null;

    return (
        <div className="popup">
            <div>
                <h3>E-Khata</h3>

                {/* <img src={pic} alt="E-Khata" style={{ width: '100%', borderRadius: '10px', marginBottom: '10px' }} /> */}

                <div className="receipt-header">
                    <p><strong>Customer ID:</strong> {customerId}</p>
                    <p><strong>Date:</strong> {date}</p>
                </div>
                <hr/>

                <div className="company-info">
                    <div className="info-text">
                        <p><strong>Company:</strong> E-Khata</p>
                        <p><strong>Address:</strong> 123 Street, Lahore</p>
                        <p><strong>Phone:</strong> 122-345-678</p>
                        <p><strong>Email:</strong> asli@gmail.com</p>
                    </div>
                    
                    <img src={pic} alt="Logo" className="company-logo" />
                </div>

                <hr /> 

                <div className="bill-ship-info" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="bill-to">
                        <h4>Bill To:</h4>
                        <hr />
                        <p><strong>Company:</strong> E-Khata</p>
                        <p><strong>Address:</strong> 123 Street</p>
                        <p><strong>Phone:</strong> 122-345-678</p>
                        <p><strong>Email:</strong> asli@gmail.com</p>
                    </div>
                    <div className="ship-to">
                        <h4>Ship To:</h4>
                        <hr />
                        <p><strong>Company:</strong> E-Khata</p>
                        <p><strong>Address:</strong> 123 Street</p>
                        <p><strong>Phone:</strong> 122-345-678</p>
                        <p><strong>Email:</strong> asli@gmail.com</p>
                    </div>
                </div>

                <hr /> 

                <table className="receipt-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.product}</td>
                                <td>{item.quantity}</td>
                                <td>${parseFloat(item.price || 0).toFixed(2)}</td>
                                <td>${(parseFloat(item.price || 0) * parseInt(item.quantity || 0)).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="receipt-summary">
                    <p><strong>Total Price (before discount):</strong> ${totalPrice ? totalPrice.toFixed(2) : '0.00'}</p>
                    <p><strong>Total Discount:</strong> ${totalDiscount ? totalDiscount.toFixed(2) : '0.00'}</p>
                    <p><strong>Total Amount (after discount):</strong> ${totalAmount ? totalAmount.toFixed(2) : '0.00'}</p>
                    <p><strong>Amount Paid:</strong> ${totalAmount ? totalAmount.toFixed(2) : '0.00'}</p>
                </div>
            </div>
        </div>
    );
};

export default Popup;  
