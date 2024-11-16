import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { swaggerOptions, swaggerPrefix } from '@/config/swagger.config';
import { corsConfig } from './config/cors.config';
import { SERVER_PORT, sessionConfig } from './config/root.config';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors(corsConfig);

  // swagger
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(swaggerPrefix, app, document);

  // validation
  app.useGlobalPipes(new ValidationPipe());

  // session
  app.use(sessionConfig);

  // websocket
  // app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(SERVER_PORT);
}

bootstrap()
  .then(async () => {
    console.log(`Server is running on http://localhost:${SERVER_PORT}/api`);
  })
  .catch(() => {
    console.log(`Server error`);
  });
