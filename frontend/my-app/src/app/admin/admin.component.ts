import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  foods: any[] = [];

  name = '';
  description = '';
  price = 0;

  selectedFile!: File;

  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {
    this.loadFoods();
  }

  // Load all foods
  loadFoods() {
    this.http.get<any[]>(`${this.apiUrl}/foods`)
      .subscribe(data => {
        this.foods = data;
      });
  }

  // Select image
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Add food
  addFood() {

    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.selectedFile);

    this.http.post(`${this.apiUrl}/foods`, formData)
      .subscribe({
        next: () => {

          this.loadFoods();

          this.name = '';
          this.description = '';
          this.price = 0;

          alert('Food added successfully');
        },
        error: (err) => {
          console.error(err);
          alert('Failed to upload food');
        }
      });

  }

  // Delete food
  deleteFood(id: number) {
    this.http.delete(`${this.apiUrl}/foods/${id}`)
      .subscribe(() => {
        this.loadFoods();
      });
  }

  // Update food
  updateFood(food: any) {
    this.http.put(`${this.apiUrl}/foods/${food.id}`, food)
      .subscribe(() => {
        this.loadFoods();
      });
  }
}
