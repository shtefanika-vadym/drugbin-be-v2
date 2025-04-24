import { Body, Controller, Get, HttpStatus, Query, Post, UseGuards, Param } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger'

import { CollectionStatus } from 'generated/prisma'

import { User } from '@/user/user.decorator'

import { CollectionService } from '@/collection/collection.service'
import { CollectionResponseDto } from '@/collection/dto/collection-response.dto'
import { CreateCollectionDto } from '@/collection/dto/create-collection.dto'

@ApiTags('collections')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  @ApiBody({ type: CreateCollectionDto })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CollectionResponseDto,
    description: 'Collection created successfully',
  })
  @ApiOperation({ summary: 'Create a new collection' })
  create(@User('id') userId: string, @Body() dto: CreateCollectionDto) {
    return this.collectionService.create(userId, dto)
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [CollectionResponseDto],
    description: 'Retrieved all collections successfully',
  })
  @ApiOperation({ summary: 'Get all collections for user' })
  @ApiQuery({ name: 'status', enum: CollectionStatus, required: false })
  async findAll(@User('id') userId: string, @Query('status') status?: CollectionStatus) {
    return this.collectionService.findAll(userId, status)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get collection by id' })
  @ApiParam({ name: 'id', description: 'Collection id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CollectionResponseDto,
    description: 'Collection retrieved successfully',
  })
  async findOne(@Param('id') id: string) {
    return this.collectionService.findOne(id)
  }
}
