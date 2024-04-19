import { ArgumentMetadata, BadRequestException, ValidationPipe as NestValidationPipe } from '@nestjs/common';
import { BODY_REQUEST, OBJECT, STRING, SYSTEM } from 'src/constants';
import { ErrorHelper } from 'src/helpers';

export class TrimSpacePipe extends NestValidationPipe {
    isObj(value: any): boolean {
        return typeof value === OBJECT && value !== null;
    }

    trimObj(obj: any): any {
        Object.keys(obj).forEach((key) => {
            if (this.isObj(obj[key])) {
                obj[key] = this.trimObj(obj[key]);
            }
            if (typeof obj[key] === STRING) {
                obj[key] = obj[key].trim();
            }
        });
        return obj;
    }

    transform(value: any, metadata: ArgumentMetadata): any {
        const { type } = metadata;
        if (this.isObj(value) && type === BODY_REQUEST) {
            return this.trimObj(value);
        }

        ErrorHelper.BadRequestException(SYSTEM.BAD_REQUEST);
    }
}
