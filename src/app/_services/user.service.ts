import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
    baseUrl = environment.apiUrl;

// tslint:disable-next-line: deprecation
constructor(private http: Http) { }

 getUser(): Observable<User[]> {
     return this.http.get(this.baseUrl + 'users', this.jwt())
        .map(Response => <User[]> Response.json())
        .catch(this.handleError);
 }
   private jwt() {
       const token = localStorage.getItem('token');
       if (token) {
// tslint:disable-next-line: deprecation
           const headers = new Headers({'Authorization' : 'Bearer' + token});
           headers.append('Content-type', 'application/json');
// tslint:disable-next-line: deprecation
           return new RequestOptions({headers: headers});
       }
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
    modelStateErrors || 'Server error');
    }
}
