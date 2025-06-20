import { Router } from "express";
import {
  handleTranslationRequest,
  getTranslationHistory,
  getTranslationById,
} from "../controllers/translationController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.post("/translate", authMiddleware, handleTranslationRequest);
router.get("/translations", authMiddleware, getTranslationHistory);
router.get("/translations/:id", authMiddleware, getTranslationById);

export default router;
