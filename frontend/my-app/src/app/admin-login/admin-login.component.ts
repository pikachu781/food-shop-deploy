import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  email = '';
  password = '';
  message = '';

  constructor(private router: Router) {}

  login() {

    // Temporary admin credentials
    if (
      this.email === 'admin@gmail.com' &&
      this.password === 'admin123'
    ) {
      localStorage.setItem('adminLoggedIn', 'true');
      this.router.navigate(['/admin-dashboard']);
    } else {
      this.message = 'Invalid Email or Password';
    }
  }
}