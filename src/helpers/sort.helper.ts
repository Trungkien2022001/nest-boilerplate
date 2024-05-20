export class SortHelper {
  static plainSort(result: any[], sortQuery: any): any[] {
    const sortOptions = sortQuery.split(',');
    for (const sortOption of sortOptions) {
      const [field, option = 'ASC'] = sortOption.split(':');
      if (option === 'ASC' || option === 'asc') {
        result.sort((a, b) => a[field] - b[field]);
      } else if (option === 'DESC' || option === 'desc') {
        result.sort((a, b) => b[field] - a[field]);
      }
    }
    return result;
  }
}
