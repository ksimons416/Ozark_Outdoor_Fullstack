import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../model/User';
import { catchError, map, tap} from 'rxjs/operators';
import { HttpOptions } from '../model/http-options'; 
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';
import { ServiceResponse } from '../model/service-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  endpoint = '/user';
  user: User;
  statusCode: string;
  httpOptions = HttpOptions
  error: HttpErrorResponse;
  serviceResponse: ServiceResponse<HttpErrorResponse>;


  constructor(private http: HttpClient) {

  }
  authenticate(username: string, password: string) :Observable<any> {
    return this.http.get<any>(this.endpoint+'/authenticate/'+username+'/'+password, this.httpOptions).catch((err: HttpErrorResponse) =>{
          this.error = err;
          console.log("an error occured: "+this.error.status+" "+this.error.statusText);
          this.serviceResponse.responseCode = this.error.status;
          return Observable.empty();
    });
  }
}
