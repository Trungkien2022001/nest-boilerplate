import { I18nValidationPipe } from 'nestjs-i18n';

export class ValidationPipe extends I18nValidationPipe {
  constructor() {
    super({
      whitelist: true,
      transform: true,
      validationError: {
        target: true,
        value: true,
      },
      stopAtFirstError: true,
      forbidNonWhitelisted: true,
    });
  }
}
