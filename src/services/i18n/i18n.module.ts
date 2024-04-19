import path from 'path';

import { Module } from '@nestjs/common';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import { HEADER_LANG, DEFAULT_LANG } from 'src/constants';

import { LocalesService } from './i18n.service';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: DEFAULT_LANG,
      loaderOptions: {
        path: path.join(__dirname, '../../locales/'),
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: [HEADER_LANG] },
        AcceptLanguageResolver,
      ],
    }),
  ],
  providers: [LocalesService],
  exports: [LocalesService],
})
export class LocalesModule {}
