import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
  static checkSpaceInInput(control: AbstractControl): ValidationErrors | null {
    if (control.value?.trim() === "") {
      return { inputIsSpace: true };
    }
    return null;
  }
}
