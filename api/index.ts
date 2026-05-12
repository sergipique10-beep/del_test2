import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { AppModule } from '../src/app.module';

const server = express();
let isReady = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
  isReady = true;
}

const ready = bootstrap();

export default async function handler(req: express.Request, res: express.Response) {
  await ready;
  server(req, res);
}
