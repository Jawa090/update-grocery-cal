import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar'; 
import Sidebar from './components/Sidebar';
import BoxLayout from './components/BoxLayout';
import ItemList from './components/ItemList';
import Popup from './components/Popup'; 
import DropdownContainer from './components/DropdownContainer'; 
import './App.css'; 

const App = () => {
    const [items, setItems] = useState([]); // State for items
    const [customerId, setCustomerId] = useState(''); // State for customer ID
    const [date, setDate] = useState(''); // State for date
    const [totalAmount, setTotalAmount] = useState(0); // State for total amount
    const [totalDiscount, setTotalDiscount] = useState(0); // State for total discount
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
    const [savedData, setSavedData] = useState([]); // State for saved data
    const [error, setError] = useState(''); // State for error messages

    // Function to calculate total price and discount
    const calculateTotals = (newItems) => {
        const totalPrice = newItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return total + (price * quantity);
        }, 0);

        const totalDiscount = newItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            const discountAmount = (price * quantity * (item.discount / 100)) || 0;
            return total + discountAmount;
        }, 0);

        return { totalPrice, totalDiscount };
    };

    // Callback to handle changes in items
    const handleItemsChange = useCallback((newItems) => {
        const { totalPrice, totalDiscount } = calculateTotals(newItems);
        setItems(newItems);
        setTotalAmount(totalPrice);
        setTotalDiscount(totalDiscount);
    }, []);

    // Callback to handle customer ID changes
    const handleCustomerIdChange = useCallback((id) => {
        setCustomerId(id);
    }, []);

    // Callback to handle date changes
    const handleDateChange = useCallback((newDate) => {
        setDate(newDate);
    }, []);

    // Handle form submission
    const handleSubmit = () => {
        setError('');

        // Validate customer ID
        if (!customerId) {
            setError('Please enter a valid Customer ID');
            return;
        }
        // Validate date
        if (!date) {
            setError('Please enter a valid Date');
            return;
        }
        // Validate items
        if (items.length === 0 || items.some(item => !item.product || !item.price || !item.quantity)) {
            setError('Please fill in all item details');
            return;
        }



        // Prepare new data
        const newData = { customerId, date, items, totalAmount, totalDiscount };

        // Check for existing customer ID
        const existingIndex = savedData.findIndex(data => data.customerId === customerId);
        if (existingIndex !== -1) {
            const updatedData = [...savedData];
            updatedData[existingIndex] = newData; // Update existing data
            setSavedData(updatedData);
        } else {
            setSavedData([...savedData, newData]); // Save new data
        }


        setIsPopupVisible(true);
        setTimeout(() => {
            setIsPopupVisible(false);
            resetFields(); // Reset fields after popup closes
        }, 20000);

        // Do not reset fields here
        // resetFields(); // Remove this line
    };

    // Function to reset all fields
    const resetFields = () => {
        setCustomerId('');
        setDate('');
        setItems([]);
        setTotalAmount(0);
        setTotalDiscount(0);
        setError('');
    };

    // Handle selection from DropdownContainer
    const handleSelectSavedData = (data) => {
        if (data) {
            setCustomerId(data.customerId);
            setDate(data.date);
            setItems(data.items);
            setTotalAmount(data.totalAmount);
            setTotalDiscount(data.totalDiscount);
            setError('');
        }
    };

    return (
        <div>
            <Navbar /> 
            <Sidebar />
            <main>
                <BoxLayout 
                    onCustomerIdChange={handleCustomerIdChange} 
                    onDateChange={handleDateChange} 
                    customerId={customerId} 
                    date={date}
                />

                <ItemList 
                    onItemsChange={handleItemsChange} 
                    initialItems={items} 
                />

                <button onClick={handleSubmit} className="btn btn-primary btn-lg btn-custom">
                    Submit
                </button>

                <DropdownContainer
                    savedData={savedData}
                    onChange={handleSelectSavedData} 
                />

                {error && <p style={{ color: 'red' }}>{error}</p>}

                {isPopupVisible && (
                    <Popup 
                        customerId={customerId}
                        date={date}
                        totalPrice={totalAmount} 
                        totalDiscount={totalDiscount} 
                        totalAmount={totalAmount - totalDiscount}
                        isVisible={isPopupVisible} 
                        items={items} 
                    />
                )}
            </main>
        </div>
    );
};

export default App; 
