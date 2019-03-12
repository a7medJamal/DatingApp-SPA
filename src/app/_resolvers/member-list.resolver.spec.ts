import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { MemberListResolver } from './member-list.resolver';
describe('MemberListResolver', () => {
  let service: MemberListResolver;
  beforeEach(() => {
    const routerStub = { navigate: () => ({}) };
    const activatedRouteSnapshotStub = {};
    const alertifyServiceStub = { error: () => ({}) };
    const userServiceStub = { getUsers: () => ({ catch: () => ({}) }) };
    TestBed.configureTestingModule({
      providers: [
        MemberListResolver,
        { provide: Router, useValue: routerStub },
        {
          provide: ActivatedRouteSnapshot,
          useValue: activatedRouteSnapshotStub
        },
        { provide: AlertifyService, useValue: alertifyServiceStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    });
    service = TestBed.get(MemberListResolver);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  it('pageSize defaults to: 5', () => {
    expect(service.pageSize).toEqual(5);
  });
  it('pageNumber defaults to: 1', () => {
    expect(service.pageNumber).toEqual(1);
  });
  describe('resolve', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
      const activatedRouteSnapshotStub: ActivatedRouteSnapshot = TestBed.get(
        ActivatedRouteSnapshot
      );
      const alertifyServiceStub: AlertifyService = TestBed.get(AlertifyService);
      const userServiceStub: UserService = TestBed.get(UserService);
      spyOn(routerStub, 'navigate');
      spyOn(alertifyServiceStub, 'error');
      spyOn(userServiceStub, 'getUsers');
      service.resolve(activatedRouteSnapshotStub);
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(alertifyServiceStub.error).toHaveBeenCalled();
      expect(userServiceStub.getUsers).toHaveBeenCalled();
    });
  });
});
