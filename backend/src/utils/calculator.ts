import { evaluate } from 'mathjs';

export async function calculate(expression: string) {
  try {
    const result = evaluate(expression);
    return result.toString();
  } catch {
    throw new Error('Invalid math expression');
  }
}