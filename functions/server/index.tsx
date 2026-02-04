import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use("*", logger(console.log));

// Enable CORS for all routes
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
}));

// Middleware to verify authentication
async function verifyAuth(c: any, next: any) {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = JSON.parse(atob(token));
    
    if (decoded.exp < Date.now()) {
      return c.json({ error: "Token expired" }, 401);
    }

    c.set("userId", decoded.userId);
    c.set("user", { id: decoded.userId, phone: decoded.phone });
    await next();
  } catch (error) {
    return c.json({ error: "Invalid token" }, 401);
  }
}

// Health check
app.get("/make-server-c636fbbe/health", (c) => {
  return c.json({ status: "ok" });
});

// ========== AUTH ROUTES ==========

// Sign in with phone and OTP
app.post("/make-server-c636fbbe/auth/signin", async (c) => {
  try {
    const body = await c.req.json();
    const { phone, otp } = body;

    if (!phone || !otp) {
      return c.json({ error: "Phone and OTP required" }, 400);
    }

    if (otp.length !== 4) {
      return c.json({ error: "Invalid OTP" }, 400);
    }

    // Create user ID from phone
    const userId = `user_${phone.replace(/\D/g, '')}`;
    
    // Get or create user
    let userProfile = await kv.get(`user:${userId}`);
    
    if (!userProfile) {
      userProfile = {
        id: userId,
        phone,
        name: "New User",
        location: "India",
        createdAt: new Date().toISOString(),
      };
      await kv.set(`user:${userId}`, userProfile);
    }

    // Create session token (expires in 24 hours)
    const sessionData = {
      userId,
      phone,
      exp: Date.now() + 86400000
    };
    const sessionToken = btoa(JSON.stringify(sessionData));

    return c.json({ 
      session: { access_token: sessionToken },
      user: { 
        id: userId, 
        phone, 
        user_metadata: userProfile 
      }
    });
  } catch (error) {
    console.error("Sign in error:", error);
    return c.json({ error: "Sign in failed" }, 500);
  }
});

// Get current session
app.get("/make-server-c636fbbe/auth/session", async (c) => {
  const authHeader = c.req.header("Authorization");
  
  if (!authHeader) {
    return c.json({ user: null });
  }

  try {
    const token = authHeader.replace("Bearer ", "");
    const decoded = JSON.parse(atob(token));
    
    if (decoded.exp < Date.now()) {
      return c.json({ user: null });
    }

    const userProfile = await kv.get(`user:${decoded.userId}`) || {};

    return c.json({ 
      user: { 
        id: decoded.userId, 
        phone: decoded.phone,
        user_metadata: userProfile
      } 
    });
  } catch (error) {
    return c.json({ user: null });
  }
});

// ========== CATTLE ROUTES ==========

app.get("/make-server-c636fbbe/cattle", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const cattleList = await kv.getByPrefix(`cattle:${userId}:`);
    return c.json({ cattle: cattleList });
  } catch (error) {
    return c.json({ error: "Failed to fetch cattle" }, 500);
  }
});

