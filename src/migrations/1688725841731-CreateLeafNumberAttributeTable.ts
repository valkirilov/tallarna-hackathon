import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeafNumberAttributeTable1688725841731
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE leaf_number_attribute (
      id INT AUTO_INCREMENT PRIMARY KEY,
      value DOUBLE
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE leaf_number_attribute;`);
  }
}
