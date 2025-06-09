import { FindOptionsSelect } from "typeorm";

export const ConvertQueryWhere = <T>(whereQuery: string): Partial<Record<keyof T, any>> | undefined => {
  if (!whereQuery) return undefined;

  const where: Partial<Record<keyof T, any>> = {};
  const conditions = whereQuery.split(',').map(c => c.trim());

  for (const cond of conditions) {
    const [key, value] = cond.split('=');
    if (key && value) {
      where[key.trim() as keyof T] = value.trim().replace(/^'|'$/g, '');
    }
  }

  return where;
};

export const ConvertQuerySelect = <T>(selectQuery: string): FindOptionsSelect<T> | undefined => {
  if (!selectQuery || selectQuery === '*') return undefined;

  const fields = selectQuery
    .split(',')
    .map(s => s.trim().replace(/^'|'$/g, ''))
    .filter(Boolean);

  const select: FindOptionsSelect<T> = {} as FindOptionsSelect<T>;
  for (const field of fields) {
    (select as any)[field] = true;
  }

  return select;
};
