import { Component, OnInit } from '@angular/core';
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faFontAwesome = faFontAwesome;

  constructor() { }

  ngOnInit() {
  }

}
