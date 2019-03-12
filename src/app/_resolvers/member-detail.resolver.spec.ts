import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { UserService } from '../_services/user.service';
import { MemberDetailResolver } from './member-detail.resolver';
describe('MemberDetailResolver', () => {
  let service: MemberDetailResolver;
  beforeEach(() => {
    const routerStub = { navigate: () => ({}) };
    const activatedRouteSnapshotStub = { params: {} };
    const alertifyServiceStub = { error: () => ({}) };
    const userServiceStub = { getUser: () => ({ catch: () => ({}) }) };
    TestBed.configureTestingModule({
      providers: [
        MemberDetailResolver,
        { provide: Router, useValue: routerStub },
        {
          provide: ActivatedRouteSnapshot,
          useValue: activatedRouteSnapshotStub
        },
        { provide: AlertifyService, useValue: alertifyServiceStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    });
    service = TestBed.get(MemberDetailResolver);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  describe('resolve', () => {
    it('makes expected calls', () => {
      const routerStub: Router = TestBed.get(Router);
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
