import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddRateLimitTable1750440472682 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "rate_limits",
        columns: [
          {
            name: "ip_address",
            type: "varchar",
            length: "45",
            isPrimary: true,
          },
          {
            name: "request_count",
            type: "int",
            default: 1,
          },
          {
            name: "last_request_time",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("rate_limits");
  }
}
