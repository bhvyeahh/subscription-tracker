import arcjet, { detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
  key: ARCJET_KEY,
  timeout: 1000, // Optional: Fail open if Arcjet is slow
  rules: [
    // Bot protection (allow search engines)
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    
    // Rate limiting: 5 requests per 10 seconds per IP
    tokenBucket({
      mode: "LIVE",
      characteristics: ["ip.src"],
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export default aj;