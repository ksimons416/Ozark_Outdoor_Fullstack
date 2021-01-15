import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user-service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  user = AuthService.getLoggedInUser();
  loggedInFirstname: string;
  constructor(private userService: UserService,  private router: Router, private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInFirstname = this.user.firstName
  
    }

}
