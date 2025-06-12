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

const OPERATORS = ['!=', '>=', '<=', '=', '>', '<', 'LIKE'];

export function parseCondition(condition: string): { field: string, operator: string, value: string } | null {
    for (const op of OPERATORS) {
        const parts = condition.split(op);
        if (parts.length === 2) {
            return {
                field: parts[0].trim(),
                operator: op,
                value: parts[1].trim().replace(/^['"]|['"]$/g, '') // remove quotes
            };
        }
    }
    return null;
}