export class SortHelper {
  static sortingOfElements(
    sortOfOrderList: any[],
    propertyName: string,
    isAsc: boolean = true
  ) {
    sortOfOrderList.sort((a, b) => {
      if (a[propertyName] > b[propertyName]) {
        return isAsc ? 1 : -1;
      }

      if (a[propertyName] < b[propertyName]) {
        return isAsc ? -1 : 1;
      }

      return 0;
    });

    return sortOfOrderList;
  }
}
