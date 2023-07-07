import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { BranchesService } from './services/branches.service';
import { LeafAttributesService } from './services/leafAttributes.service';

import { Branch } from './entities/branch.entity';
import { Status } from './entities/status.entity';
import { Leaf } from './entities/leaf.entity';
import { LeafType } from './entities/leafType.entity';
import { LeafNumberAttribute } from './entities/leafNumberAttribute.entity';
import { LeafStringAttribute } from './entities/leafStringAttribute.entity';
import { LeafRangeAttribute } from './entities/leafRangeAttribute';
import { dataSourceOptions } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      migrations: [],
      entities: [
        Branch,
        Status,
        LeafType,
        Leaf,
        LeafNumberAttribute,
        LeafStringAttribute,
        LeafRangeAttribute,
      ],
    }),
    TypeOrmModule.forFeature([
      Branch,
      Status,
      LeafType,
      Leaf,
      LeafNumberAttribute,
      LeafStringAttribute,
      LeafRangeAttribute,
    ]),
  ],
  controllers: [AppController],
  providers: [AppService, BranchesService, LeafAttributesService],
})
export class AppModule {}
