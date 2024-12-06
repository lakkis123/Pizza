"use client";

import React, { useState, useEffect } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    fetch("/API/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to fetch orders:", err));
  }, [updateSuccess]);
  const updateOrderStatus = async (orderId, newStatus) => {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (response.ok) {
      setUpdateSuccess((prev) => !prev);
    } else {
      alert("Failed to update order status.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Orders</h1>
     <table className="table-auto w-full text-left border-collapse">
     <thead>
            <tr>
          <th className="border px-4 py-2">Order ID</th>
           <th className="border px-4 py-2">Customer</th>  
                       <th className="border px-4 py-2">Status</th>
             <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
 <td className="border px-4 py-2">{order.id}</td>
       <td className="border px-4 py-2">{order.customerName}</td>
     <td className="border px-4 py-2">{order.status}</td>
  <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => updateOrderStatus(order.id, "Completed")}>
                    Mark as Completed </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => updateOrderStatus(order.id, "Cancelled")}>
                    Cancel Order
                  </button>
                
                </td>
              
              </tr>
            
            ))}
          
          </tbody>
        
        
        
        </table>
      
      
      
      
      </div>
    
    </div>
  );
}