import { Branch } from '../entities/branch.entity';
import { Leaf } from '../entities/leaf.entity';
import { LeafNumberAttribute } from '../entities/leafNumberAttribute.entity';
import { LeafRangeAttribute } from '../entities/leafRangeAttribute';
import { LeafStringAttribute } from '../entities/leafStringAttribute.entity';
import { LeafType } from '../entities/leafType.entity';
import { LeafTypes } from '../enums';
import {
  MetaModelBranch,
  MetaModelLeaf,
  MetaModelLeafNumberAttribute,
  MetaModelLeafRangeAttribute,
  MetaModelLeafStringAttribute,
} from '../types';

export const mapBranchToMetaModel = (branch: Branch): MetaModelBranch => {
  return {
    id: branch.id,
    name: branch.name,
    status: branch.status.name,
    order: branch.order,
    systems: branch.branches?.map(mapBranchToMetaModel),
    components: branch.leaves?.map(mapBranchLeafToMetaModel),
  };
};

export const mapBranchLeafToMetaModel = (
  leaf: Leaf & {
    attributes: LeafNumberAttribute | LeafStringAttribute | LeafRangeAttribute;
  },
): MetaModelLeaf => {
  return {
    name: leaf.name,
    description: leaf.description,
    type: leaf.leafType.name,
    order: leaf.order,
    status: leaf.status.name,
    attributes: mapLeafAttributeToMetaModel(leaf.leafType, leaf.attributes),
  };
};

export const mapLeafAttributeToMetaModel = (
  leafType: LeafType,
  leafAttribute: LeafNumberAttribute | LeafStringAttribute | LeafRangeAttribute,
):
  | MetaModelLeafNumberAttribute
  | MetaModelLeafStringAttribute
  | MetaModelLeafRangeAttribute => {
  switch (leafType.name) {
    case LeafTypes.Number:
      return {
        value: (leafAttribute as LeafNumberAttribute).value,
      };
    case LeafTypes.String:
      return {
        value: (leafAttribute as LeafStringAttribute).value,
      };
    case LeafTypes.Range:
      return {
        min: (leafAttribute as LeafRangeAttribute).min,
        max: (leafAttribute as LeafRangeAttribute).max,
      };
  }
};
