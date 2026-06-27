import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {

  const user = {
    email: this.email,
    password: this.password
  };

  this.http.post<any>(`${environment.apiUrl}/login`, user)
  .subscribe({
    next: (res) => {

      if (res && res.token) {

        localStorage.setItem("token", res.token);
        localStorage.setItem("userId", res.id);
        localStorage.setItem("email", res.email);

        alert("Login Successful");
        this.router.navigate(['/home']);

      } else {
        alert("Invalid Credentials");
      }

    },
    error: () => {
      alert("Login Failed");
    }
  });
}
}
