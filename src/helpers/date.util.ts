import moment from 'moment';
import Moment from 'moment-timezone';
import { OBJECT, STRING, TIME } from 'src/constants';

export class DateUtil {
  static formats: ['YYYY-MM-DD HH:mm:ss', `YYYY-MM-DD'T'HH:mm:ssZ`];

  static isObject(value: any): boolean {
    return typeof value === OBJECT && value !== null;
  }

  static convertClientTimeZoneToUtc(obj: object, timeZone: string): object {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        if (this.isObject(obj[key])) {
          obj[key] = this.convertClientTimeZoneToUtc(obj[key], timeZone);
        }
        if (typeof obj[key] === STRING && this.checkIsDate(obj[key])) {
          const timeZoneClient = moment.tz(obj[key], timeZone);
          obj[key] = timeZoneClient.clone().tz('UTC').format();
        }
      });
    }
    return obj;
  }

  static convertUtcToClientTimeZone(obj: object, timeZone: string): object {
    if (obj) {
      Object.keys(obj).forEach((key) => {
        if (this.isObject(obj[key])) {
          obj[key] = this.convertUtcToClientTimeZone(obj[key], timeZone);
        }
        if (obj[key] instanceof Date) {
          const timeZoneClient = moment.tz(obj[key], 'UTC');
          obj[key] = timeZoneClient.clone().tz(timeZone).format();
        }
      });
    }
    return obj;
  }

  static checkIsDate(dateString: string): boolean {
    return moment(dateString, DateUtil.formats, true).isValid();
  }

  static getNowDateTimeStr(): string {
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  }

  static startHour(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return date;
  }

  static endHour(date: Date): Date {
    date.setHours(0, 0, 0, 0);
    return new Date(date.getTime() + TIME.ONE_DAY * 1000);
  }

  static getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }

  static addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
