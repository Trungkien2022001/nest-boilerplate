export class PaginationHelper {
  static plainPagination(result: any[], limit: number, offset: number): any[] {
    let newResult = [];
    for(const index in result) {
      if(+index >= offset && newResult.length < limit) {
        newResult.push(result[index]);
      }
    }
    return newResult;
  }
}
