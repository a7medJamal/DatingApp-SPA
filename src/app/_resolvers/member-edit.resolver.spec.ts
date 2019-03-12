import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { MemberEditResolver } from './member-edit.resolver';
describe('MemberEditResolver', () => {
  let service: MemberEditResolver;
  beforeEach(() => {
    const routerStub = { navigate: () => ({}) };
    const activatedRouteSnapshotStub = {};
    const alertifyServiceStub = { error: () => ({}) };
    const userServiceStub = { getUser: () => ({ catch: () => ({}) }) };
    const authServiceStub = { decodedToken: { nameid: {} } };
    TestBed.configureTestingModule({
      providers: [
        MemberEditResolver,
        { provide: Router, useValue: routerStub },
        {
          provide: ActivatedRouteSnapshot,
          useValue: activatedRouteSnapshotStub
        },
        { provide: AlertifyService, useValue: alertifyServiceStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: AuthService, useValue: authServiceStub }
      ]
    });
    service = TestBed.get(MemberEditResolver);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
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
      spyOn(userServiceStub, 'getUser');
      service.resolve(activatedRouteSnapshotStub);
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(alertifyServiceStub.error).toHaveBeenCalled();
      expect(userServiceStub.getUser).toHaveBeenCalled();
    });
  });
});
