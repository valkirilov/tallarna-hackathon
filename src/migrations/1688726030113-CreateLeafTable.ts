import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeafTable1688726030113 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE leaf (
        id INT AUTO_INCREMENT PRIMARY KEY,
        branch_id INT,
        status_id INT,
        leaf_type_id INT,
        leaf_attribute_id INT,
        name VARCHAR(64),
        description VARCHAR(255),
        \`order\` INT,

        FOREIGN KEY (branch_id) REFERENCES branch(id),
        FOREIGN KEY (status_id) REFERENCES status(id),
        FOREIGN KEY (leaf_type_id) REFERENCES leaf_type(id)
      );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE leaf;`);
  }
}
