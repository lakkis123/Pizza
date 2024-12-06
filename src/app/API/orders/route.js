import { NextResponse } from "next/server";
import db from "../../lib/db";


export async function GET() {  
    return new Promise((resolve, reject) => { const query = `SELECT o.id, o.status,o.totalPrice, c.customerName FROM orders o 
      JOIN customers c ON o.customer_id = c.id`;
    db.query(query, (err, results) => {
   if (err) {
  console.error("Error fetching orders:", err);
       return reject(NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 }));
     }
      resolve(NextResponse.json(results));
    }
  );

  });

}


export async function POST(req) {
    const { customer_id, base_id, topping_ids, totalPrice, comments } = await req.json();
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO orders (customer_id, totalPrice, comments, status) VALUES (?, ?, ?, ?)";
      db.query(query, [customer_id,  totalPrice, comments || "", "Pending"], (err, results) => {
        if (err) {
          console.error("Error creating order:", err);
          return reject(NextResponse.json({ error: "Failed to create order" }, { status: 500 }));
        }
        if (topping_ids && topping_ids.length > 0) {
          const order_id = results.insertId;  
         
          const toppingsData = topping_ids.map((topping_id) => [order_id, topping_id]);
          db.query(toppingsQuery, [toppingsData], (err) => {
            if (err) {
              console.error("Error adding toppings:", err);
              return reject(NextResponse.json({ error: "Failed to add toppings" }, { status: 500 }));
            }
  
            resolve(NextResponse.json({ message: "Order created successfully", order_id }));
          });
        } else {
       resolve(NextResponse.json({ message: "Order created successfully", order_id: results.insertId }));
        }
      }); });}