import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {

 private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  // ✅ GET all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // ✅ DELETE user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // ✅ UPDATE user (ADD THIS)
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/update`, user);
  }
}
