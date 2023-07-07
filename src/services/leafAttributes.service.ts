import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LeafType } from 'src/entities/leafType.entity';
import { LeafNumberAttribute } from 'src/entities/leafNumberAttribute.entity';
import { LeafStringAttribute } from 'src/entities/leafStringAttribute.entity';
import { LeafRangeAttribute } from 'src/entities/leafRangeAttribute';
import { LeafTypes } from 'src/enums';

@Injectable()
export class LeafAttributesService {
  constructor(
    @InjectRepository(LeafNumberAttribute)
    private leafNumberAttributeRepository: Repository<LeafNumberAttribute>,
    @InjectRepository(LeafStringAttribute)
    private leafStringAttributeRepository: Repository<LeafStringAttribute>,
    @InjectRepository(LeafRangeAttribute)
    private leafRangeAttributeRepository: Repository<LeafRangeAttribute>,
  ) {}

  async findAttributeBy(
    leafType: LeafType,
    leafAttributeId: number,
  ): Promise<LeafNumberAttribute | LeafStringAttribute | LeafRangeAttribute> {
    switch (leafType.name) {
      case LeafTypes.Number:
        return this.leafNumberAttributeRepository.findOneBy({
          id: leafAttributeId,
        });
      case LeafTypes.String:
        return this.leafStringAttributeRepository.findOneBy({
          id: leafAttributeId,
        });
      case LeafTypes.Range:
        return this.leafRangeAttributeRepository.findOneBy({
          id: leafAttributeId,
        });
    }
  }
}
