import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, 
  message: {
    status: 429,
    message: 'Too many requests. Please try again later.'
  }
});
