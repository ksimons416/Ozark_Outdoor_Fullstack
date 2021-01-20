import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user-service';
import {FormsModule } from '@angular/forms'
import { AuthService } from 'src/app/service/auth.service';
import { first } from 'rxjs/operators';
import {ServiceResponse} from "../../model/service-response";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: User[];
  username: string;
  password: string;
  user: User;
  serviceResponse: string;
  errorType: string;


  constructor(private userService: UserService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    
  }
  

  loginSubmit() {
    this.authenticate();
  }

  authenticate() {
    this.authService.authenticate(this.username, this.password).subscribe(
      data => {
        this.serviceResponse = data;
        if(Object.values(this.serviceResponse)[0] == "User is authenticated"){
          this.authService.generateLoginCookie(this.username, this.password,
            (err) => {
              console.log(err);
              console.log('not logged in');
            });

        }
      },
        error => {
          error = this.authService.error
          if(error["status"] == 404){
              this.errorType = "Not Found"
          }else if(error["status"] == 401){
            this.errorType = "Unauthorized"
          }
          console.error("invalid login "+JSON.stringify(error));
        });
      }

}