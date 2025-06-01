import { FastifyPluginAsync } from 'fastify';
import { z } from 'zod';
import { webSearch } from '../utils/webSearch';
import { calculate } from '../utils/calculator';
import { formatResponse } from '../utils/openai';
import { storeRun } from '../utils/mysql';
import { cacheRun } from '../utils/redis';

const RunSchema = z.object({
  prompt: z.string().max(500, 'Prompt must be 500 characters or less'),
  tool: z.enum(['web-search', 'calculator'], {
    errorMap: () => ({ message: 'Tool must be either "web-search" or "calculator"' }),
  }),
});

const runRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post('/run', async (request, reply) => {
    try {
      const { prompt, tool } = RunSchema.parse(request.body);
      let result: any;
      if (tool === 'web-search') {
        result = await webSearch(prompt);
      } else if (tool === 'calculator') {
        result = await calculate(prompt);
      }
      const formattedResponse = await formatResponse(prompt, tool, result);
      await storeRun(prompt, tool, formattedResponse, 0); // Mock tokens
      await cacheRun('mock-user', { prompt, tool, response: formattedResponse, timestamp: new Date() });
      return { success: true, result: formattedResponse };
    } catch (error: any) {
      reply.status(400).send({ error: error.message || 'Invalid input' });
    }
  });
};

export default runRoute;