import { Request, Response } from "express";
import { translateText } from "../services/translationService";
import { TargetLanguageCode } from "deepl-node";
import { AppDataSource } from "../config/database";
import { Translation } from "../entity/Translation";
import { SupportedLanguage } from "../entity/SupportedLanguage";

const supportedLanguageRepository =
  AppDataSource.getRepository(SupportedLanguage);

export const handleTranslationRequest = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { text, targetLang } = req.body;
  const userId = req.userId;

  if (!text || !targetLang) {
    res
      .status(400)
      .json({ error: "Missing required fields: text and targetLang." });
    return;
  }

  try {
    // Validação do idioma
    const isTargetLangSupported =
      (await supportedLanguageRepository.count({
        where: { language_code: targetLang },
      })) > 0;

    if (!isTargetLangSupported) {
      res
        .status(400)
        .json({ error: `Target language '${targetLang}' is not supported.` });
      return;
    }

    const translatedText = await translateText(
      text,
      targetLang as TargetLanguageCode,
      userId
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

export const getTranslationHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.userId;
  try {
    const translationRepository = AppDataSource.getRepository(Translation);
    const translations = await translationRepository.find({
      where: { user_id: userId },
    });
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
  const userId = req.userId;
  try {
    const translationRepository = AppDataSource.getRepository(Translation);
    const translation = await translationRepository.findOneBy({
      id: parseInt(id, 10),
      user_id: userId,
    });

    if (!translation) {
      res
        .status(404)
        .json({ error: "Translation not found or access denied." });
      return;
    }

    res.json({ translation });
  } catch (error) {
    console.error(`Error fetching translation with ID ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch translation." });
  }
};

export const getLanguages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const languages = await supportedLanguageRepository.find({
      order: {
        language_name: "ASC",
      },
    });
    res.json({ languages });
  } catch (error) {
    console.error("Error fetching supported languages:", error);
    res.status(500).json({ error: "Failed to fetch supported languages." });
  }
};
