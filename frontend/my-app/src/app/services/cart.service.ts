import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

 private apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  addToCart(item: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, item);
  }

  getCartItems(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }

  removeFromCart(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
clearCart(userId: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/clear/${userId}`, { responseType: 'text' });

}
}