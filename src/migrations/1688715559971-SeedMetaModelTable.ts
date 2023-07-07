import { MigrationInterface, QueryRunner } from 'typeorm';

interface Statuses {
  active: number;
  inactive: number;
  deleted: number;
}

export class SeedMetaModelTable1688715559971 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statuses = await this.getStatuses(queryRunner);

    await this.seedMetaModel(queryRunner, statuses);
  }

  private async getStatuses(queryRunner: QueryRunner): Promise<Statuses> {
    const activeStatusQuery = await queryRunner.query(
      `SELECT id FROM status WHERE name = 'Active';`,
    );
    const inactiveStatusQuery = await queryRunner.query(
      `SELECT id FROM status WHERE name = 'Inactive';`,
    );
    const deletedStatusQuery = await queryRunner.query(
      `SELECT id FROM status WHERE name = 'Deleted';`,
    );

    return {
      active: activeStatusQuery[0].id,
      inactive: inactiveStatusQuery[0].id,
      deleted: deletedStatusQuery[0].id,
    };
  }

  private async seedMetaModel(queryRunner: QueryRunner, statuses: Statuses) {
    await queryRunner.query(
      `INSERT INTO meta_model (name, status_id)
        VALUES ('ABC', ${statuses.active});         
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM meta_model WHERE name='ABV';`);
  }
}
