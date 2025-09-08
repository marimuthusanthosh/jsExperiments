// src/elasticsearch/elasticsearch.module.ts
import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  providers: [ElasticsearchService],
  exports: [ElasticsearchService], // 👈 export so other modules can use it
})
export class ElasticsearchModule {}
