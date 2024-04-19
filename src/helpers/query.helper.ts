import { Op, WhereOptions } from 'sequelize';

export class QueryHelper {
  /**
   * return an whereOptions object that select all record have any field value in "fields" include "search" string case insensitively
   * @param {string} search
   * @param {string[]} fields
   * @returns {WhereOptions}
   */
  static searchQuery(search: string, fields: string[]): WhereOptions {
    const caseInsensitiveSearchObject = {};
    if (!search) return caseInsensitiveSearchObject;
    search = search.trim();
    fields.forEach((field) => {
      caseInsensitiveSearchObject[field] = {
        [Op.like]: `%${search}%`,
      };
    });
    return {
      [Op.or]: caseInsensitiveSearchObject,
    };
  }

  /**
   * return an whereOptions object that contains all field in "fields" and its value in "filter" object is defined
   * example: filter = {name: 'abc', age: 20}, fields = ['name', 'age', 'address']
   * return {name: 'abc', age: 20}
   * @param {object} filter
   * @param {string[]} fields
   * @returns {WhereOptions}
   */
  static filterQuery(filter: object, fields: string[]): WhereOptions {
    const filterObject = {};
    if (!filter) return filterObject;
    fields.forEach((field) => {
      if (filter[field]) {
        filterObject[field] = filter[field];
      }
    });
    return filterObject;
  }
}
