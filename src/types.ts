export interface MetaModelBranch {
  id: number;
  name: string;
  status: string;
  order: number;
  systems: MetaModelBranch[];
  components: MetaModelLeaf[];
}

export interface MetaModelLeaf {
  name: string;
  description: string;
  type: string;
  order: number;
  status: string;
  attributes:
    | MetaModelLeafNumberAttribute
    | MetaModelLeafStringAttribute
    | MetaModelLeafRangeAttribute;
}

export interface MetaModelLeafNumberAttribute {
  value: number;
}

export interface MetaModelLeafStringAttribute {
  value: string;
}

export interface MetaModelLeafRangeAttribute {
  min: number;
  max: number;
}
