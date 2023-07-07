import { MigrationInterface, QueryRunner } from 'typeorm';

interface Statuses {
  active: number;
  inactive: number;
  deleted: number;
}

interface LeafTypes {
  number: number;
  string: number;
  bool: number;
  range: number;
}

interface SeedLeafAttributeOptions {
  branchId: number;
  statuses: Statuses;
  leafTypes: LeafTypes;
}

export class SeedLeafTable1688726030114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const statuses = await this.getStatuses(queryRunner);
    const leafTypes = await this.getLeafTypes(queryRunner);

    // TODO: This file become so large, it should be broken up into smaller files
    await this.seedProcessorLeafs(queryRunner, statuses, leafTypes);
    await this.seedRAMMemoryLeafs(queryRunner, statuses, leafTypes);
    await this.seedHDDStorageLeafs(queryRunner, statuses, leafTypes);
    await this.seedKeyboardIOLeafs(queryRunner, statuses, leafTypes);
    await this.seedMouseIOLeafs(queryRunner, statuses, leafTypes);
    await this.seedMonitorIOLeafs(queryRunner, statuses, leafTypes);
    await this.seedOSSoftwareLeafs(queryRunner, statuses, leafTypes);
  }

  /**
   * Generic Helpers
   */

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

  private async getLeafTypes(queryRunner: QueryRunner): Promise<LeafTypes> {
    const numberLeafTypeQuery = await queryRunner.query(
      `SELECT id FROM leaf_type WHERE name = 'Number';`,
    );
    const stringLeafTypeQuery = await queryRunner.query(
      `SELECT id FROM leaf_type WHERE name = 'String';`,
    );
    const boolLeafTypeQuery = await queryRunner.query(
      `SELECT id FROM leaf_type WHERE name = 'Bool';`,
    );
    const rangeLeafTypeQuery = await queryRunner.query(
      `SELECT id FROM leaf_type WHERE name = 'Range';`,
    );

    return {
      number: numberLeafTypeQuery[0].id,
      string: stringLeafTypeQuery[0].id,
      bool: boolLeafTypeQuery[0].id,
      range: rangeLeafTypeQuery[0].id,
    };
  }

  /**
   * Seed Processors Data
   */

  private async seedProcessorLeafs(
    queryRunner: QueryRunner,
    statuses: Statuses,
    leafTypes: LeafTypes,
  ) {
    const processorBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Processor';`,
    );

    const options: SeedLeafAttributeOptions = {
      branchId: processorBranch[0].id,
      statuses,
      leafTypes,
    };

    await this.seedProcessorLeafAttributeManufacturer(queryRunner, options);
    await this.seedProcessorLeafAttributeSocket(queryRunner, options);
    await this.seedProcessorLeafAttributeCores(queryRunner, options);
    await this.seedProcessorLeafAttributeThreads(queryRunner, options);
    await this.seedProcessorLeafAttributeClockSpeed(queryRunner, options);
  }

  private async seedProcessorLeafAttributeManufacturer(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('Intel');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Manufacturer', 'The manufacturer of the processor.', 1);
      `,
    );
  }

  private async seedProcessorLeafAttributeSocket(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('LGA');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Socket', 'The socket type required by the processor for installation.', 1);
      `,
    );
  }

  private async seedProcessorLeafAttributeCores(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_number_attribute (value) VALUES (4);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.number}, ${leafAttribute.insertId}, 'Cores', 'Number of cores in the processor.', 1);
      `,
    );
  }

  private async seedProcessorLeafAttributeThreads(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_number_attribute (value) VALUES (8);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.number}, ${leafAttribute.insertId}, 'Threads', 'Number of threads in the processor.', 4);
      `,
    );
  }

  private async seedProcessorLeafAttributeClockSpeed(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_range_attribute (min, max) VALUES (3.6, 4.2);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.range}, ${leafAttribute.insertId}, 'Clock Speed', 'The range of clock speeds for the processor.', 5);
      `,
    );
  }

  /**
   * Seed Memory Data
   */

  private async seedRAMMemoryLeafs(
    queryRunner: QueryRunner,
    statuses: Statuses,
    leafTypes: LeafTypes,
  ) {
    const memoryBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'RAM';`,
    );

    const options: SeedLeafAttributeOptions = {
      branchId: memoryBranch[0].id,
      statuses,
      leafTypes,
    };

    await this.seedRAMMemoryLeafAttributeType(queryRunner, options);
    await this.seedRAMMemoryLeafAttributeCapacity(queryRunner, options);
    await this.seedRAMMemoryLeafAttributeSpeed(queryRunner, options);
  }

  private async seedRAMMemoryLeafAttributeType(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('DDR4');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Type', 'The type of RAM memory.', 1);
      `,
    );
  }

  private async seedRAMMemoryLeafAttributeCapacity(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_number_attribute (value) VALUES (8);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.number}, ${leafAttribute.insertId}, 'Capacity', 'The capacity of the RAM memory (GBs).', 2);
      `,
    );
  }

  private async seedRAMMemoryLeafAttributeSpeed(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_range_attribute (min, max) VALUES (2400, 3200);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.range}, ${leafAttribute.insertId}, 'Speed', 'The range of speeds for the RAM memory (MHz).', 3);
      `,
    );
  }

  /**
   * Seed Storage Data
   */

  private async seedHDDStorageLeafs(
    queryRunner: QueryRunner,
    statuses: Statuses,
    leafTypes: LeafTypes,
  ) {
    const storageBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'HDD';`,
    );

    const options: SeedLeafAttributeOptions = {
      branchId: storageBranch[0].id,
      statuses,
      leafTypes,
    };

    await this.seedHDDStorageLeafAttributeInterface(queryRunner, options);
    await this.seedHDDStorageLeafAttributeCapacity(queryRunner, options);
    await this.seedHDDStorageLeafAttributeSpeed(queryRunner, options);
  }

  private async seedHDDStorageLeafAttributeInterface(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('SATA');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Interface', 'The interface type of the storage.', 1);
      `,
    );
  }

  private async seedHDDStorageLeafAttributeCapacity(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_number_attribute (value) VALUES (1000);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.number}, ${leafAttribute.insertId}, 'Capacity', 'The capacity of the storage (GBs).', 2);
      `,
    );
  }

  private async seedHDDStorageLeafAttributeSpeed(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_range_attribute (min, max) VALUES (5400, 7200);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.range}, ${leafAttribute.insertId}, 'Speed', 'The range of speeds for the storage (RPM).', 3);
      `,
    );
  }

  /**
   * Seed I/O Data
   */

  private async seedKeyboardIOLeafs(
    queryRunner: QueryRunner,
    statuses: Statuses,
    leafTypes: LeafTypes,
  ) {
    const ioBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Keyboard';`,
    );

    const options: SeedLeafAttributeOptions = {
      branchId: ioBranch[0].id,
      statuses,
      leafTypes,
    };

    await this.seedKeyboardIOLeafAttributeInterface(queryRunner, options);
    await this.seedKeyboardIOLeafAttributeLayout(queryRunner, options);
  }

  private async seedKeyboardIOLeafAttributeInterface(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('USB');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Interface', 'The interface type of the keyboard.', 1);
      `,
    );
  }

  private async seedKeyboardIOLeafAttributeLayout(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('QWERTY');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Layout', 'The layout of the keyboard.', 2);
      `,
    );
  }

  private async seedMouseIOLeafs(
    queryRunner: QueryRunner,
    statuses: Statuses,
    leafTypes: LeafTypes,
  ) {
    const ioBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Mouse';`,
    );

    const options: SeedLeafAttributeOptions = {
      branchId: ioBranch[0].id,
      statuses,
      leafTypes,
    };

    await this.seedMouseIOLeafAttributeInterface(queryRunner, options);
    await this.seedMouseIOLeafAttributeButtons(queryRunner, options);
  }

  private async seedMouseIOLeafAttributeInterface(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('USB');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Interface', 'The interface type of the mouse.', 1);
      `,
    );
  }

  private async seedMouseIOLeafAttributeButtons(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_number_attribute (value) VALUES (2);`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.number}, ${leafAttribute.insertId}, 'Buttons', 'The number of buttons on the mouse.', 2);
      `,
    );
  }

  private async seedMonitorIOLeafs(
    queryRunner: QueryRunner,
    statuses: Statuses,
    leafTypes: LeafTypes,
  ) {
    const ioBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Monitor';`,
    );

    const options: SeedLeafAttributeOptions = {
      branchId: ioBranch[0].id,
      statuses,
      leafTypes,
    };

    await this.seedMonitorIOLeafAttributeInterface(queryRunner, options);
    await this.seedMonitorIOLeafAttributeResolution(queryRunner, options);
  }

  private async seedMonitorIOLeafAttributeInterface(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('HDMI');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Interface', 'The interface type of the monitor.', 1);
      `,
    );
  }

  private async seedMonitorIOLeafAttributeResolution(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('1920x1080');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Resolution', 'The resolution of the monitor.', 2);
      `,
    );
  }

  /**
   * Seed Software Data
   */

  private async seedOSSoftwareLeafs(
    queryRunner: QueryRunner,
    statuses: Statuses,
    leafTypes: LeafTypes,
  ) {
    const softwareBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'OS';`,
    );

    const options: SeedLeafAttributeOptions = {
      branchId: softwareBranch[0].id,
      statuses,
      leafTypes,
    };

    await this.seedOSSoftwareLeafAttributeName(queryRunner, options);
    await this.seedOSSoftwareLeafAttributeVersion(queryRunner, options);
  }

  private async seedOSSoftwareLeafAttributeName(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('Windows 10');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Name', 'The name of the operating system.', 1);
      `,
    );
  }

  private async seedOSSoftwareLeafAttributeVersion(
    queryRunner: QueryRunner,
    options: SeedLeafAttributeOptions,
  ) {
    const { branchId, statuses, leafTypes } = options;
    const leafAttribute = await queryRunner.query(
      `INSERT INTO leaf_string_attribute (value) VALUES ('10.0.19042');`,
    );

    await queryRunner.query(
      `INSERT INTO leaf (branch_id, status_id, leaf_type_id, leaf_attribute_id, name, description, \`order\`)
        VALUES (${branchId}, ${statuses.active}, ${leafTypes.string}, ${leafAttribute.insertId}, 'Version', 'The version of the operating system.', 2);
      `,
    );
  }

  /**
   * Cleanup Helpers
   */

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.deleteProcessorLeafs(queryRunner);
    this.deleteRAMMemoryLeafs(queryRunner);
    this.deleteHDDStorageLeafs(queryRunner);
    this.deleteKeyboardIOLeafs(queryRunner);
    this.deleteMouseIOLeafs(queryRunner);
    this.deleteMonitorIOLeafs(queryRunner);
    this.deleteOSSoftwareLeafs(queryRunner);
  }

  private async deleteProcessorLeafs(queryRunner: QueryRunner) {
    const processorBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Processor';`,
    );

    await queryRunner.query(
      `DELETE FROM leaf 
        WHERE branch_id = ${processorBranch[0].id} 
          AND name IN ('CPU', 'GPU', 'Memory Management Unit', 'Bus Interface Unit', 'Cache');`,
    );
  }

  private async deleteRAMMemoryLeafs(queryRunner: QueryRunner) {
    const memoryBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'RAM';`,
    );

    await queryRunner.query(
      `DELETE FROM leaf 
        WHERE branch_id = ${memoryBranch[0].id} 
          AND name IN ('Type', 'Capacity', 'Speed');`,
    );
  }

  private async deleteHDDStorageLeafs(queryRunner: QueryRunner) {
    const storageBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'HDD';`,
    );

    await queryRunner.query(
      `DELETE FROM leaf 
        WHERE branch_id = ${storageBranch[0].id} 
          AND name IN ('Interface', 'Capacity', 'Speed');`,
    );
  }

  private async deleteKeyboardIOLeafs(queryRunner: QueryRunner) {
    const ioBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Keyboard';`,
    );

    await queryRunner.query(
      `DELETE FROM leaf 
        WHERE branch_id = ${ioBranch[0].id} 
          AND name IN ('Interface', 'Layout');`,
    );
  }

  private async deleteMouseIOLeafs(queryRunner: QueryRunner) {
    const ioBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Mouse';`,
    );

    await queryRunner.query(
      `DELETE FROM leaf 
        WHERE branch_id = ${ioBranch[0].id} 
          AND name IN ('Interface', 'Buttons');`,
    );
  }

  private async deleteMonitorIOLeafs(queryRunner: QueryRunner) {
    const ioBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'Monitor';`,
    );

    await queryRunner.query(
      `DELETE FROM leaf 
        WHERE branch_id = ${ioBranch[0].id} 
          AND name IN ('Interface', 'Resolution');`,
    );
  }

  private async deleteOSSoftwareLeafs(queryRunner: QueryRunner) {
    const softwareBranch = await queryRunner.query(
      `SELECT id FROM branch WHERE name = 'OS';`,
    );

    await queryRunner.query(
      `DELETE FROM leaf 
        WHERE branch_id = ${softwareBranch[0].id} 
          AND name IN ('Name', 'Version');`,
    );
  }
}
