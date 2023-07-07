import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeafTypeTable1688710859506 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE leaf_type (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(16)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE leaf_type;`);
  }
}
