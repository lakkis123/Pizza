import db from "../../lib/db";
import { NextResponse } from "next/server";


export async function GET(){

    return new Promise((resolve,reject) => {
        db.query("SELECT id, toppingName , pice from toppings ;",(err,results)=>{

            if (err){
                console.error("Error Fetching Bases:",err);
                return reject(NextResponse.json({error:"Failed to fetch bases"},{status : 500}));
            }
            resolve(NextResponse.json(results));
        });

        
    });
    }


















// export default function handler(req,res){

//     if(req.method === "GET"){const query = "SELCT * from base";


//     db.query(query,(err,results)=>{

//         if (err){res.status(500).json({error:" database quesry failed"});
        
//     return;}

//     res.status(200).json(results);
//     });
// } 

// else{res.setHeader("Allow",["GET"]);

//     res.status(405).end('method ${req.method} NOT allowed');
// }
// }
