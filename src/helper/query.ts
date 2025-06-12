import { FindOptionsSelect } from "typeorm";
import jsep from 'jsep'; 

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

export function normalizeWhereQuery(where: string): string {
  return where
    .replace(/([^=!<>])=([^=])/g, '$1==$2')  // a=b  => a==b
    .replace(/<>/g, '!=')                   // SQL <> => !=
    .replace(/'/g, '"')                     // 'abc' => "abc"
    .trim();
}

export function buildWhereFromAst(node: jsep.Expression, index = { i: 0 }): { clause: string; params: any } {
  if (!node || typeof node !== 'object' || !('type' in node)) {
    throw new Error('Invalid expression node');
  }

  if (node.type === 'BinaryExpression') {
    const binary = node as jsep.BinaryExpression;
    const operator = binary.operator?.toUpperCase();

    if (!operator) throw new Error('Missing operator');

    const isLogical = ['AND', '&&', '&', 'OR', '||', '|'].includes(operator);

    if (isLogical) {
      const left = buildWhereFromAst(binary.left as jsep.Expression, index);
      const right = buildWhereFromAst(binary.right as jsep.Expression, index);
      const joiner = ['OR', '||', '|'].includes(operator) ? 'OR' : 'AND';
      return {
        clause: `(${left.clause} ${joiner} ${right.clause})`,
        params: { ...left.params, ...right.params },
      };
    }

    // 🔁 Convert JS operator to SQL
    let sqlOperator = operator;
    if (operator === '==') sqlOperator = '=';
    if (operator === '!=') sqlOperator = '!=';

    const paramKey = `param_${index.i++}`;
    const field = (binary.left as jsep.Identifier).name;
    const value = (binary.right as jsep.Literal).value;

    const clause = field.includes('.')
      ? `${field} ${sqlOperator} :${paramKey}`
      : `tiepnhan.${field} ${sqlOperator} :${paramKey}`;

    return {
      clause,
      params: { [paramKey]: value },
    };
  }

  throw new Error(`Unsupported node type: ${node.type}`);
}