import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLeafRangeAttributeTable1688726030013
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE leaf_range_attribute (
      id INT AUTO_INCREMENT PRIMARY KEY,
      min DOUBLE,
      max DOUBLE
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE leaf_range_attribute;`);
  }
}
