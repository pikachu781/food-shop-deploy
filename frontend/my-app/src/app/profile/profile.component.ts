import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Component({
selector: 'app-profile',
templateUrl: './profile.component.html',
styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

profile:any={};

constructor(private http:HttpClient,
   private router: Router
){}

ngOnInit(){
this.loadProfile();
}

// ✅ load profile using logged-in userId
loadProfile(){

const userId = localStorage.getItem("userId");

if(userId){
 this.http.get(`${environment.apiUrl}/profile/${userId}`)
  .subscribe((res:any)=>{
    this.profile=res;
  })
}

}
updateProfile(name:string,email:string,phone:string,address:string){

const userId = Number(localStorage.getItem("userId"));

let data:any = {
  id: userId
};

// ✅ only add fields if user typed something
if(name) data.name = name;
if(email) data.email = email;
if(phone) data.phone = phone;
if(address) data.address = address;

console.log("Sending:", data);

this.http.post(`${environment.apiUrl}/profile/update`, data)
.subscribe((res:any)=>{

this.profile = res;

alert("Profile Updated");

})

}
logout() {

  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");

  alert("Logged out successfully");

  this.router.navigate(['/login']);
}
}