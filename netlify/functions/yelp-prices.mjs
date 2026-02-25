const YELP_API_KEY = 'RGxRpBI00CRGiJqorkHa137Lf8wy_lD9_M1E15ZpcBKub_zDaV9qUemUP1EWnujwSpcZeGxTBmHDpU2LE3dhAre1XzamszFhLeKeiFlkwKmdJuoH0OwISrc0W5eeaXYx';

export default async (req, context) => {
  const url = new URL(req.url);
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  // GET /api/yelp-prices?lat=27.33&lng=-82.53&names=Restaurant1,Restaurant2,...
  const lat = url.searchParams.get("lat");
  const lng = url.searchParams.get("lng");
  
  if (!lat || !lng) {
    return new Response(JSON.stringify({ error: "Missing lat/lng" }), { status: 400, headers });
  }

  try {
    // Fetch restaurants from Yelp near this location
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&categories=restaurants&limit=50&sort_by=distance`;
    
    const resp = await fetch(yelpUrl, {
      headers: { "Authorization": `Bearer ${YELP_API_KEY}` },
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Yelp API error:", resp.status, errText);
      return new Response(JSON.stringify({ error: "Yelp API error", status: resp.status }), { status: 502, headers });
    }

    const data = await resp.json();
    
    // Extract just name → price mapping
    const prices = {};
    for (const biz of (data.businesses || [])) {
      if (biz.name && biz.price) {
        // Yelp price is "$", "$$", "$$$", "$$$$"
        prices[biz.name.toLowerCase()] = biz.price.length; // 1, 2, 3, or 4
      }
    }

    return new Response(JSON.stringify({ prices, count: Object.keys(prices).length }), { status: 200, headers });
  } catch (e) {
    console.error("Yelp proxy error:", e);
    return new Response(JSON.stringify({ error: "Failed to fetch Yelp data" }), { status: 500, headers });
  }
};

export const config = {
  path: "/api/yelp-prices",
};
