import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../clients/models/contact';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    
  contact: Contact = null;
  form: FormGroup;

  constructor() { }
  
  ngOnInit(): void {
 
    this.form = new FormGroup({
      "name": new FormControl(this.contact?.name, [Validators.required, Validators.minLength(2), Validators.maxLength(25),  Validators.pattern("[a-zA-Z]*")]),
      "lastName": new FormControl(this.contact?.lastName,[Validators.required, Validators.minLength(3), Validators.maxLength(40), Validators.pattern("[a-zA-Z]*")]),
      "phoneNumber": new FormControl(this.contact?.phoneNumber,[ Validators.minLength(9), Validators.maxLength(12), Validators.pattern("[0-9]*")]),
      "email": new FormControl(this.contact?.email,[Validators.required, Validators.minLength(5), Validators.maxLength(35), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      "subject": new FormControl(this.contact?.subject,[Validators.required, Validators.minLength(9), Validators.maxLength(15),]),
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