
import { HttpClient } from '@angular/common/http';
import {User} from 'src/app/model/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UserService{

    endpoint = '/user';
    username: string;


    constructor(private http: HttpClient) {

    }

getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint+'/findAllUsers');
}
signUp(user: User): Observable<Object> {
  return this.http.post<User[]>(this.endpoint+'/signup', user);
    // JSON.stringify({userName: username, firstName: firstName, lastName: lastName, password: password}),
  // {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
}
getUserByUserName(username: string): Observable<User> {
  return this.http.get<User>(this.endpoint+'/findUserByUsername/'+username);
}
  
//
ngOnInit(): void {
    
}
}