import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateBranchTable1688650685034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE branch (
        id INT AUTO_INCREMENT PRIMARY KEY,
        parent_id INT,
        status_id INT,
        name VARCHAR(64),
        \`order\` INT,

        FOREIGN KEY (parent_id) REFERENCES branch(id),
        FOREIGN KEY (status_id) REFERENCES status(id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE branch;`);
  }
}
