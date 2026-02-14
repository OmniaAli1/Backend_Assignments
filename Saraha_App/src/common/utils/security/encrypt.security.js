import crypto from "node:crypto";

const ENCRYPTION_KEY = Buffer.from("12345678912345678912345678912345"); // You should store this securely (e.g., env variable)
const IV_LENGTH = 16; // For AES, the IV is always 16 bytes

export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  return iv.toString("hex") + ':' + encrypted;
}
