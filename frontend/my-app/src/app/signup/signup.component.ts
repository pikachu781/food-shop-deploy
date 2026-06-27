import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule,RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  email: string = '';
  password: string = '';

  constructor(private http: HttpClient) {}

 signup() {

  const user = {
    email: this.email,
    password: this.password
  };

  this.http.post(
    `${environment.apiUrl}/signup`,
    user,
    { responseType: 'text' }
  ).subscribe({
    next: (res) => {
      alert(res); // Registration Successful
    },
    error: (err) => {
      alert(err.error); // User Already Exists
    }
  });
}}