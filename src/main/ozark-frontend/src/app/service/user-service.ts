
import { HttpClient } from '@angular/common/http';
import {User} from 'src/app/model/User';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class UserService{

    endpoint = '/user';


    constructor(private http: HttpClient) {

    }

getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint+'/findAllUsers');
}
//
ngOnInit(): void {
    
}
}