import { FormGroup } from '@angular/forms';

export class MyFormGroup extends FormGroup{

    checkError(propName: string, errorType: string) : boolean {
        return( 
        this.get(propName)?.invalid && 
        this.get(propName)?.hasError(errorType) &&
        this.get(propName)?.touched &&
        this.get(propName)?.dirty 
        );
    }

checkIsRequired(propName: string) : boolean {
    return this.checkError(propName, 'required');
  }

checkIsMinLength(propName: string) : boolean {
    return this.checkError(propName, 'minlength');
  }

checkIsMaxLength(propName: string) : boolean {
    return this.checkError(propName, 'maxlength');
  }

checkIsPattern(propName: string) : boolean {
    return this.checkError(propName, 'pattern');
  }
}