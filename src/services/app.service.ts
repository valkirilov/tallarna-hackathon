import { Injectable } from '@nestjs/common';

import { Branch } from '../entities/branch.entity';
import { Leaf } from '../entities/leaf.entity';

import { BranchesService } from './branches.service';
import { LeafAttributesService } from './leafAttributes.service';
import { mapBranchToMetaModel } from '../helpers/utils';
import { MetaModelBranch } from '../types';

@Injectable()
export class AppService {
  constructor(
    private readonly branchesService: BranchesService,
    private leafAttributesService: LeafAttributesService,
  ) {}

  async getMetaModel(): Promise<MetaModelBranch[]> {
    const branches = await this.branchesService.findAllByParent(null);
    const metaModelBranches = await this.buildMetaModelBranches(branches);

    // return branches;
    return metaModelBranches.map(mapBranchToMetaModel);
  }

  async buildMetaModelBranches(branches: Branch[]) {
    return Promise.all(
      branches
        .filter((branch) => branch.status.name === 'Active')
        .sort((item1, item2) => item1.order - item2.order)
        .map(async (branch) => {
          const leaves = await this.collectLeavesAttributes(branch.leaves);

          return {
            ...branch,
            leaves,
            branches: branch.branches
              ? await this.buildMetaModelBranches(branch.branches)
              : [],
          };
        }),
    );
  }

  async collectLeavesAttributes(leaves: Leaf[]) {
    return Promise.all(
      leaves
        .filter((leaf) => leaf.status.name === 'Active')
        .sort((leaf1, leaf2) => leaf1.order - leaf2.order)
        .map(async (leaf) => {
          const leafAttributes =
            await this.leafAttributesService.findAttributeBy(
              leaf.leafType,
              leaf.leafAttributeId,
            );

          return {
            ...leaf,
            attributes: leafAttributes,
          };
        }),
    );
  }
}