app.post("/make-server-c636fbbe/cattle", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const { name, breed, age, gender, muzzleId } = body;

    if (!name || !breed) {
      return c.json({ error: "Name and breed required" }, 400);
    }

    const cattleId = crypto.randomUUID();
    const cattle = {
      id: cattleId,
      userId,
      name,
      breed,
      age,
      gender,
      muzzleId: muzzleId || `MZ-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      healthScore: 85,
      lastCheckup: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    await kv.set(`cattle:${userId}:${cattleId}`, cattle);
    return c.json({ cattle });
  } catch (error) {
    return c.json({ error: "Failed to add cattle" }, 500);
  }
});

app.put("/make-server-c636fbbe/cattle/:id", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const cattleId = c.req.param("id");
    const updates = await c.req.json();

    const existing = await kv.get(`cattle:${userId}:${cattleId}`);
    if (!existing) {
      return c.json({ error: "Cattle not found" }, 404);
    }

    const updated = { ...existing, ...updates, updatedAt: new Date().toISOString() };
    await kv.set(`cattle:${userId}:${cattleId}`, updated);
    return c.json({ cattle: updated });
  } catch (error) {
    return c.json({ error: "Failed to update cattle" }, 500);
  }
});

app.delete("/make-server-c636fbbe/cattle/:id", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const cattleId = c.req.param("id");
    await kv.del(`cattle:${userId}:${cattleId}`);
    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: "Failed to delete cattle" }, 500);
  }
});

// ========== SCAN ROUTES ==========

app.get("/make-server-c636fbbe/scans", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const scans = await kv.getByPrefix(`scan:${userId}:`);
    scans.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return c.json({ scans });
  } catch (error) {
    return c.json({ error: "Failed to fetch scans" }, 500);
  }
});

app.post("/make-server-c636fbbe/scans", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const { cattleId, mode, results } = body;

    if (!cattleId || !mode) {
      return c.json({ error: "Cattle ID and mode required" }, 400);
    }

    const scanId = crypto.randomUUID();
    const scan = {
      id: scanId,
      userId,
      cattleId,
      mode,
      results: results || generateMockResults(mode),
      timestamp: new Date().toISOString(),
    };

    await kv.set(`scan:${userId}:${scanId}`, scan);

    // Update cattle's last checkup
    const cattle = await kv.get(`cattle:${userId}:${cattleId}`);
    if (cattle) {
      await kv.set(`cattle:${userId}:${cattleId}`, {
        ...cattle,
        lastCheckup: new Date().toISOString(),
        healthScore: scan.results.overallScore || cattle.healthScore,
      });
    }

    return c.json({ scan });
  } catch (error) {
    return c.json({ error: "Failed to create scan" }, 500);
  }
});

// ========== ALERTS ROUTES ==========

app.get("/make-server-c636fbbe/alerts", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const alerts = await kv.getByPrefix(`alert:${userId}:`);
    alerts.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return c.json({ alerts });
  } catch (error) {
    return c.json({ error: "Failed to fetch alerts" }, 500);
  }
});

app.post("/make-server-c636fbbe/alerts", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const body = await c.req.json();
    const { cattleId, severity, message, type } = body;

    const alertId = crypto.randomUUID();
    const alert = {
      id: alertId,
      userId,
      cattleId,
      severity,
      message,
      type,
      timestamp: new Date().toISOString(),
      read: false,
    };

    await kv.set(`alert:${userId}:${alertId}`, alert);
    return c.json({ alert });
  } catch (error) {
    return c.json({ error: "Failed to create alert" }, 500);
  }
});

app.put("/make-server-c636fbbe/alerts/:id/read", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const alertId = c.req.param("id");

    const alert = await kv.get(`alert:${userId}:${alertId}`);
    if (!alert) {
      return c.json({ error: "Alert not found" }, 404);
    }

    const updated = { ...alert, read: true };
    await kv.set(`alert:${userId}:${alertId}`, updated);
    return c.json({ alert: updated });
  } catch (error) {
    return c.json({ error: "Failed to mark alert as read" }, 500);
  }
});

// ========== PROFILE ROUTES ==========

app.get("/make-server-c636fbbe/profile", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const profile = await kv.get(`user:${userId}`);
    
    if (!profile) {
      const user = c.get("user");
      return c.json({ 
        profile: {
          id: userId,
          phone: user.phone,
          name: "User",
          location: "",
        }
      });
    }

    return c.json({ profile });
  } catch (error) {
    return c.json({ error: "Failed to fetch profile" }, 500);
  }
});

app.put("/make-server-c636fbbe/profile", verifyAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const updates = await c.req.json();

    const existing = await kv.get(`user:${userId}`) || {};
    const updated = { 
      ...existing, 
      ...updates, 
      id: userId, 
      updatedAt: new Date().toISOString() 
    };
    
    await kv.set(`user:${userId}`, updated);
    return c.json({ profile: updated });
  } catch (error) {
    return c.json({ error: "Failed to update profile" }, 500);
  }
});

// Helper to generate mock scan results
function generateMockResults(mode: string) {
  const baseScore = 75 + Math.floor(Math.random() * 20);
  
  const results: any = {
    overallScore: baseScore,
    timestamp: new Date().toISOString(),
  };

  switch (mode) {
    case "muzzle":
      results.muzzleMatch = 99.7;
      results.identificationConfidence = "High";
      break;
    case "spatial":
      results.gaitAnalysis = {
        symmetry: 92,
        speed: "Normal",
        lamenessDetected: false,
      };
      break;
    case "audio":
      results.vocalizationAnalysis = {
        frequency: "Normal",
        distressLevel: "Low",
        healthIndicators: ["Normal breathing", "No coughing"],
      };
      break;
    default:
      results.generalHealth = "Good";
  }

  return results;
}

Deno.serve(app.fetch);
