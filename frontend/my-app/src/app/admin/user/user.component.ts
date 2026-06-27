import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {

  users: any[] = [];

  @ViewChild('tableBody') tableBody!: ElementRef;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  // Fetch all users
  getUsers() {
    this.userService.getAllUsers().subscribe((data: any[]) => {
      this.users = data;
    });
  }

  // Delete a user
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      alert('User deleted!');
      this.getUsers();
    });
  }

  // Show inline edit inputs
  editRow(rowIndex: number) {
    const row = this.tableBody.nativeElement.rows[rowIndex];
    for (let i = 1; i <= 4; i++) {
      row.cells[i].querySelector('span').style.display = 'none';
      row.cells[i].querySelector('input').style.display = 'inline-block';
    }
    row.querySelector('.edit-btn').style.display = 'none';
    row.querySelector('.save-btn').style.display = 'inline-block';
    row.querySelector('.cancel-btn').style.display = 'inline-block';
  }

  // Save updated user
  saveRow(rowIndex: number) {
    const row = this.tableBody.nativeElement.rows[rowIndex];
    const updatedUser = {
      ...this.users[rowIndex],
      name: row.cells[1].querySelector('input').value,
      email: row.cells[2].querySelector('input').value,
      phone: row.cells[3].querySelector('input').value,
      role: row.cells[4].querySelector('input').value,
    };

    this.userService.updateUser(updatedUser).subscribe(() => {
      alert('User updated!');
      this.getUsers(); // refresh table
    });
  }

  // Cancel editing
  cancelEdit(rowIndex: number) {
  const row = this.tableBody.nativeElement.rows[rowIndex];
  for (let i = 1; i <= 4; i++) {
    row.cells[i].querySelector('span').style.display = 'inline-block';
    row.cells[i].querySelector('input').style.display = 'none';
  }
  row.querySelector('.edit-btn').style.display = 'inline-block';
  row.querySelector('.save-btn').style.display = 'none';
  row.querySelector('.cancel-btn').style.display = 'none';
}
}