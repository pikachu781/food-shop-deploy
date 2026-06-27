import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
 
@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.getOrders();
  }

  // ✅ Fetch all orders
  getOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data: any[]) => {
        this.orders = data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      }
    });
  }

  // ✅ Update order status
  updateStatus(order: any): void {
    if (!order.id) {
      console.error('Order ID missing!');
      return;
    }

    this.orderService.updateOrderStatus(order.id, order.status)
      .subscribe({
        next: () => {
          alert('Order updated successfully');
        },
        error: (err:any) => {
          console.error('Error updating order:', err);
        }
      });
  }
}