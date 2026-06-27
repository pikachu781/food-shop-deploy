import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

 private apiUrl = `${environment.apiUrl}/orders`;
  constructor(private http: HttpClient) {}

  createOrder(amount: number) {
    return this.http.post(
      `${this.apiUrl}/create-order?amount=${amount}`,
      {}
    );
  }
}