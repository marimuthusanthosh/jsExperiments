// src/product/product.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ElasticsearchService } from '../elasticsearch/elasticsearch.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly productService: ProductService,
  ) {}

  // 🔹 Create a new product (MongoDB)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // 🔹 Get all products (MongoDB)
  @Get()
  async findAll() {
    return this.productService.findAll();
  }
  @Get('/search')
  async search(@Query('q') query: string) {

    console.log('Received search query:', query);
    if (!query) {
      throw new NotFoundException('Query parameter "q" is required');
    }
    // Use the correct Elasticsearch index name
    return this.elasticsearchService.search('searchengine.elasticsearchliveproducts', query);
  }

  // 🔹 Get one product by ID (MongoDB)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  // 🔹 Update a product (MongoDB)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const updated = await this.productService.update(id, updateProductDto);
    if (!updated) {
      throw new NotFoundException('Product not found');
    }
    return updated;
  }

  // 🔹 Delete a product (MongoDB)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   const deleted = await this.productService.remove(id);
  //   if (!deleted) {
  //     throw new NotFoundException('Product not found');
  //   }
  //   return { success: true };
  // }

  // 🔹 Full-text search in Elasticsearch

  // 🔹 Get product by ID from Elasticsearch
    @Get('/search/:id')
    async searchById(@Param('id') id: string) {
      const product = await this.elasticsearchService.getById('searchengine.elasticsearchliveproducts', id);
      if (!product) {
        throw new NotFoundException('Product not found in Elasticsearch');
      }
      return product;
    }
}
