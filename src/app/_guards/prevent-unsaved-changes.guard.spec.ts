import { TestBed } from '@angular/core/testing';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './prevent-unsaved-changes.guard';
describe('PreventUnsavedChanges', () => {
  let service: PreventUnsavedChanges;
  beforeEach(() => {
    const memberEditComponentStub = { editForm: { dirty: {} } };
    TestBed.configureTestingModule({
      providers: [
        PreventUnsavedChanges,
        { provide: MemberEditComponent, useValue: memberEditComponentStub }
      ]
    });
    service = TestBed.get(PreventUnsavedChanges);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
