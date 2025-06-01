import Fastify, { FastifyInstance } from 'fastify';
import runRoute from './routes/run';

const app: FastifyInstance = Fastify({ logger: true });

// Register routes
app.register(runRoute, { prefix: '/api' });

app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Backend running at ${address}`);
});