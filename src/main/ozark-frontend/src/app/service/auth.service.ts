import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject} from 'rxjs';
import { User } from '../model/User';
import { catchError, map, tap} from 'rxjs/operators';
import { HttpOptions } from '../model/http-options'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { ServiceResponse } from '../model/service-response';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  endpoint = '/user';
  statusCode: string;
  httpOptions = HttpOptions
  error: HttpErrorResponse;
  serviceResponse: ServiceResponse<HttpErrorResponse>;
  private authToken: any;
  username: string;
  password: string;

  constructor(private http: HttpClient, private router: Router) {

  }
  authenticate(username: string, password: string) :Observable<any> {
    return this.http.get<any>(this.endpoint+'/authenticate/'+username+'/'+password, this.httpOptions)
    .catch((err: HttpErrorResponse) =>{
          this.error = err;
          console.log("an error occured: "+this.error.status+" "+this.error.statusText);
          this.serviceResponse.responseCode = this.error.status;
          return Observable.empty();
    });
  }
  static isLoggedIn(): boolean {
    return localStorage.getItem('authToken') != null;
  }

  static getLoggedInUser() {
    let usersJson = localStorage.getItem('authToken');
    if (usersJson === null) return null;
    let users = JSON.parse(usersJson);
    return users;
  }

  getLoggedInFirstName(): string {
    const firstName = JSON.parse(localStorage.getItem('authToken')).firstName;
    return firstName;
  }

  get isLoggedIn() {
    return this.isLoggedIn.asObservable();
}
  logout() {
    localStorage.removeItem('authToken');
    window.location.reload();
  }

  generateLoginCookie(username: string, password: string, fail){
    return this.http.post<any>('http://localhost:4200/user/login',
      JSON.stringify({userName: username, password: password}),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .toPromise()
      .then((resp) => {
        localStorage.setItem('authToken', JSON.stringify(resp));
        console.log(resp)
        this.router.navigate(["/homepage"])
      },
      (err) => {
        fail(err);
      });
  
  }
}
