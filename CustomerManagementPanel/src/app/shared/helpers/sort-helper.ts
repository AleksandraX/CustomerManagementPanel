
export class SortHelper {

  // static sortingOfElements(sortOfOrderList: any[], propertyName: string, isAsc: boolean = true){
  //   let ascOrDescNumber: number;
  //   if (isAsc) {
  //     ascOrDescNumber = 1;
  //   }
  //   else {
  //     ascOrDescNumber = -1;
  //   }

  //     sortOfOrderList.sort(
  //       (a, b) => { 
  //         if(a[propertyName] > b[propertyName]) {
  //           return 1 * ascOrDescNumber;
  //         }

  //         if(a[propertyName] < b[propertyName]) {
  //           return -1 * ascOrDescNumber;
  //         }

  //         return 0;
  //       });

  //   console.log(sortOfOrderList);
  //    return sortOfOrderList;
  // }



static sortingOfElements(sortOfOrderList: any[], propertyName: string, isAsc: boolean = true){

    sortOfOrderList.sort(
      (a, b) => { 
        if(a[propertyName] > b[propertyName]) {
          return isAsc ? 1 : -1
        }

        if(a[propertyName] < b[propertyName]) {
          return isAsc ? -1 : 1
        }

        return 0;
      });

   return sortOfOrderList;
}


// static sortingOfElements2(sortOfOrderList: any[], propertyName: string, isAsc: boolean = true){

//   sortOfOrderList.sort(
//     (a, b) =>  
//       (a[propertyName] > b[propertyName]) ? (isAsc ? 1 : -1) : 
//       ((a[propertyName] < b[propertyName]) ? (isAsc ? -1 : 1) : 0));

//  return sortOfOrderList;
// }

};