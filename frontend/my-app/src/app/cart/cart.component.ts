import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';

import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgIf, NgForOf],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  imageBaseUrl = environment.apiUrl + '/uploads/';

  cartItems: any[] = [];
  totalAmount: number = 0;
  userId!: number;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {

    const uid = localStorage.getItem('userId');

    if (!uid) {
      alert('Please login first!');
      return;
    }

    this.userId = Number(uid);
    this.loadCart();
  }

  // Load cart items
  loadCart(): void {

    this.cartService.getCartItems(this.userId).subscribe({
      next: (items: any[]) => {
        console.log('API Response:', items);
        this.cartItems = items;
        this.calculateTotal();
      },
      error: (err) => console.error(err)
    });

  }

  // Calculate total amount
  calculateTotal(): void {

  console.log('Cart Items:', this.cartItems);

  this.totalAmount = this.cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log('Total Amount:', this.totalAmount);
}

  // Remove item from cart
  removeItem(id: number): void {

    this.cartService.removeFromCart(id).subscribe({
      next: () => this.loadCart(),
      error: (err) => console.error(err)
    });

  }

  // Redirect to checkout page
  checkout(): void {

  console.log(
    'Saving Total:',
    this.totalAmount
  );

  localStorage.setItem(
    'checkoutTotal',
    this.totalAmount.toString()
  );

  this.router.navigate(['/checkout']);
}

}