import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    console.log('user');
    console.log(this.user.user_type);
  }
  getAcl() {
    // let aclList = {
    //   'ADMIN' : ['dashboard', 'sale', 'purchase', 'user', 'inventory', 'report']
    // };
    return false;
  }
  logout() {
    localStorage.removeItem("currentUser");
    sessionStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }
}
