import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './products/products.controller';
import { ProductModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ElasticsearchModule } from './elasticsearch/elasticsearch.module';


@Module({
  imports: [
    MongooseModule.forRoot('Add yourConnectionStringURL'),     
    ProductModule,
    ElasticsearchModule
  ],

  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
