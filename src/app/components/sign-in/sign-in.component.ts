import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AuthResponse } from 'src/app/shared/interfaces/auth-response';
import { ReactiveFormData } from 'src/app/shared/interfaces/reactive-form-data';
import { HttpErrorResponseApi } from 'src/app/models/http-error-response-api';

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
      console.log(data);
      this.form.loading = false;
    }, (error: HttpErrorResponseApi): void => {
      this.form.loading = false;
      this.form.error = error.error;
    });
  }
}
