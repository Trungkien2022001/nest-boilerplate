import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { DEFAULT_LANG, HEADER_LANG, LANGUAGES } from 'src/constants';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const xLang = req.headers[HEADER_LANG]?.toString();
        if (!xLang || !LANGUAGES.includes(xLang)) {
            req.headers[HEADER_LANG] = DEFAULT_LANG;
        }
        next();
    }
}