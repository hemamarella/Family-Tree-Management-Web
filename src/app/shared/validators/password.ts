// export class Password {
// }
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators {
  static pattern(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const valid = regex.test(control.value);
      return valid ? null : { pattern: true };
    };
  }

  static matchPasswords(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      return control.value === matchingControl.value ? null : { mismatch: true };
    };
  }
}