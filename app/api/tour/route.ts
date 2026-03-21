import prisma from "@/lib/prisma";

import { NextResponse } from "next/server"

export async function POST(req: Request){
    const body = await req.json()
   
    const res = await prisma.tour.create({
        data:{
            storeId: body.id,
            fullname: body.name,
            email: body.email,
            phone: body.phone,
            message: body.message,
        }
    })
    return NextResponse.json(res); 
}