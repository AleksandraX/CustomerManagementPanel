import { Component, OnInit } from '@angular/core';
import { faSignInAlt, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  faUser = faUser;
  faSignInAlt = faSignInAlt;
  faUserPlus = faUserPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
