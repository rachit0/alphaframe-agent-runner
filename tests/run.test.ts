import { describe, it, expect, vi } from 'vitest';
import Fastify from 'fastify';
import { RunSchema } from '../backend/src/routes/run';
import { storeRun } from '../backend/src/utils/mysql';

// Mock mysql2 to avoid real DB calls
vi.mock('mysql2/promise', () => ({
  createPool: () => ({
    getConnection: async () => ({
      execute: vi.fn(),
      release: vi.fn(),
    }),
  }),
}));

describe('POST /api/run', () => {
  it('validates valid input', () => {
    const input = { prompt: '2+2', tool: 'calculator' };
    expect(RunSchema.parse(input)).toEqual(input);
  });

  it('rejects invalid tool', () => {
    expect(() => RunSchema.parse({ prompt: 'Test', tool: 'invalid' })).toThrow('Tool must be');
  });

  it('handles calculator happy path', async () => {
    const app = Fastify();
    await app.register(import('../backend/src/routes/run'), { prefix: '/api' });
    const response = await app.inject({
      method: 'POST',
      url: '/api/run',
      payload: { prompt: '2+2', tool: 'calculator' },
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().success).toBe(true);
  });

  it('stores run in MySQL', async () => {
    await expect(
      storeRun('2+2', 'calculator', 'The answer is 4', 0)
    ).resolves.toBeUndefined();
  });
});