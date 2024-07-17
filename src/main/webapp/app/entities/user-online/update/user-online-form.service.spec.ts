import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../user-online.test-samples';

import { UserOnlineFormService } from './user-online-form.service';

describe('UserOnline Form Service', () => {
  let service: UserOnlineFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserOnlineFormService);
  });

  describe('Service methods', () => {
    describe('createUserOnlineFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createUserOnlineFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sessionId: expect.any(Object),
            time: expect.any(Object),
            browser: expect.any(Object),
          }),
        );
      });

      it('passing IUserOnline should create a new form with FormGroup', () => {
        const formGroup = service.createUserOnlineFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            sessionId: expect.any(Object),
            time: expect.any(Object),
            browser: expect.any(Object),
          }),
        );
      });
    });

    describe('getUserOnline', () => {
      it('should return NewUserOnline for default UserOnline initial value', () => {
        const formGroup = service.createUserOnlineFormGroup(sampleWithNewData);

        const userOnline = service.getUserOnline(formGroup) as any;

        expect(userOnline).toMatchObject(sampleWithNewData);
      });

      it('should return NewUserOnline for empty UserOnline initial value', () => {
        const formGroup = service.createUserOnlineFormGroup();

        const userOnline = service.getUserOnline(formGroup) as any;

        expect(userOnline).toMatchObject({});
      });

      it('should return IUserOnline', () => {
        const formGroup = service.createUserOnlineFormGroup(sampleWithRequiredData);

        const userOnline = service.getUserOnline(formGroup) as any;

        expect(userOnline).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IUserOnline should not enable id FormControl', () => {
        const formGroup = service.createUserOnlineFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewUserOnline should disable id FormControl', () => {
        const formGroup = service.createUserOnlineFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
