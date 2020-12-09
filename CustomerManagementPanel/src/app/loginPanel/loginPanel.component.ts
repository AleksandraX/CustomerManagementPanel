import { Component, OnInit } from '@angular/core';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loginPanel',
  templateUrl: './loginPanel.component.html',
  styleUrls: ['./loginPanel.component.scss']
})
export class LoginPanelComponent implements OnInit {

  faKey = faKey;
  faUser =faUser;

  constructor() { }

  ngOnInit() {
  }

}
