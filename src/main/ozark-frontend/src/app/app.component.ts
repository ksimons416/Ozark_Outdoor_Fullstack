import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ozark-frontend';
  refresh(): void{
    window.location.href = 'http://localhost:8080/';
    this.getUser();
  }
  getUser(): void{
    JSON.parse(localStorage.getItem("authToken"));
  }
}
