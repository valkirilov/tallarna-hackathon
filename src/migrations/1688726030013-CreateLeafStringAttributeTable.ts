import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeafStringAttributeTable1688726030013
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE leaf_string_attribute (
      id INT AUTO_INCREMENT PRIMARY KEY,
      value VARCHAR(255)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE leaf_string_attribute;`);
  }
}
