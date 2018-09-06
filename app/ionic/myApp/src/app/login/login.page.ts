import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage {
  constructor(private router: Router){

  }
  login() {
    // alert(123);
    this.router.navigate(['/main']);
  }
}
