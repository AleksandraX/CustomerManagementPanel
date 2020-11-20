import { Component, OnInit } from '@angular/core';
import { faBiking, faBook, faCar, faDrumstickBite, faDumbbell, faGamepad, faMeteor, faMicrochip, faMountain, faMusic, faRunning, faSkiing, faSkiingNordic, faSnowman, faStopwatch, faTools, faTree, faUtensils } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  faDumbbell = faDumbbell;
  faUtensils = faUtensils;
  faStopwatch = faStopwatch;
  faMountain = faMountain;
  faMeteor = faMeteor;
  faSkiingNordic = faSkiingNordic;
  faBiking = faBiking;
  faRunning = faRunning;
  faSkiing = faSkiing;
  faDrumstickBite = faDrumstickBite;
  faBook = faBook;
  faTree = faTree;
  faMusic = faMusic;
  faCar = faCar;
  faTools = faTools;
  faMicrochip = faMicrochip;
  faGamepad = faGamepad;



  constructor() { }

  ngOnInit() {
  }

}
