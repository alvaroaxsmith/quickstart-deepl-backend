import { AppDataSource } from "../config/database";
import { SupportedLanguage } from "../entity/SupportedLanguage";

const seedLanguages = async () => {
  console.log("Initializing data source for seeding...");
  await AppDataSource.initialize();
  console.log("Data source initialized. Seeding languages...");
  const langRepository = AppDataSource.getRepository(SupportedLanguage);

  const languages = [
    { language_code: "de", language_name: "German" },
    { language_code: "en", language_name: "English" },
    { language_code: "en-GB", language_name: "English (British)" },
    { language_code: "en-US", language_name: "English (American)" },
    { language_code: "es", language_name: "Spanish" },
    { language_code: "fr", language_name: "French" },
    { language_code: "pt", language_name: "Portuguese" },
    { language_code: "pt-BR", language_name: "Portuguese (Brazilian)" },
    { language_code: "pt-PT", language_name: "Portuguese (European)" },
  ];

  for (const lang of languages) {
    const existing = await langRepository.findOne({
      where: { language_code: lang.language_code },
    });
    if (!existing) {
      await langRepository.save(langRepository.create(lang));
      console.log(
        `Added language: ${lang.language_name} (${lang.language_code})`
      );
    }
  }
  await AppDataSource.destroy();
  console.log("Language seeding complete.");
};

seedLanguages().catch((error) => {
  console.error("Error seeding languages:", error);
  process.exit(1);
});
