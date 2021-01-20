import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  user: any
  returnUrl: string;
  userNavs: Array<{title: string}>;
  isLoggedIn: boolean;
  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.isLoggedIn = AuthService.isLoggedIn();
    this.user = AuthService.getLoggedInUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/homepage"]);
  }

}
