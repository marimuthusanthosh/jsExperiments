// src/elasticsearch/elasticsearch.service.ts
import { Injectable } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticsearchService {
  private client: Client;

  constructor() {
    this.client = new Client({
      node: 'http://localhost:9200',
    });
  }

  /**
   * Full-text search across multiple fields
   */
  async search(index: string, query: string) { 

    console.log('Searching Elasticsearch with query:', query);
    console.log('Using index:', index);

    const result = await this.client.search({
      index,
      query: {
        multi_match: {
          query,
          fields: [
            'productName^3',
            'productDescription',
            'detailedDescription',
            'category.name',
            'subCategory.name',
          ],
        },
      },
    });

    // in v8 result = SearchResponse<T>
    return result.hits.hits.map((hit: any) => hit._source);
  }

  /**
   * Get a document by ID from Elasticsearch
   */
  async getById(index: string, id: string) {
    try {
      const result = await this.client.get({ index, id });
      return (result as any)._source; // response already contains _source
    } catch (err: any) {
      if (err.meta?.statusCode === 404) {
        return null;
      }
      throw err;
    }
  }

  /**
   * Delete a document by ID from Elasticsearch
   */
  async deleteById(index: string, id: string) {
    try {
      await this.client.delete({ index, id });
      return { success: true };
    } catch (err: any) {
      if (err.meta?.statusCode === 404) {
        return { success: false, message: 'Not found in Elasticsearch' };
      }
      throw err;
    }
  }
}
