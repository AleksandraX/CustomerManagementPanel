import { Component, OnInit } from '@angular/core';
import { faHammer, faWrench } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inProgress',
  templateUrl: './inProgress.component.html',
  styleUrls: ['./inProgress.component.scss']
})
export class InProgressComponent implements OnInit {

  faWrench = faWrench;
  faHammer = faHammer;

  constructor() { }

  ngOnInit() {
  }

}
