import CryptoJS from 'crypto-js';
import { HASH_KEY_AES } from 'src/constants';
import { EUserStatus } from 'src/enums';

export class CommonHelper {
  static generateOTP(): string {
    return Math.floor(Math.random() * 9000 + 100000) + '';
  }

  static hashData(data: string): string {
    const hash = CryptoJS.AES.encrypt(data, HASH_KEY_AES).toString();
    return hash;
  }

  static checkHashData(hash: string): string {
    const bytes = CryptoJS.AES.decrypt(hash, HASH_KEY_AES);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  }

  static random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
    }

    return randomString;
  }

  static getStatusActiveOrInactive(status): number {
    return status === EUserStatus.ACTIVE ? 1 : 0;
  }
}
