import { Component, OnInit } from '@angular/core';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';
import { faSort, faObjectGroup, faFilter, faListOl, faMapMarkedAlt, faSearch, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faFontAwesome = faFontAwesome;
  faSort = faSort;
  faObjectGroup = faObjectGroup;
  faFilter = faFilter;
  faListOl = faListOl;
  faMapMarkedAlt = faMapMarkedAlt;
  faSearch = faSearch;
  faCheckSquare = faCheckSquare;
  faSquare = faSquare;

  constructor() { }

  ngOnInit() {
  }

}
