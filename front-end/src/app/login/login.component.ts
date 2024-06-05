import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DataService } from '../services/data/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;

      this.dataService.postData('auth/signin', formValues).subscribe({
        next: (response) => {
          if (response && response?.data) {
            localStorage.setItem('authToken', response.data.token);
            localStorage.setItem(
              'userData',
              JSON.stringify({
                name: response.data.name,
                email: response.data.email,
                id: response.data.id,
              })
            );
            this.router.navigate(['/chat-page']);
          }
        },
        error: (error) => {
          console.error('Login error!');
          console.error('error =>', error);
        },
      });
    }
  }
}
