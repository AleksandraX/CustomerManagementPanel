import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

import { faEnvelope, faPhone, IconName, IconLookup, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { faStackOverflow, faGithub, faMedium, faFacebookSquare, faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { isContinueStatement } from 'typescript';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faPhone = faPhone;
  faEnvelope = faEnvelope;
  faFacebookSquare = faFacebookSquare;
  faLinkedin = faLinkedin;
  faGithubSquare = faGithubSquare;

  constructor(private library: FaIconLibrary) { 
    library.addIcons(faSquare, faCheckSquare, faSquare, faCheckSquare, faStackOverflow, faGithub, faMedium);
  }
  ngOnInit(): void {
  }

}
