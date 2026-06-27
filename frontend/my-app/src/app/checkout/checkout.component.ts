import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
declare var Razorpay: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  totalAmount: number = 0;

  customerName = '';
  phone = '';
  address = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    // Cart data
    this.cartItems = JSON.parse(
      localStorage.getItem('checkoutItems') || '[]'
    );

    this.totalAmount = Number(
      localStorage.getItem('checkoutTotal') || '0'
    );

    // User profile data
    const userId = localStorage.getItem('userId');

    if (userId) {

      this.http.get(
        'http://localhost:8080/profile/' + userId
      ).subscribe((res: any) => {

        this.customerName = res.name || '';
        this.phone = res.phone || '';
        this.address = res.address || '';

      });

    }
  }

  proceedToPayment() {

  const options = {
    key: 'rzp_test_T1bV7ziKtcn8tC',
    amount: this.totalAmount * 100,
    currency: 'INR',
    name: 'Food Delivery',
    description: 'Food Order Payment',

    handler: (response: any) => {

      alert(
        'Payment Successful\nPayment ID: ' +
        response.razorpay_payment_id
      );

    },

    prefill: {
      name: this.customerName,
      contact: this.phone
    },

    theme: {
      color: '#3399cc'
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
}
}