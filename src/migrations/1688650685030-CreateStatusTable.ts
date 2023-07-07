import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStatusTable1688650685030 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE status (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(16)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE status;`);
  }
}
