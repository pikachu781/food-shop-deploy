import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../services/cart.service';
import { RouterModule } from '@angular/router';   // ✅ add this
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  foods: any[] = [];

  constructor(
    private http: HttpClient,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadFoods();
  }
   

  // 🔽 Load all foods
  loadFoods(): void {
    this.http.get<any[]>(`${environment.apiUrl}/admin/foods`)
      .subscribe({
        next: (data) => {
          this.foods = data;
        },
        error: (err) => {
          console.error("Error loading foods:", err);
        }
      });
  }

  // 🛒 Add to cart (FIXED)
  addToCart(food: any): void {

    const userId = Number(localStorage.getItem("userId"));

    // ✅ Safety check
    if (!userId) {
      alert("Please login first!");
      return;
    }

    const cartItem = {
      userId: userId,
      quantity: 1,
      price: food.price,
      food: {
        id: food.id
      }
    };

    console.log("Sending:", cartItem);

    this.cartService.addToCart(cartItem).subscribe({
      next: () => {
        alert("✅ Added to cart!");
      },
      error: (err) => {
        console.error("Error adding to cart:", err);
        alert("❌ Failed to add item");
      }
    });
  }
}
