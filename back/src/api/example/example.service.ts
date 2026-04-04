import { exampleRepository } from './example.repository.js';
import type { ExampleRecord } from './example.repository.js';

export const exampleService = {
  async listPaged(
    page: number,
    limit: number,
  ): Promise<{
    items: ExampleRecord[];
    page: number;
    limit: number;
    total: number;
  }> {
    return exampleRepository.listPaged(page, limit);
  },

  async getById(id: string): Promise<ExampleRecord | undefined> {
    return exampleRepository.findById(id);
  },

  async create(title: string): Promise<ExampleRecord> {
    return exampleRepository.create(title);
  },
};
