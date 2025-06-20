import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class InitialSchema1750431198282 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "username",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "password_hash",
            type: "varchar",
            length: "255",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    await queryRunner.createTable(
      new Table({
        name: "translations",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "original_text",
            type: "text",
          },
          {
            name: "translated_text",
            type: "text",
          },
          {
            name: "source_language",
            type: "varchar",
            length: "10",
          },
          {
            name: "target_language",
            type: "varchar",
            length: "10",
          },
          {
            name: "timestamp",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: true,
          },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      "translations",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("translations");
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user_id") !== -1
    );
    await queryRunner.dropForeignKey("translations", foreignKey!);
    await queryRunner.dropTable("translations");
    await queryRunner.dropTable("users");
  }
}
