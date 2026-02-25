import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const url = new URL(req.url);
  const method = req.method;
  
  // CORS headers
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
  
  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  const store = getStore("profiles");
  
  // GET /api/profile?u=username — load a profile
  if (method === "GET") {
    const username = url.searchParams.get("u");
    if (!username || !/^[a-z0-9_]{2,20}$/.test(username)) {
      return new Response(JSON.stringify({ error: "Invalid username" }), { status: 400, headers });
    }
    
    try {
      const data = await store.get(username, { type: "json" });
      if (!data) {
        return new Response(JSON.stringify({ error: "Profile not found" }), { status: 404, headers });
      }
      return new Response(JSON.stringify(data), { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Failed to load profile" }), { status: 500, headers });
    }
  }
  
  // POST /api/profile — save a profile
  if (method === "POST") {
    try {
      const body = await req.json();
      const { username, ratings, history } = body;
      
      if (!username || !/^[a-z0-9_]{2,20}$/.test(username)) {
        return new Response(JSON.stringify({ error: "Invalid username" }), { status: 400, headers });
      }
      
      if (!ratings || !Array.isArray(ratings)) {
        return new Response(JSON.stringify({ error: "Invalid ratings data" }), { status: 400, headers });
      }
      
      // Check if username is taken by someone else
      const existing = await store.get(username, { type: "json" }).catch(() => null);
      if (existing && existing._deviceId && body._deviceId && existing._deviceId !== body._deviceId) {
        return new Response(JSON.stringify({ error: "Username taken" }), { status: 409, headers });
      }
      
      const profile = {
        username,
        ratings: ratings.slice(0, 200), // cap at 200 ratings
        history: (history || []).slice(0, 200),
        _deviceId: body._deviceId || null,
        updatedAt: new Date().toISOString(),
      };
      
      await store.setJSON(username, profile);
      
      return new Response(JSON.stringify({ ok: true, username }), { status: 200, headers });
    } catch (e) {
      return new Response(JSON.stringify({ error: "Failed to save profile" }), { status: 500, headers });
    }
  }
  
  return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });
};

export const config = {
  path: "/api/profile",
};
