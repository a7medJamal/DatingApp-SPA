import { NgModule } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

// tslint:disable-next-line: deprecation
export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig ({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'contect-Type' : 'application/json'}],
  }), http , options);
}

@NgModule({
  providers: [
  {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
// tslint:disable-next-line: deprecation
    deps: [Http, RequestOptions]
  }
 ]
 })
export class AuthModule { }
