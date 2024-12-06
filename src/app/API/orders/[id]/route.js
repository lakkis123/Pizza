import { NextResponse } from "next/server";
import db from "../../../lib/db";

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

 
export async function PATCH(req, { params }) {
 const { id } = params;
 const { status } = await req.json();
  return new Promise((resolve, reject) => {
    const query = "UPDATE orders SET status = ? WHERE id = ?";
    db.query(query, [status, id], (err) => {
      if (err) {
      console.error("Error updating order:", err);
      return reject(NextResponse.json({ error: "Failed to update order" }, { status: 500 }));
      }
  
  
      resolve(NextResponse.json({ message: "Order updated successfully" }));


    }
  
  );}

);



  }




    // import { error } from 'console';
// import db from '../../lib/db';
// export default function handler(req,res){
// if (req.method ==='post'){
// const {customer_id,base_id,topping_ids,pizza_id, totalPrice ,comments}= req.body;
// const orderQuery = 'INSERT INTO orders(customer_id,totalPrice,comments) Values(?,?,?)';
// db.query(orderQuery,[customer_id,totalPrice,comments], (err,result) =>{

// if (err){
//     res.status(500).json({error : 'Failed to create order'});
//     return;
// }

// const orderId = result.insertId;
// const itemQuery = 'INSERT INTO  order_items(order_id,pizza_id,base_id,topping_id)Values(?,?,?,?)';
// const items = topping_ids.map((topping_id)=>[orderId,pizza_id,base_id,topping_id]);
// db.query(itemQuery,[items],(err)=>{
// if(err){
//     res.status(500).json({error:'Failed to Create ordered items'});
//     return;
// }
// res.status(200).json({message:'Order Places succesfully'});


// });

// });


// }else{
//     res.status(405).json({error:'Not Allowed'});
// }}