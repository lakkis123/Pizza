import { NextResponse } from "next/server";
import db from "../../lib/db";

export async function GET() {
  return new Promise((resolve, reject) => {
    const query = `
     SELECT DATE(orderDate) AS date, SUM(totalPrice) AS total_sales,COUNT(id) AS total_orders
      FROM orders
      GROUP BY DATE(orderDate)
      ORDER BY DATE(orderDate) ASC;
    `;

    db.query(query, (err, results) => {
      if (err) { console.error("Error fetching sales data:", err);
     return reject(NextResponse.json({ error: "Failed to fetch sales data" }, { status: 500 })
    );
      }
      resolve(NextResponse.json(results));
    }
  );
  }
);
}