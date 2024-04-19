import { Injectable } from '@nestjs/common';
import {
  I18nContext,
  I18nService as NestI18nService,
  TranslateOptions,
} from 'nestjs-i18n';
import { DEFAULT_LANG } from 'src/constants';

@Injectable()
export class LocalesService {
  constructor(private readonly nestI18nService: NestI18nService) { }

  translate(key: string, options?: TranslateOptions): string {
    if (options) {
      options['lang'] = options['lang'] || DEFAULT_LANG;
    }
    return this.nestI18nService.translate(
      key,
      options || {
        lang: I18nContext.current().lang,
      },
    );
  }
}
