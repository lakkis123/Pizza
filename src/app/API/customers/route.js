import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function POST(req) {
  const { customerName, customerNumber, customerEmail } = await req.json();

  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO customers (customerName, customerNumber, customerEmail) VALUES (?, ?, ?)";
    db.query(query, [customerName, customerNumber, customerEmail], (err, result) => {
      if (err) {
        console.error("Error adding customer:", err);
      return reject(NextResponse.json({ error: "Failed to add customer" }, { status: 500 }));
      }
      resolve(NextResponse.json({ id: result.insertId, message: "Customer added successfully" }));
    }
  );

  }
);

}