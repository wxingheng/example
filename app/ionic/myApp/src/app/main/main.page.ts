import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "main.page.html",
  styleUrls: ["main.page.scss"]
})
export class MainPage {
  constructor(private router: Router) {}
  login() {
    // alert(123);
    this.router.navigate(["/login"]);
  }

  logout() {
    this.router.navigate(["/login"]);
  }
}
