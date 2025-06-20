import { Router } from "express";
import {
  handleTranslationRequest,
  getTranslationHistory,
  getTranslationById,
} from "../controllers/translationController";
import { authMiddleware } from "../middleware/authMiddleware";
import { rateLimitMiddleware } from "../middleware/rateLimitMiddleware";

const router = Router();

router.post(
  "/translate",
  authMiddleware,
  rateLimitMiddleware,
  handleTranslationRequest
);
router.get("/translations", authMiddleware, getTranslationHistory);
router.get("/translations/:id", authMiddleware, getTranslationById);

export default router;
