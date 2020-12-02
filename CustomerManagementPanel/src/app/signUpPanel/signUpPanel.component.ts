import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faExclamation, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserAccountForCreation } from '../clients/models/signUp';
import { SignUpService } from './signUp.service';

@Component({
  selector: 'app-signUpPanel',
  templateUrl: './signUpPanel.component.html',
  styleUrls: ['./signUpPanel.component.scss']
})
export class SignUpPanelComponent implements OnInit {

  faExclamation = faExclamation;
  faKey = faKey;
  faEnvelope = faEnvelope;
  faUser = faUser;
  form: FormGroup = null;
  userAccount: UserAccountForCreation = { firstName: "", lastName: "", emailAddress: "", password: ""};

  constructor(
    private signUpService: SignUpService,
  ) { 

    this.form = new FormGroup({
      "firstName": new FormControl(this.userAccount.firstName,[Validators.required, Validators.minLength(3), Validators.maxLength(25), Validators.pattern('[a-zA-Z ]*')]),
      "lastName": new FormControl(this.userAccount.lastName,[Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-zA-Z]*')]),
      "emailAddress": new FormControl(this.userAccount.emailAddress,[Validators.required, Validators.minLength(5), Validators.maxLength(40), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      "password": new FormControl(this.userAccount.password,[Validators.required, Validators.minLength(8), Validators.maxLength(40)])
    }); 
  }

  ngOnInit() {
  }

  saveUserAccount(){
    console.log("first step saving", this.form.value);

    let userToCreate: UserAccountForCreation = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      emailAddress: this.form.value.emailAddress,
      password: this.form.value.password
    }

    console.log("saving", userToCreate)
    // wywolac service i zapisac
     this.signUpService.create(userToCreate).subscribe(response => {
       console.log("Subscribe for creation")
     });
  
  };


  required(propName: string): boolean {
    return (
     this.form.get(propName)?.hasError('required') && 
     this.form.get(propName).touched &&
     this.form.get(propName).dirty
   );
   }

   minLength(propName: string): boolean {
     return (
      this.form.get(propName)?.hasError('minlength') && 
      this.form.get(propName).touched &&
      this.form.get(propName).dirty
    );
     }

   maxLength(propName: string): boolean {
     return (
       this.form.get(propName)?.hasError('maxlength') && 
       this.form.get(propName).touched &&
       this.form.get(propName).dirty
     );
     }

    pattern(propName: string): boolean {
    return (
      this.form.get(propName)?.hasError('pattern') && 
      this.form.get(propName).touched &&
      this.form.get(propName).dirty
    );
    }



}


