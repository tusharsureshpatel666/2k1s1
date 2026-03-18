import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    const session = await auth()
    const userBussiness = await prisma.user.findUnique({
        where: {
            id:session?.user?.id
        },
        select:{
            userBussinessType: true,
        }
    })

     if (!userBussiness?.userBussinessType) {
       return new Response("No business type found", { status: 404 });
     }

     const bussinsstype = await prisma.businessTypeCache.findUnique({
        where: {businessType: userBussiness.userBussinessType},
        select: {
            places:true
        }
     })
     if(!bussinsstype){
        return NextResponse.json({success: 
            false
        }, {status: 401})
     }
     return NextResponse.json({
        places: bussinsstype.places
     })

    
}