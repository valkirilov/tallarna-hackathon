import { MigrationInterface, QueryRunner } from 'typeorm';

interface Statuses {
  active: number;
  inactive: number;
  deleted: number;
}

export class SeedBranchTable1688708487040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statuses = await this.getStatuses(queryRunner);

    await this.seedMainBranches(queryRunner, statuses);
    await this.seedMemoryBranches(queryRunner, statuses);
    await this.seedStorageBranches(queryRunner, statuses);
    await this.seedInputOutputBranches(queryRunner, statuses);
    await this.seedSoftwareBranches(queryRunner, statuses);
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

  private async seedMainBranches(queryRunner: QueryRunner, statuses: Statuses) {
    await queryRunner.query(
      `INSERT INTO branch (name, parent_id, status_id, \`order\`)
        VALUES ('Processor', NULL, ${statuses.active}, 1),
          ('Memory', NULL, ${statuses.active}, 2),
          ('Storage', NULL, ${statuses.active}, 3),
          ('Input/Output (IO)', NULL, ${statuses.active}, 4),
          ('Software', NULL, ${statuses.active}, 5);`,
    );
  }

  private async seedMemoryBranches(
    queryRunner: QueryRunner,
    statuses: Statuses,
  ) {
    const memoryBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Memory';`,
    );

    await queryRunner.query(
      `INSERT INTO branch (name, parent_id, status_id, \`order\`)
        VALUES ('RAM', ${memoryBranch[0].id}, ${statuses.active}, 1),
          ('ROM', ${memoryBranch[0].id}, ${statuses.active}, 2);`,
    );
  }

  private async seedStorageBranches(
    queryRunner: QueryRunner,
    statuses: Statuses,
  ) {
    const storageBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Storage';`,
    );

    await queryRunner.query(
      `INSERT INTO branch (name, parent_id, status_id, \`order\`)
        VALUES ('HDD', ${storageBranch[0].id}, ${statuses.active}, 1),
          ('SSD', ${storageBranch[0].id}, ${statuses.active}, 2),
          ('Floppy Disk', ${storageBranch[0].id}, ${statuses.deleted}, 3);
      `,
    );
  }

  private async seedInputOutputBranches(
    queryRunner: QueryRunner,
    statuses: Statuses,
  ) {
    const inputOutputBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Input/Output (IO)';`,
    );

    await queryRunner.query(
      `INSERT INTO branch (name, parent_id, status_id, \`order\`)

        VALUES ('Keyboard', ${inputOutputBranch[0].id}, ${statuses.active}, 1),
          ('Mouse', ${inputOutputBranch[0].id}, ${statuses.active}, 2),
          ('Monitor', ${inputOutputBranch[0].id}, ${statuses.active}, 3),
          ('Printer', ${inputOutputBranch[0].id}, ${statuses.active}, 4),
          ('Scanner', ${inputOutputBranch[0].id}, ${statuses.active}, 5),
          ('Speakers', ${inputOutputBranch[0].id}, ${statuses.active}, 6),
          ('Microphone', ${inputOutputBranch[0].id}, ${statuses.active}, 7),
          ('Webcam', ${inputOutputBranch[0].id}, ${statuses.active}, 8),
          ('Headphones', ${inputOutputBranch[0].id}, ${statuses.active}, 9);
      `,
    );
  }

  private async seedSoftwareBranches(
    queryRunner: QueryRunner,
    statuses: Statuses,
  ) {
    const softwareBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Software';`,
    );

    await queryRunner.query(
      `INSERT INTO branch (name, parent_id, status_id, \`order\`)
        VALUES ('Drivers', ${softwareBranch[0].id}, ${statuses.active}, 1),
          ('OS', ${softwareBranch[0].id}, ${statuses.active}, 2),
          ('Applications', ${softwareBranch[0].id}, ${statuses.active}, 3);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.deleteMemoryBranches(queryRunner);
    this.deleteStorageBranches(queryRunner);
    this.deleteInputOutputBranches(queryRunner);
    this.deleteSoftwareBranches(queryRunner);
    this.deleteMainBranches(queryRunner);
  }

  private async deleteMemoryBranches(queryRunner: QueryRunner) {
    await queryRunner.query(`
      DELETE FROM branch
      WHERE name IN ('RAM', 'ROM');
    `);
  }

  private async deleteStorageBranches(queryRunner: QueryRunner) {
    await queryRunner.query(`
      DELETE FROM branch
      WHERE name IN ('HDD', 'SSD');
    `);
  }

  private async deleteInputOutputBranches(queryRunner: QueryRunner) {
    await queryRunner.query(`
      DELETE FROM branch
      WHERE name IN ('Keyboard', 'Mouse', 'Monitor', 'Printer', 'Scanner', 'Speakers', 'Microphone', 'Webcam', 'Headphones');
    `);
  }

  private async deleteSoftwareBranches(queryRunner: QueryRunner) {
    await queryRunner.query(`
      DELETE FROM branch
      WHERE name IN ('Drivers', 'OS', 'Applications');
    `);
  }

  private async deleteMainBranches(queryRunner: QueryRunner) {
    await queryRunner.query(`
      DELETE FROM branch
      WHERE name IN ('Processor', 'Memory', 'Storage', 'Input/Output (IO)', 'Software');
    `);
  }
}
