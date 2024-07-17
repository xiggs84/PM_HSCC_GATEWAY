import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../can-bo-quyen.test-samples';

import { CanBoQuyenFormService } from './can-bo-quyen-form.service';

describe('CanBoQuyen Form Service', () => {
  let service: CanBoQuyenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanBoQuyenFormService);
  });

  describe('Service methods', () => {
    describe('createCanBoQuyenFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCanBoQuyenFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuyen: expect.any(Object),
            idDonVi: expect.any(Object),
          }),
        );
      });

      it('passing ICanBoQuyen should create a new form with FormGroup', () => {
        const formGroup = service.createCanBoQuyenFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuyen: expect.any(Object),
            idDonVi: expect.any(Object),
          }),
        );
      });
    });

    describe('getCanBoQuyen', () => {
      it('should return NewCanBoQuyen for default CanBoQuyen initial value', () => {
        const formGroup = service.createCanBoQuyenFormGroup(sampleWithNewData);

        const canBoQuyen = service.getCanBoQuyen(formGroup) as any;

        expect(canBoQuyen).toMatchObject(sampleWithNewData);
      });

      it('should return NewCanBoQuyen for empty CanBoQuyen initial value', () => {
        const formGroup = service.createCanBoQuyenFormGroup();

        const canBoQuyen = service.getCanBoQuyen(formGroup) as any;

        expect(canBoQuyen).toMatchObject({});
      });

      it('should return ICanBoQuyen', () => {
        const formGroup = service.createCanBoQuyenFormGroup(sampleWithRequiredData);

        const canBoQuyen = service.getCanBoQuyen(formGroup) as any;

        expect(canBoQuyen).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICanBoQuyen should not enable id FormControl', () => {
        const formGroup = service.createCanBoQuyenFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCanBoQuyen should disable id FormControl', () => {
        const formGroup = service.createCanBoQuyenFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
