import { Component, OnInit } from '@angular/core';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signUpPanel',
  templateUrl: './signUpPanel.component.html',
  styleUrls: ['./signUpPanel.component.scss']
})
export class SignUpPanelComponent implements OnInit {

  faKey = faKey;
  faEnvelope = faEnvelope;
  faUser = faUser;

  constructor() { }

  ngOnInit() {
  }

}
