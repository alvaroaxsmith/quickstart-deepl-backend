import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("supported_languages")
export class SupportedLanguage {
  @PrimaryColumn({ length: 10 })
  language_code!: string;

  @Column({ length: 255 })
  language_name!: string;
}
