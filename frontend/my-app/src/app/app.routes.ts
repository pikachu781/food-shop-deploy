import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderManagementComponent } from './admin/order-management/order-management.component';
import { UserComponent } from './admin/user/user.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { adminGuard } from './guards/admin.guard';
import { AdminLoginComponent } from './admin-login/admin-login.component';

export const routes: Routes = [

  // Public Pages
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Protected Pages
   
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrderComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'admin/orders', component: OrderManagementComponent, canActivate: [authGuard] },
  { path: 'admin/user', component: UserComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [authGuard] },
   { path: 'admin-login', component: AdminLoginComponent },

  {
    path: 'admin-dashboard',
    component: AdminComponent,
    canActivate: [adminGuard]
  },

  // Invalid URL
  { path: '**', redirectTo: 'home' }
];