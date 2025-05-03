import rateLimit from "express-rate-limit";

// Define a global rate limiter (100 requests per 15 minutes per IP)
export const globalRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again after 5 minutes.",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Define a stricter rate limiter for authentication routes (10 requests per 15 minutes per IP)
export const authRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // Limit each IP to 10 requests per window
  message:
    "Too many authentication requests from this IP, please try again after 5 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});
