import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faExclamation, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { UserAccountForCreation } from '../clients/models/signUp';
import { MyFormGroup } from '../shared/extentions/myFormGroup';
// import { FormHelpersService } from '../shared/helpers/formHelpers.service';
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
  form: MyFormGroup = null;
  userAccount: UserAccountForCreation = {
    
     firstName: "", 
     lastName: "", 
     emailAddress: "", 
     password: ""
    };

  constructor(
    private signUpService: SignUpService,
    // public formHelper: FormHelpersService
  ) { 
    

    this.form = new MyFormGroup({
      "firstName": new FormControl(this.userAccount.firstName,[
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(25), 
        Validators.pattern('[a-zA-Z ]*')]),

      "lastName": new FormControl(this.userAccount.lastName,[
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(30), 
        Validators.pattern('[a-zA-Z]*')]),

      "emailAddress": new FormControl(this.userAccount.emailAddress,[
          Validators.required,
          Validators.minLength(5), 
          Validators.maxLength(40),
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),

      "password": new FormControl(this.userAccount.password,[
        Validators.required,
        Validators.minLength(8), 
        Validators.maxLength(40)])
    }); 

    // this.formHelper.form = this.form;
  }

  ngOnInit() {
  }

  // checkIsRequired(propName: string) : boolean {
  //   return this.checkError(propName, 'required');
  // }

  // checkIsMinLength(propName: string) : boolean {
  //   return this.checkError(propName, 'minlength');
  // }

  // checkIsMaxLength(propName: string) : boolean {
  //   return this.checkError(propName, 'maxlength');
  // }

  // checkIsPattern(propName: string) : boolean {
  //   return this.checkError(propName, 'pattern');
  // }


  // checkError(propName: string, errorType: string): boolean{
  //   return (
  //    this.form.get(propName)?.invalid &&
  //    this.form.get(propName)?.hasError(errorType) && 
  //    this.form.get(propName).touched &&
  //    this.form.get(propName).dirty
  //  );
  // }

  saveUserAccount(){
    console.log("first step saving", this.form.value);

    let userToCreate: UserAccountForCreation = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      emailAddress: this.form.value.emailAddress,
      password: this.form.value.password
    }

    console.log("saving", userToCreate)
     this.signUpService.create(userToCreate).subscribe(response => {
       console.log("Subscribe for creation")
     });
  
  };
}