const encoder = new TextEncoder();

async function getCryptoKey(secret: string) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signSession(payload: { email: string; expires: number }, secret: string): Promise<string> {
  const data = JSON.stringify(payload);
  const key = await getCryptoKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
  const signatureHex = Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
  
  // Return base64 encoded payload and hex signature
  // We use standard base64 encoding that is edge-safe (btoa is globally available in both Next.js edge and Node.js)
  const base64Data = btoa(data);
  return `${base64Data}.${signatureHex}`;
}

export async function verifySession(token: string, secret: string): Promise<{ email: string; expires: number } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const base64Data = parts[0];
    const signatureHex = parts[1];
    
    const dataStr = atob(base64Data);
    const key = await getCryptoKey(secret);
    const expectedSignature = await crypto.subtle.sign("HMAC", key, encoder.encode(dataStr));
    const expectedSignatureHex = Array.from(new Uint8Array(expectedSignature))
      .map(b => b.toString(16).padStart(2, "0"))
      .join("");
    
    if (signatureHex !== expectedSignatureHex) return null;
    
    const payload = JSON.parse(dataStr);
    if (payload.expires < Date.now()) return null;
    
    return payload;
  } catch {
    return null;
  }
}
