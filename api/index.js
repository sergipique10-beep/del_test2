const express = require('express');

const server = express();

const ready = (async () => {
  const { NestFactory } = require('@nestjs/core');
  const { ExpressAdapter } = require('@nestjs/platform-express');
  const { AppModule } = require('../dist/app.module');

  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  await app.init();
})();

module.exports = async (req, res) => {
  await ready;
  server(req, res);
};
