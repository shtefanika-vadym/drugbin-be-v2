import { Injectable } from '@nestjs/common'

import { CollectionStatus } from 'generated/prisma'

import { PrismaService } from '@/common/services/prisma.service'

import type { CreateCollectionDto } from '@/collection/dto/create-collection.dto'

@Injectable()
export class CollectionService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, drugs: CreateCollectionDto) {
    return this.prisma.collection.create({
      data: {
        userId,
        status: CollectionStatus.COLLECTED,
        weight: this.calculateTotalWeight(drugs),
        drugs: {
          createMany: { data: drugs },
        },
      },
      omit: { userId: true },
    })
  }

  async findAll(userId: string, status: CollectionStatus = CollectionStatus.COLLECTED) {
    return this.prisma.collection.findMany({
      where: {
        userId,
        status,
      },
      include: {
        drugs: {
          omit: { collectionId: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      omit: {
        userId: true,
      },
    })
  }

  async findOne(id: string) {
    return this.prisma.collection.findUnique({
      where: { id },
      include: { drugs: true },
    })
  }

  private calculateTotalWeight(drugs: CreateCollectionDto): number {
    return drugs.reduce((sum, drug) => sum + (drug.weight ?? 0), 0)
  }
}
