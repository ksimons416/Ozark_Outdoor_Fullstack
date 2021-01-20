import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user-service';
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";
import {RouterEvent, NavigationEnd} from '@angular/router'
import { Observable, BehaviorSubject} from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
 

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
 
  user = AuthService.getLoggedInUser();
  loggedInFirstname: string;
  constructor(private authService: AuthService) { 
    console.log("initializing")
  }

  ngOnInit(): void {
    localStorage.getItem('authToken');
    if(this.user != null){
      this.loggedInFirstname = this.user.firstName
    }
  }
}
