import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(request) {
  const { order_id, pizza_id, base_id,toppings_id ,quantity} = await request.json();

  if (!order_id || !pizza_id|| !base_id || !toppings_id || !quantity) {
    return NextResponse.json({ error: "Order ID, pizza_id, base_id,toppings_id and quantity are required" }, { status: 400 }

    );
  }

  return new Promise((resolve, reject) => {
    const query = "INSERT INTO order_items (order_id,  pizza_id, base_id,toppings_id, quantity) VALUES (?, ?, ?,?)";
    db.query(query, [order_id, pizza_id, base_id,toppings_id  ,quantity ], (err, result) => {
      if (err) {
     console.error("Error adding order item:", err);
    return reject(NextResponse.json({ error: "Failed to add order item" }, { status: 500 }));
      }
      resolve(NextResponse.json({ id: result.insertId }))
      ;
    }
  );
  }
);
}