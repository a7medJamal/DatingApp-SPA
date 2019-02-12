import { Http, Headers , RequestOptions , Response } from '@angular/http';
import { Injectable } from '@angular/core';
 import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    baseUrl = 'https://localhost:5001/api/auth/';
    userToken: any;

// tslint:disable-next-line: deprecation
constructor(private http: Http) { }

login(model: any) {
// tslint:disable-next-line: deprecation
return this.http.post(this.baseUrl + 'login' , model, this.requestOptions()).map((response: Response) => {
   const user = response.json();
    if (user) {
        localStorage.setItem('token', user.tokenString);
        this.userToken = user.tokenString;
    }
});
}
register(model: any) {
return this.http.post(this.baseUrl + 'register' , model, this.requestOptions());
}

private requestOptions() {
// tslint:disable-next-line: deprecation
  const headers = new Headers({'Content-type': 'application/json'});
// tslint:disable-next-line: deprecation
  return new RequestOptions({headers: headers});
}
}
