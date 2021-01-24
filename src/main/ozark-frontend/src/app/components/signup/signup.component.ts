import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { SimpleOuterSubscriber } from 'rxjs/internal/innerSubscribe';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  serviceResponse: string;
  errorType: string;
  submitted = false;
  resp: any;
  userExists:boolean = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }

  checkIfUserExists(usernme: string){
    //returns true if user exists false if not
    this.userService.getUserByUserName(usernme).subscribe(
      data => {
        console.log(data);
        this.resp = data
        if(data != null){
          this.userExists = true;
        }else{
          this.userExists = false;
        }
      },
    error => console.log(error));
    // if(this.resp != null){
    //     console.log(this.resp);
    //     this.userExists = true;
    //     console.log("UserExists?: "+this.userExists);
    // }else{
    //   this.userExists = false;
    //   console.log("UserExists?: "+this.userExists);
    // }
  }

  signUp(form: NgForm){
    const user = new User;
    user.firstName = this.firstName;
    user.lastName = this.lastName
    user.userName = this.username;
    user.password = this.password;
    console.log(this.userService.getUserByUserName(this.username))
    this.checkIfUserExists(this.username)
    if(!this.userExists){
      this.userService.signUp(user)
      .subscribe(() => 
      console.log('success'),
      () => 
      console.log('failure'));
      this.submitted = true;
    }else{
      console.error("username already exists")
      form.resetForm();
    }
  }

  checkPasswordsMatch(){
    if(this.password == this.confirmPassword){
      return true;
    }else{
      return false;
    }
  }

}
