import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signinForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get email() {
    return this.signinForm.get('email');
  }

  get password() {
    return this.signinForm.get('password');
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {}
}
