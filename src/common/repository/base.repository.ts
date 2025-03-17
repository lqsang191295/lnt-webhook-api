import {
  Repository,
  EntityTarget,
  DataSource,
  ObjectLiteral,
  DeepPartial,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  private repository: Repository<T>;

  constructor(dataSource: DataSource, entity: EntityTarget<T>) {
    this.repository = dataSource.getRepository(entity);

    console.log(this.repository.metadata.tableName);

    console.log('this.repository === ', dataSource.isInitialized);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(id: any): Promise<T[] | null> {
    return this.repository.find({ where: { Ma: id } } as any);
  }

  async findByRecord(payload: Record<string, any>): Promise<T[] | null> {
    if (!payload || Object.keys(payload).length === 0) {
      throw new Error('Payload is empty or invalid.');
    }

    return this.repository.find({ where: payload } as any);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data);
    return data as T;
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
