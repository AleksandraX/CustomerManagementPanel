import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MyPager, OrderedItem } from '../models/shared.models';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() items = [];
  @Input() pageSize = 10;
  @Input() startPage = 1;

  @Output('pageChangedEventEmitter')
  pageChangedEventEmitter: EventEmitter<MyPager> = new EventEmitter<MyPager>();

  orderedItems: Array<OrderedItem> = [];

  page: number = 1;
  pageOfItems: Array<OrderedItem> = [];
  maxPages: number;
  pages: number[];

  constructor() {}

  ngOnInit() {
    this.setPage(1);
  }

  ngOnChanges() {
    this.setPage(1);
  }

  setOrderedItems() {
    for (let i = 0; i < this.items.length; i++) {
      let item = new OrderedItem(i + 1, this.items[i]);
      this.orderedItems.push(item);
    }
  }

  countingMaxPages() {
    this.maxPages = Math.ceil(this.items.length / this.pageSize);
    if (this.maxPages < 1) {
      this.maxPages = 1;
    }
  }

  fillingPagesArray() {
    this.pages = new Array(this.maxPages).fill(1).map((x, i) => ++i);
  }

  slicingOrderedItemsForOnePage() {
    let numberToSlice = (this.page - 1) * this.pageSize;
    this.pageOfItems = this.orderedItems.slice(
      numberToSlice,
      numberToSlice + this.pageSize
    );
  }

  setPage(page: number) {
    if(this.items.length < 1) {
      let myPager = new MyPager(null, 1, 1);
      this.pageChangedEventEmitter.emit(myPager);
    }
    this.orderedItems = [];
    this.page = page;

    this.setOrderedItems();
    this.countingMaxPages();
    this.fillingPagesArray();
    this.slicingOrderedItemsForOnePage();

    let myPager = new MyPager(this.pageOfItems, this.page, this.maxPages);
    this.pageChangedEventEmitter.emit(myPager);
  }
}
