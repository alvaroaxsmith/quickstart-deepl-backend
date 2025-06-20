import { Request, Response } from "express";
import { translateText } from "../services/translationService";
import { TargetLanguageCode } from "deepl-node";

export const handleTranslationRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text, targetLang } = req.body;

  if (!text || !targetLang) {
    res
      .status(400)
      .json({ error: "Missing required fields: text and targetLang." });
    return;
  }

  try {
    const translatedText = await translateText(
      text,
      targetLang as TargetLanguageCode
    );
    res.json({ translation: translatedText });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};
