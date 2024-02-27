import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const configService = app.get(ConfigService);

  const port = configService.get('API_DOCKER_PORT') || 3001;

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port).then(() => {
    console.log(`Server started on port ${port}`);
  });

  // This is necessary to make the hot-reload work with Docker
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
