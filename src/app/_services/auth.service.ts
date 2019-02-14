import { Http, Headers , RequestOptions , Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()
export class AuthService {
    baseUrl = 'https://localhost:5001/api/auth/';
    userToken: any;

// tslint:disable-next-line: deprecation
constructor(private http: Http) { }

login(model: any) {
// tslint:disable-next-line: deprecation
return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
   const user = response.json();
    if (user) {
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
    }
  }).catch(this.handleError);
}

register(model: any) {
 return this.http.post(this.baseUrl + 'register' , model, this.requestOptions()).catch(this.handleError);
}

 loggedIn() {
  return tokenNotExpired('token');
 }

private requestOptions() {
// tslint:disable-next-line: deprecation
  const headers = new Headers({'Content-type': 'application/json'});
// tslint:disable-next-line: deprecation
  return new RequestOptions({headers: headers});
}
  private handleError(error: any) {
    const applicationError = error.headers.get('Application-Error');
if (applicationError) {
   return Observable.throw(applicationError);
   }
const serverError = error.json();
    let modelStateErrors = '';
if (serverError) {
   for (const key in serverError) {
if (serverError[key]) {
   modelStateErrors += serverError[key] + '\n';
  }
   }
   }
return Observable.throw (
  modelStateErrors || 'Server error'
  );
  }
  }
