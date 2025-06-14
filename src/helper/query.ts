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
    const operator = binary.operator;

    const logicalOps = ['&&', '||', 'AND', 'OR'];
    const comparisonOps = ['==', '!=', '>', '<', '>=', '<='];

    if (logicalOps.includes(operator)) {
      const left = buildWhereFromAst(binary.left, index);
      const right = buildWhereFromAst(binary.right, index);
      const joiner = ['||', 'OR'].includes(operator) ? 'OR' : 'AND';

      return {
        clause: `(${left.clause} ${joiner} ${right.clause})`,
        params: { ...left.params, ...right.params },
      };
    }

    if (comparisonOps.includes(operator)) {
      const paramKey = `param_${index.i++}`;
      const field = getField(binary.left);
      const value = getValue(binary.right);

      let sqlOperator = operator;
      if (operator === '==') sqlOperator = '=';
      if (operator === '!=') sqlOperator = '!=';

      return {
        clause: `${field} ${sqlOperator} :${paramKey}`,
        params: { [paramKey]: value },
      };
    }

    throw new Error(`Unsupported operator: ${operator}`);
  }

  throw new Error(`Unsupported node type: ${node.type}`);
}

function isIdentifier(node: jsep.Expression): node is jsep.Identifier {
  return node.type === 'Identifier' && typeof (node as any).name === 'string';
}

function getField(node: jsep.Expression): string {
  if (isIdentifier(node)) {
    return node.name.includes('.') ? node.name : `tiepnhan.${node.name}`;
  }
  throw new Error('Expected identifier on left side of binary expression');
}

function getValue(node: jsep.Expression): any {
  if (node.type === 'Literal') return node.value;
  throw new Error('Expected literal value on right side');
}