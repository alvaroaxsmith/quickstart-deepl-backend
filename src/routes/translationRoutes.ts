import { Router } from "express";
import {
  handleTranslationRequest,
  getTranslationHistory,
  getTranslationById,
} from "../controllers/translationController";

const router = Router();

router.post("/translate", handleTranslationRequest);
router.get("/translations", getTranslationHistory);
router.get("/translations/:id", getTranslationById);

export default router;
