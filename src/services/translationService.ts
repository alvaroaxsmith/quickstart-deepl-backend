import * as deepl from "deepl-node";

const authKey = process.env.DEEPL_AUTH_KEY;

if (!authKey) {
  throw new Error(
    "DEEPL_AUTH_KEY is not defined in the environment variables."
  );
}

const translator = new deepl.Translator(authKey);

export const translateText = async (
  text: string,
  targetLang: deepl.TargetLanguageCode
) => {
  try {
    const result = await translator.translateText(text, null, targetLang);
    return result.text;
  } catch (error) {
    console.error("Error during DeepL translation:", error);
    throw new Error("Failed to translate text.");
  }
};
