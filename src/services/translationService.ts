import * as deepl from "deepl-node";
import { AppDataSource } from "../config/database";
import { Translation } from "../entity/Translation";

const authKey = process.env.DEEPL_AUTH_KEY;

if (!authKey) {
  throw new Error(
    "DEEPL_AUTH_KEY is not defined in the environment variables."
  );
}

const translator = new deepl.Translator(authKey);

export const translateText = async (
  text: string,
  targetLang: deepl.TargetLanguageCode,
  userId?: number
) => {
  const translationRepository = AppDataSource.getRepository(Translation);
  try {
    // 1. Tentar buscar no cache do banco de dados
    const cachedTranslation = await translationRepository.findOne({
      where: {
        original_text: text,
        target_language: targetLang,
      },
    });

    if (cachedTranslation) {
      console.log("Translation found in cache.");
      return cachedTranslation.translated_text; // Retorna do cache
    }

    // 2. Se não estiver no cache, chamar a API DeepL
    console.log("Fetching translation from DeepL API.");
    const result = await translator.translateText(text, null, targetLang);
    const translatedText = result.text;

    // 3. Salvar a nova tradução no banco de dados para cache futuro
    const newTranslation = translationRepository.create({
      original_text: text,
      translated_text: translatedText,
      source_language: result.detectedSourceLang || "auto",
      target_language: targetLang,
      user_id: userId,
    });
    await translationRepository.save(newTranslation);

    return translatedText;
  } catch (error) {
    console.error(
      "Error during DeepL translation or database operation:",
      error
    );
    throw new Error("Failed to translate text.");
  }
};
