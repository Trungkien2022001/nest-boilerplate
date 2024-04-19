import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import moment from 'moment';
import md5 from 'md5';
import { SECRET_UPLOAD } from 'src/constants';

@Injectable()
export class UploadGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const hash = req.headers.hash;
    return this.checkHashUpload(hash);
  }

  checkHashUpload(hash: string): boolean {
    const checkHash = md5(SECRET_UPLOAD + moment().utc().format('DD/MM/YYYY'));
    console.log('hash-upload - ', checkHash);
    if (hash === checkHash) {
      return true;
    }
    return false;
  }
}
