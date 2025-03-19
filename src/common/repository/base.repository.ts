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
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
  async findById(payload: Partial<T> | Partial<T>[]): Promise<T[] | null> {
    return this.repository.find({ where: payload } as any);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async update(id: Partial<T>, data: Partial<T>): Promise<T | null> {
    await this.repository.update(id, data);
    return data as T;
  }

  async delete(id: Partial<T>): Promise<void> {
    await this.repository.delete(id);
  }
}
