import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { User } from '../_models/User';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';
import { PaginatedResult } from '../_models/Pagination';
import { Http, RequestOptions, Response } from '@angular/http';
@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;

  // tslint:disable-next-line: deprecation
  constructor(private authHttp: AuthHttp) { }

  getUsers(page?: number, itemsPerPage?: number, userParams?: any, likesParam?: string) {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let queryString = '?';

    if (page != null && itemsPerPage != null) {
      queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
    }

    if (likesParam === 'Likers') {
      queryString += 'Likers=true&';
    }

    if (likesParam === 'Likees') {
      queryString += 'Likees=true&';
    }

    if (userParams != null) {
      queryString +=
      'minAge=' + userParams.minAge +
      '&maxAge=' + userParams.maxAge +
      '&gender=' + userParams.gender +
      '&orderBy=' + userParams.orderBy;
    }
    return this.authHttp
      .get(this.baseUrl + 'users' + queryString)
      // tslint:disable-next-line: deprecation
      .map((response: Response) => {
        paginatedResult.result = response.json();
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
      .catch(this.handleError);
  }

  getUser(id): Observable<User> {
    return this.authHttp
      .get(this.baseUrl + 'users/' + id)
      .map(response => <User>response.json())
      .catch(this.handleError);
  }

  updateUser(id: number, user: User) {
    return this.authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
  }

  setMainPhoto(userId: number, id: number) {
    return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {}).catch(this.handleError);
  }
  deletePhoto(userId: number, id: number) {
    return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + id).catch(this.handleError);
  }
  sendLike(id: number, recipientedId: number) {
   return this.authHttp.post(this.baseUrl + 'users/' + id + '/like/' + recipientedId , {}).catch(this.handleError);
  }

  private handleError(error: any) {
    if (error.status === 400) {
      return Observable.throw(error._body);
    }
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
    return Observable.throw(
      modelStateErrors || 'Server error');
  }
}
