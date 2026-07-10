import mongoose from "mongoose";
import dns from "dns";

// Override DNS resolution to prioritize IPv4 and use public DNS servers (Google/Cloudflare)
// to resolve potential local network SRV query blocks (ECONNREFUSED)
if (typeof dns.setDefaultResultOrder === "function") {
  dns.setDefaultResultOrder("ipv4first");
}
if (typeof dns.setServers === "function") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

function withAuthSource(uri: string) {
  if (uri.includes("authSource=")) {
    return uri;
  }

  const separator = uri.includes("?") ? "&" : "?";
  return `${uri}${separator}authSource=admin`;
}

interface MongooseCache {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

interface GlobalMongoose {
  mongoose?: MongooseCache;
}

const globalWithMongoose = global as typeof globalThis & GlobalMongoose;

let cached = globalWithMongoose.mongoose;

if (!cached) {
  cached = globalWithMongoose.mongoose = { conn: null, promise: null };
}

const activeCache: MongooseCache = cached;

async function dbConnect() {
  if (activeCache.conn) {
    return activeCache.conn;
  }

  if (!activeCache.promise) {
    const opts = {
      bufferCommands: false,
    };

    activeCache.promise = mongoose.connect(withAuthSource(MONGODB_URI!), opts);
  }

  try {
    activeCache.conn = await activeCache.promise;
  } catch (e) {
    activeCache.promise = null;
    throw e;
  }

  return activeCache.conn;
}

export default dbConnect;
