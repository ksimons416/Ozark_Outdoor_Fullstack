import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  users: User[];
  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: String;
  user: User;
  serviceResponse: string;
  errorType: string;

  constructor() { }

  ngOnInit(): void {
  }

  signUp(){

  }

  checkPasswordsMatch(){
    if(this.password == this.confirmPassword){
      return true;
    }else{
      return false;
    }
  }

}
