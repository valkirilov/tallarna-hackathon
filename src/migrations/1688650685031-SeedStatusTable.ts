import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedStatusTable1688650685031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO status (name)
        VALUES ('Active'),
          ('Inactive'),
          ('Deleted');
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM status;`);
  }
}
