import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
 

@Component({
  selector: 'app-admin',
  standalone: true,
    
  imports: [CommonModule, FormsModule, HttpClientModule,RouterModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  foods: any[] = [];

  name: string = '';
  description: string = '';
  price: number = 0;

  selectedFile!: File;

  constructor(private http: HttpClient) {
    this.loadFoods();
  }

  // LOAD ALL FOODS
  loadFoods() {
    this.http.get<any[]>('http://localhost:8080/admin/foods')
      .subscribe(data => {
        this.foods = data;
      });
  }

  // SELECT IMAGE
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // ADD FOOD WITH IMAGE
  addFood() {

    const formData = new FormData();

    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('image', this.selectedFile);

    this.http.post('http://localhost:8080/admin/foods', formData)
      .subscribe(() => {
        this.loadFoods();
        this.name = '';
        this.description = '';
        this.price = 0;
      });
  }

  // DELETE FOOD
  deleteFood(id: number) {
    this.http.delete(`http://localhost:8080/admin/foods/${id}`)
      .subscribe(() => {
        this.loadFoods();
      });
  }

  // UPDATE NAME + DESCRIPTION + PRICE
  updateFood(food: any) {
    this.http.put(`http://localhost:8080/admin/foods/${food.id}`, food)
      .subscribe(() => {
        this.loadFoods();
      });
  }
}
