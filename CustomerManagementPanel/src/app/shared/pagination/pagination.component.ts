import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { skip, filter } from 'rxjs/operators';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() items = [];
  @Input() pageSize = 5;
  @Input() startPage = 1;

  @Output("pageChangedEventEmitter") pageChangedEventEmitter: EventEmitter<MyPager> = new EventEmitter<MyPager>();
  
  
  page: number = 1;  
  pageOfItems: Array<any>;
  maxPages: number;
  pages: number[];


  constructor() { 
   
  }

  ngOnInit() {
    this.maxPages = this.items.length / this.pageSize;
    this.pages = new Array(this.maxPages);
  }


setPage(page: number) {
  this.page = page;

  let numberToSlice = ((this.page - 1) * this.pageSize);
  this.pageOfItems = this.items.slice(numberToSlice, numberToSlice + this.pageSize);
  console.log("page of items:", this.pageOfItems);

  // call change page function in parent component
  let myPager = new MyPager(this.pageOfItems, this.page, this.maxPages);
  console.log("yPager:", myPager);
  this.pageChangedEventEmitter.emit(myPager);
}

// paginate(itemsLength: number, page: number, pageSize: number, maxPages: number){
//   let pages = itemsLength / pageSize;

//   let pager = {
//     currentPage: 1,
//     totalPages: 10,
//     pages: [1, 2, 3, 4, 5]
//   };

//   return pager;
// }
// }

// export interface Pager {
//   currentPage: number;
//   totalPages: number;
//   pages: number[];
// }
}

export class MyPager {
  pageOfItems: any[];
  currentPage: number;
  totalPages: number;

  /**
   *
   */
  constructor(pageOfItems: any[], currentPage: number, totalPages: number) {
    this.pageOfItems = pageOfItems;
    this.currentPage = currentPage;
    this.totalPages = totalPages;
  }
}
