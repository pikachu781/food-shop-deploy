import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}/orders`;
  constructor(private http: HttpClient) {}

  // ✅ Checkout API
  checkout(orderData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, orderData);
  }

  // ✅ Get orders by username
  getUserOrders(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${username}`);
  }
  // ✅ Get ALL orders (Admin)
getAllOrders(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl);
}

// ✅ Update order status (Admin)
updateOrderStatus(id: number, status: string): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, { status });
}
}