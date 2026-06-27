import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  orders: any[] = [];   // ✅ VERY IMPORTANT (Declare this)

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {

  const userId = localStorage.getItem("userId");   // ✅ use userId

  console.log("UserId:", userId);  // debug

  if (userId) {
    this.orderService.getUserOrders(userId).subscribe({
      next: (data: any[]) => {
        console.log("Orders:", data);
        this.orders = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
}
