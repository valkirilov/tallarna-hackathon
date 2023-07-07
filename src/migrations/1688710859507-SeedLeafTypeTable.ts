import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedLeafTypeTable1688710859507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Note: Please keep this in sync with the LeafTypes enum in src/enums.ts
    await queryRunner.query(
      `INSERT INTO leaf_type (name)
        VALUES 
          ('Number'),
          ('String'),
          ('Bool'),
          ('Range');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM leaf_type;`);
  }
}
