import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import { CollectionStatus } from 'generated/prisma'

import { DrugItemsSchema } from '@/collection/dto/create-collection.dto'

const CollectionSchema = z.object({
  weight: z.number(),
  id: z.string().uuid(),
  drugs: DrugItemsSchema,
  status: z.nativeEnum(CollectionStatus),
})

export class CollectionResponseDto extends createZodDto(CollectionSchema) {}
