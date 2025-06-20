import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddSupportedLanguagesTable1750440472682
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "supported_languages",
        columns: [
          {
            name: "language_code",
            type: "varchar",
            length: "10",
            isPrimary: true,
          },
          {
            name: "language_name",
            type: "varchar",
            length: "255",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("supported_languages");
  }
}
