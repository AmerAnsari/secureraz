import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ReactiveFormData } from '@interfaces/reactive-form-data';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})

export class Utils {

  constructor(private domSanitizer: DomSanitizer) {
  }

  /**
   * Update a form value with given data. Supports dict values as well.
   * Used to update form group from a retrieve API call data.
   *
   * @param form Reactive form data object to update.
   * @param data Data to patch to the form (usually comes from API).
   *
   * @version v21.3.3
   */
  static patchForm<T = Record<string, any>>(form: ReactiveFormData, data: T): void {
    for (const key in form.form.controls) {
      /**
       * Check if the key exist in both object, the data
       * value is set and also handle the case where the
       * data value is the number 0 since it is considered
       * "false" for JavaScript.
       */
      if (form.form.controls[key] && (data[key] || data[key] === 0)) {
        const control: AbstractControl = form.form.get(key);
        if (data[key]?.id) {
          control.patchValue(data[key].id);
        } else {
          control.patchValue(data[key]);
        }
      }
    }
  }

  /**
   * Reset the given form.
   *
   * @param form Reactive form data object to reset.
   */
  static ResetForm(form: ReactiveFormData): void {
    delete form.id;
    delete form.data;
    form.form.reset();
    form.error = {};
  }

  /**
   * Bypass security and trust the given value to be safe style value (CSS).
   *
   * @param url Image URL
   * @returns Trusted style URL or nothing of not provided
   */
  sanitizeBackgroundImage(url: string): SafeStyle | null {
    if (url) {
      return this.domSanitizer.bypassSecurityTrustStyle(`url(${url})`);
    }
    return null;
  }
}
