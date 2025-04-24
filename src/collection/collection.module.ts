import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { PrismaService } from '@/common/services/prisma.service'

import { CollectionController } from '@/collection/collection.controller'
import { CollectionService } from '@/collection/collection.service'

@Module({
  controllers: [CollectionController],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [CollectionService, PrismaService],
  exports: [CollectionService],
})
export class CollectionModule {}
