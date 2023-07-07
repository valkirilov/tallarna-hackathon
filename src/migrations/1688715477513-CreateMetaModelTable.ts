import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMetaModelTable1688715477513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE meta_model (
        id INT AUTO_INCREMENT PRIMARY KEY,
        status_id INT,
        name VARCHAR(64),
    
        FOREIGN KEY (status_id) REFERENCES status(id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE meta_model;`);
  }
}
