import {
  Repository,
  EntityTarget,
  DataSource,
  ObjectLiteral,
  DeepPartial,
} from 'typeorm';

export class BaseRepository<T extends ObjectLiteral> {
  public repository: Repository<T>;

  constructor(dataSource: DataSource, entity: EntityTarget<T>) {
    this.repository = dataSource.getRepository(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findById(payload: Partial<T> | Partial<T>[], select?: (keyof T)[]): Promise<T[] | null> {
    return this.repository.find({ where: payload, select: select as (keyof T)[] | undefined, } as any);
  }

  async findOneById(payload: Partial<T> | Partial<T>[], select?: (keyof T)[]): Promise<T | null> {
    const data = await this.repository.find({ where: payload, select: select as (keyof T)[] | undefined, } as any);

    if (!data || !data.length) return null;

    return data[0];
  }

  async create(data: DeepPartial<T>): Promise<T> {
    await this.repository.insert(data as T);

    return this.repository.findOne({ where: data as T }) as Promise<T>;
  }

  async update(
    id: Partial<T> | Partial<T>[],
    data: Partial<T>,
  ): Promise<T | null> {
    await this.repository.update(id as any, data);
    return data as T;
  }

  async delete(id: Partial<T>): Promise<void> {
    await this.repository.delete(id);
  }

  async execProcedure<R = any>(procedureName: string, parameters?: Record<string, any>): Promise<R[]> {
    if (!parameters || Object.keys(parameters).length === 0) {
      return this.repository.query(`EXEC ${procedureName}`);
    }

    const sqlParams = Object.entries(parameters).map(([key, value]) => {
      if (typeof value === 'string') {
        return `@${key} = N'${value.replace(/'/g, "''")}'`; // N'...' để hỗ trợ Unicode và escape '
      } else if (value instanceof Date) {
        return `@${key} = '${value.toISOString()}'`;
      } else {
        return `@${key} = ${value}`;
      }
    });

    const query = `EXEC ${procedureName} ${sqlParams.join(', ')}`;

    return this.repository.query(query);
  }
}
