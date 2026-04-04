import { prisma } from '../../db/prisma.js';

export type ExampleRecord = {
  id: string;
  title: string;
  createdAt: string;
};

function toRecord(row: {
  id: string;
  title: string;
  createdAt: Date;
}): ExampleRecord {
  return {
    id: row.id,
    title: row.title,
    createdAt: row.createdAt.toISOString(),
  };
}

export const exampleRepository = {
  async findById(id: string): Promise<ExampleRecord | undefined> {
    const row = await prisma.example.findUnique({ where: { id } });
    return row ? toRecord(row) : undefined;
  },

  async create(title: string): Promise<ExampleRecord> {
    const row = await prisma.example.create({ data: { title } });
    return toRecord(row);
  },

  async listPaged(
    page: number,
    limit: number,
  ): Promise<{
    items: ExampleRecord[];
    page: number;
    limit: number;
    total: number;
  }> {
    const skip = (page - 1) * limit;
    const [rows, total] = await Promise.all([
      prisma.example.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.example.count(),
    ]);
    return {
      items: rows.map(toRecord),
      page,
      limit,
      total,
    };
  },
};
