import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Book Store Application';
  constructor(private router:Router){}
  onLogout()
  {
    localStorage.removeItem("userInfo")
  }
 get isUserLogin()
  {
    const user=localStorage.getItem("userInfo");
    return user && user.length>0;
  }
}
