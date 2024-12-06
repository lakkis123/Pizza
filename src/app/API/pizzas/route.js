import db from "../../lib/db";
import { NextResponse } from "next/server";


export async function GET(){

    return new Promise((resolve,reject) => {
        db.query("select id , pizzaName , pizzaDescription,pizzaPrice from pizzas;",(err,results)=>{

            if (err){
                console.error("Error Fetching Bases:",err);
                return reject(NextResponse.json({error:"Failed to fetch bases"},{status : 500}));
            }
            resolve(NextResponse.json(results));
        });

        
    });
    }