// import{usestate,useEffect} from "react";

 
// export default function PizzaOrder(){
// const [bases,setBases] = usestate([]);
// const [toppings,setToppings]=usestate([]);
// const [selectedBase,setSelectedBase] = usestate("");
// const [selecetedToppings,setSelectedToppings]=usestate([]);
// const [orderSuccess,setOrdersucess] = usestate(false);

// useEffect(() =>{
// fetch("/API/bases")
// .then((res)=> res.json())
// .then((data)=> setBases(data));


// fetch("/API/toppings")
// .then((res)=> res.json())
// .then((data)=> setToppings(data));
// },[]);

// const handleOrderSubmit = async () =>{

// const response = await fetch("../API/orders",{


//     method:"POST",
//     headers:{"Contetnt-Type":"application/json"},
//     body: JSON.stringify({
//         customer_id:1,
//         base_id: selectedBase,
//         topping_id: selecetedToppings,
//         pizza_id:1,
//         totalPrice: 150.00,
//         comments:"NO comments",


//     }),
// });

// if (response.ok){


//     setOrdersucess(true);
// }
// else{
//     alert("ORDER FAILED");
// }
// };

// return(

// <div className="min-h-screen bg-gray-100 p-6">
//     <div className="max-w-2xl mx-auto bg-whitr shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4"> Order YOUR pizza</h1>

//         <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-2"> choose a base</label>
//             <select className="w-full border border-gray-300" value={selectedBase}onChange={(e) =>selectedBase(e.targer.value)}>
//                 <option value="">select a base</option>
//                 {bases.map((base) =>(
//                     <option key={base.id} value={base.id}>{base.baseName}(${base.price.toFixed(2)})


//                     </option>



//                 ))}
//                 </select>
//         </div>
// <div className="mb-4">

// <label> choose toppings:</label>
// {toppings.map((topping) =>(
//     <div key={topping.id} className="flex items-center">
// <input type="checkbox"
// className="mr-2"
// value={topping.id}
// onChange={(e)=>{
//     const id = parseInt(e.target.value);
//     setSelectedToppings((prev)=>prev.includes(id)?prev.filter((t)=>t == id) :[...prev,id]);
    

// }}/> 
// <span>
//     {topping.toppingName}(${topping.price.toFixed(2)})
// </span>
 


//     </div>
// ))}
// </div>

// <button onClick={handleOrderSubmit}> Place Order</button>
// {orderSuccess && (<div>order placed succesfully</div>)}



//     </div>




// </div>


// );
 





 
// };

import Navbar from './components/navbar';

"use client";

import React, { useState, useEffect } from "react";

export default function PizzaOrder() {
const [bases, setBases] = useState([]);
const [toppings, setToppings] = useState([]);
const [selectedBase, setSelectedBase] = useState("");
const [selectedToppings, setSelectedToppings] = useState([]);
const [orderSuccess, setOrderSuccess] = useState(false);
const [customerDetails, setCustomerDetails] = useState({
    name: "",
    number: "",
    email: "",
  });

  useEffect(() => {
   fetch("/API/base")
    .then((res) => res.json())
  .then((data) => setBases(data))
  .catch((err) => console.error("Failed to fetch bases:", err));

    fetch("/API/toppings")
  .then((res) => res.json())
  .then((data) => setToppings(data))
  .catch((err) => console.error("Failed to fetch toppings:", err));
  }, []);
  const handleOrderSubmit = async () => {
    try {
      const customerResponse = await fetch("/API/customers", {
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
const response = await fetch("/API/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_id: customerId,
          base_id: selectedBase,
          topping_ids: selectedToppings,
          pizza_id: 1,  
          totalPrice: 150.0,  
          comments: "No comments",
        }),
      });

      if (response.ok) {
        setOrderSuccess(true);
      } else {
        alert("Order failed.");
      }
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
            type="text"
     className="w-full border border-gray-300 p-2 rounded"
    value={customerDetails.name}
    onChange={(e) =>
              setCustomerDetails({ ...customerDetails, name: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={customerDetails.number}
            onChange={(e) =>
              setCustomerDetails({ ...customerDetails, number: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
       className="w-full border border-gray-300 p-2 rounded"
     value={customerDetails.email}
    onChange={(e) =>
              setCustomerDetails({ ...customerDetails, email: e.target.value })
            }
          />
        </div>

         
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Choose a base</label>
          <select
            className="w-full border border-gray-300 p-2 rounded"
            value={selectedBase}
            onChange={(e) => setSelectedBase(e.target.value)} >
            <option value="">Select a base</option>
            {bases.map((base) => (
              <option key={base.id} value={base.id}>
                {base.baseName} (${base.price.toFixed(2)})
              </option>
            ))}
          </select>
        </div>

        
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Choose toppings:</label>
          {toppings.map((topping) => (
            <div key={topping.id} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                value={topping.id}
                onChange={(e) => {
                  const id = parseInt(e.target.value);
                  setSelectedToppings((prev) =>
                    prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
                  );
                }}
              />
              <span>
                {topping.toppingName} (${topping.price.toFixed(2)})
              </span>
            </div>
          ))}
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleOrderSubmit}
        >
          Place Order
        </button>

        {orderSuccess && (
          <div className="text-green-600 mt-4">Order placed successfully!</div>
        )}
      </div>
    </div>
  );
}