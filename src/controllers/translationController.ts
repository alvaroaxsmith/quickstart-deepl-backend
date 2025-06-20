import { Request, Response } from "express";
import { translateText } from "../services/translationService";
import { TargetLanguageCode } from "deepl-node";
import { AppDataSource } from "../config/database";
import { Translation } from "../entity/Translation";

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

    // A lógica de salvar foi movida para o translationService para implementar o cache
    res.json({ translation: translatedText });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred." });
    }
  }
};

export const getTranslationHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const translationRepository = AppDataSource.getRepository(Translation);
    const translations = await translationRepository.find();
    res.json({ history: translations });
  } catch (error) {
    console.error("Error fetching translation history:", error);
    res.status(500).json({ error: "Failed to fetch translation history." });
  }
};

export const getTranslationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const translationRepository = AppDataSource.getRepository(Translation);
    const translation = await translationRepository.findOneBy({
      id: parseInt(id, 10),
    });

    if (!translation) {
      res.status(404).json({ error: "Translation not found." });
      return;
    }

    res.json({ translation });
  } catch (error) {
    console.error(`Error fetching translation with ID ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch translation." });
  }
};
