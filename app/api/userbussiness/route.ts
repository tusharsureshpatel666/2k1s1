
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userId = await auth()
    const { bussiness } = body;

    if (!userId?.user?.id || !bussiness) {
      return new Response(JSON.stringify({ error: "Missing data" }), {
        status: 400,
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId?.user?.id },
      data: { userBussinessType: bussiness },
    });

    return new Response(JSON.stringify({ success: true, user: updatedUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500 },
    );
  }
}
