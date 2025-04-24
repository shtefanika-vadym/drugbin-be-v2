import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

import type { DrugItem } from 'generated/prisma'
import { DrugCategory, DrugPack } from 'generated/prisma'

export const DrugItemSchema = z
  .object({
    ocr: z.string(),
    concentration: z.string(),
    pack: z.nativeEnum(DrugPack),
    category: z.nativeEnum(DrugCategory),
    name: z.string().min(1, 'Name is required'),
    weight: z.number().positive('Weight must be a positive number'),
  })
  .refine((data): data is DrugItem => true)

export const DrugItemsSchema = z.array(DrugItemSchema)

export class CreateCollectionDto extends createZodDto(DrugItemsSchema) {}
