import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/database";
import { RateLimit } from "../entity/RateLimit";

const rateLimitRepository = AppDataSource.getRepository(RateLimit);

const MAX_REQUESTS = 100;
const WINDOW_SIZE_IN_SECONDS = 60;

export const rateLimitMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const clientIdentifier = req.ip;

  if (!clientIdentifier) {
    res.status(500).json({ error: "Could not identify the client." });
    return;
  }

  try {
    let rateLimit = await rateLimitRepository.findOneBy({
      ip_address: clientIdentifier,
    });
    const currentTime = new Date();

    if (rateLimit) {
      const timeDiffSeconds =
        (currentTime.getTime() - rateLimit.last_request_time.getTime()) / 1000;

      if (timeDiffSeconds < WINDOW_SIZE_IN_SECONDS) {
        if (rateLimit.request_count >= MAX_REQUESTS) {
          res
            .status(429)
            .json({ error: "Too Many Requests. Please try again later." });
          return;
        }
        rateLimit.request_count++;
      } else {
        rateLimit.request_count = 1;
      }
      await rateLimitRepository.save(rateLimit);
    } else {
      rateLimit = rateLimitRepository.create({
        ip_address: clientIdentifier,
        request_count: 1,
      });
      await rateLimitRepository.save(rateLimit);
    }

    next();
  } catch (error) {
    console.error("Error in rate limit middleware:", error);
    next();
  }
};
