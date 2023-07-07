import { IsNull, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Branch } from 'src/entities/branch.entity';

@Injectable()
export class BranchesService {
  constructor(
    @InjectRepository(Branch)
    private branchesRepository: Repository<Branch>,
  ) {}

  async findAllByParent(parentId: number | null): Promise<Branch[]> {
    return await this.branchesRepository.find({
      where: { parentId: parentId ?? IsNull() },
      order: { order: 'ASC' },
      relations: [
        'status',
        'branches',
        'leaves',
        'leaves.leafType',
        'leaves.status',
        // Load relations one level deeper
        'branches.status',
        'branches.leaves',
        'branches.leaves.leafType',
        'branches.leaves.status',
      ],
    });
  }

  findOne(id: number): Promise<Branch | null> {
    return this.branchesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.branchesRepository.delete(id);
  }
}
