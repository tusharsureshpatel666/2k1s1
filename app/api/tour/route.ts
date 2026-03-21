import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

import { NextResponse } from "next/server"

export async function POST(req: Request){
    const body = await req.json()
    const session = await auth()
   
    const res = await prisma.tour.create({
        data:{
            storeId: body.id,
            userId: session?.user?.id || "",
            fullname: body.name,
            email: body.email,
            phone: body.phone,
            message: body.message,
        }
    })

     const store = await prisma.store.findUnique({
       where: { id: body.id },
       include: { owner: true }, 
     });

     if(store?.owner.id){
        await prisma.tourNotification.create({
          data: {
            userId: store.owner.id,
            userImage: session?.user?.image,
            message: `New booking request from ${body.name}`,
          },
        });
     }


    return NextResponse.json(res); 
}