import { Router } from "express";
import { handleTranslationRequest } from "../controllers/translationController";

const router = Router();

router.post("/translate", handleTranslationRequest);

export default router;
