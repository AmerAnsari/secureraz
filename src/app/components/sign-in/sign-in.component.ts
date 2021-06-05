import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@core/auth/auth.service';
import { HttpErrorResponseApi } from '@models/http-error-response-api';
import { AuthResponse } from '@interfaces/auth-response';
import { ReactiveFormData } from '@interfaces/reactive-form-data';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  form: ReactiveFormData = {
    form: this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    }),
    error: {},
  };

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) {
  }

  signIn(): void {
    this.form.loading = true;
    this.form.error = {};
    this.authService.signIn(this.form.form.value).subscribe((data: AuthResponse): void => {
      this.form.loading = false;
    }, (error: HttpErrorResponseApi): void => {
      this.form.loading = false;
      this.form.error = error.error;
    });
  }
}
