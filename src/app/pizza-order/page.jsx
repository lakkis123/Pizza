"use client";
import Navbar from '../components/navbar';

import React, { useState, useEffect } from "react";

export default function PizzaOrder() {
const [bases, setBases] = useState([]);
const [toppings, setToppings] = useState([]);
const [pizzas, setPizzas] = useState([]);
const [selectedBase, setSelectedBase] = useState("");
const [selectedTopping, setSelectedTopping] = useState("");
const [selectedPizza, setSelectedPizza] = useState("");
const [orderSuccess, setOrderSuccess] = useState(false);
const [customerDetails, setCustomerDetails] = useState({
   name: "",
  number: "",
    email: "",
  });

  useEffect(() => {
    fetch("/API/bases")
      .then((res) => res.json())
      .then((data) => setBases(data))
      .catch((err) => console.error("Failed to fetch bases:", err));
    fetch("/API/toppings")
      .then((res) => res.json())
      .then((data) => setToppings(data))
      .catch((err) => console.error("Failed to fetch toppings:", err));
    fetch("/API/pizzas")
      .then((res) => res.json())
      .then((data) => setPizzas(data))
      .catch((err) => console.error("Failed to fetch pizzas:", err));
  }, []);
  const handleOrderSubmit = async () => {
    try {
      if (!selectedBase || !selectedTopping || !selectedPizza) {
        alert("Please select a base, topping, and pizza.");
        return;
      }const customerResponse = await fetch("/API/customers", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
     customerName: customerDetails.name,
    customerNumber: customerDetails.number,
    customerEmail: customerDetails.email,
        }),
      });
      if (!customerResponse.ok) {
        alert("Failed to add customer.");
        return;
      }



    const customerData = await customerResponse.json();
   const customerId = customerData.id;
    const basePrice = bases.find((base) => base.id === parseInt(selectedBase))?.price || 0;
   const toppingPrice = toppings.find((topping) => topping.id === parseInt(selectedTopping))?.price || 0;
     const pizzaPrice = pizzas.find((pizza) => pizza.id === parseInt(selectedPizza))?.price || 0;

  const totalPrice = +basePrice + +toppingPrice + +pizzaPrice;     
      const orderResponse = await fetch("/API/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          totalPrice: totalPrice.toFixed(2),
          comments: "No comments",
        }),
      });
      if (!orderResponse.ok) {
        alert("Failed to create order.");
        return;
      }
      const orderData = await orderResponse.json();
      const orderId = orderData.id;  
    const orderItems = [
        { order_id: orderId, pizza_id: selectedPizza, base_id : selectedBase,toppings_id : selectedTopping ,quantity :1},
         
      ];
      await Promise.all(
        orderItems.map((item) =>
          fetch("/API/order_items", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        })        )
      );

      setOrderSuccess(true);
    } catch (error) {
    console.error("Error placing order:", error);
    alert("An error occurred while placing the order.");
    }

  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar></Navbar>
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Your Pizza</h1>
    <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
         <input
          type="text"className="w-full border border-gray-300 p-2 rounded"
          value={customerDetails.name}
          onChange={(e) =>
           setCustomerDetails({ ...customerDetails, name: e.target.value })}  />
  
      
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded"
          value={customerDetails.number}
          onChange={(e) =>
              setCustomerDetails({ ...customerDetails, number: e.target.value })} />


        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded"
            value={customerDetails.email}
            onChange={(e) =>
              setCustomerDetails({ ...customerDetails, email: e.target.value 

              })
               }/>
          

        </div>


        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Choose a base</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedBase}
            onChange={(e) => setSelectedBase(e.target.value)}  >
            <option value="">Select a base</option>
            {bases.map((base) => (
              <option key={base.id} value={base.id}>
                {base.baseName} (R{parseFloat(base.price).toFixed(2)})
        
        
              </option>
            ))
            }
        
        
          </select>
        
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Choose a topping</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedTopping}
            onChange={(e) => setSelectedTopping(e.target.value)}>
            <option value="">Select a topping</option>
            {toppings.map((topping) => (
              <option key={topping.id} value={topping.id}>
                {topping.toppingName} (R{parseFloat(topping.pice).toFixed(2)})
              </option>
            )
            )}
         
          </select>
        
        </div>
       
        <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Choose a pizza</label>
         <select className="w-full border border-gray-300 p-2 rounded"
            value={selectedPizza}
            onChange={(e) => setSelectedPizza(e.target.value)} >
            <option value="">Select a pizza</option>
            {pizzas.map((pizza) => (
              <option key={pizza.id} value={pizza.id}>
                
                {pizza.pizzaName} (R{parseFloat(pizza.pizzaPrice).toFixed(2)})
              
              </option>)
            )
            }
          
          </select>
      
        </div>
      
        <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleOrderSubmit}>
          
          Place Order


        </button>
        {orderSuccess && (
          <div className="text-green-600 mt-4">Order placed successfully!</div>
      
      
      
      )
      }
      
      </div>
    
    </div>
  );
}