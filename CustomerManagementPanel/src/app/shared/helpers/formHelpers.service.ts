import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHelpersService {

  public form: FormGroup = null;

constructor() {
 }


  checkIsRequired(propName: string) : boolean {
    return this.checkError(propName, 'required');
  }

  checkIsMinLength(propName: string) : boolean {
    return this.checkError(propName, 'minlength');
  }

  checkIsMaxLength(propName: string) : boolean {
    console.log("jestesmy tu");
    return this.checkError(propName, 'maxlength');
  }

  checkIsPattern(propName: string) : boolean {
    return this.checkError(propName, 'pattern');
  }

  checkError(propName: string, errorType: string): boolean{
    return (
    this.form.get(propName)?.invalid &&
    this.form.get(propName)?.hasError(errorType) && 
    this.form.get(propName).touched &&
    this.form.get(propName).dirty
  );
  }

};