import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = (app: NestExpressApplication) => {
  const config = new DocumentBuilder()
    .setTitle('KienTest Boilerplace')
    .setDescription('This is the KienTest Boilerplace API documentation!')
    .setVersion('1.0')
    .addTag('users')
    .addTag('upload')
    .addBearerAuth()
    .addSecurity('basic', {
      type: 'http',
      scheme: 'basic',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
