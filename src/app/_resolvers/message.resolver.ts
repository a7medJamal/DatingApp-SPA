import 'rxjs/add/operator/catch';

import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { Message } from './../_models/message';
import { Observable } from 'rxjs/RX';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]> {
  pageSize = 5;
  pageNumber = 1;
  messageContainer = 'Unread';

  constructor(private userService: UserService,
    private router: Router, private authService: AuthService,
    private alertify: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid,
      this.pageNumber, this.pageSize, this.messageContainer).catch(error => {
      this.alertify.error('Problem retrieving data');
      this.router.navigate(['/home']);
      return Observable.of(null);
    });
  }
}
