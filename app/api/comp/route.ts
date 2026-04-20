export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const bussinessType = searchParams.get("bussinessType");
    
    const key = process.env.GOOGLE_API_KEY
    if (!lat || !lng || !bussinessType || !key) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
      });
    }
    
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=3000&type=${bussinessType}&key=${key}`;
   
    
    

    const response = await fetch(url);
    const data = await response.json();

    if (!data.results) {
      return new Response(JSON.stringify({ message: "No places found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data.results), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
