import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { ProductService } from './products.service'
import { ProductController } from './products.controller';
import { ElasticsearchModule } from '../elasticsearch/elasticsearch.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
    ]),
  ElasticsearchModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService], // export in case another module (e.g. Elasticsearch) needs it
})
export class ProductModule {}
