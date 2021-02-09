import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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

  SetOrderedItems(){
  for (let i = 0; i < this.items.length; i++) {
    let item = new OrderedItem(i + 1, this.items[i]);
    this.orderedItems.push(item);
  }}

  CountingMaxPages(){
  this.maxPages = Math.floor(this.items.length / this.pageSize);
  if (this.maxPages < 1) {
    this.maxPages = 1;
  }}

  FillingPagesArray(){
  this.pages = new Array(this.maxPages).fill(1).map((x, i) => ++i);}

  SlicingOrderedItemsForOnePage(){
  let numberToSlice = (this.page - 1) * this.pageSize;
  this.pageOfItems = this.orderedItems.slice(
    numberToSlice,
    numberToSlice + this.pageSize
  );}

  setPage(page: number) {
    this.orderedItems = [];
    this.page = page;

    this.SetOrderedItems()
    this.CountingMaxPages()
    this.FillingPagesArray()
    this.SlicingOrderedItemsForOnePage()

    let myPager = new MyPager(this.pageOfItems, this.page, this.maxPages);
    this.pageChangedEventEmitter.emit(myPager);
  }
}