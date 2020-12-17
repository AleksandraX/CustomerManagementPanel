export class OrderedItem {
    orderNumber: number;
    item: any;
  
    constructor(orderNumber: number, item: any) {
      this.orderNumber = orderNumber;
      this.item = item;
      
    }
}


export class MyPager {
    pageOfItems: OrderedItem[];
    currentPage: number;
    totalPages: number;
  
    constructor(pageOfItems: any[], currentPage: number, totalPages: number) {   
      this.pageOfItems = pageOfItems;
      this.currentPage = currentPage;
      this.totalPages = totalPages;
    }
  }