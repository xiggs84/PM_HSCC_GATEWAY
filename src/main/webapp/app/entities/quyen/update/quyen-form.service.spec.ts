import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quyen.test-samples';

import { QuyenFormService } from './quyen-form.service';

describe('Quyen Form Service', () => {
  let service: QuyenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuyenFormService);
  });

  describe('Service methods', () => {
    describe('createQuyenFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuyenFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuyen: expect.any(Object),
            tenQuyen: expect.any(Object),
          }),
        );
      });

      it('passing IQuyen should create a new form with FormGroup', () => {
        const formGroup = service.createQuyenFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuyen: expect.any(Object),
            tenQuyen: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuyen', () => {
      it('should return NewQuyen for default Quyen initial value', () => {
        const formGroup = service.createQuyenFormGroup(sampleWithNewData);

        const quyen = service.getQuyen(formGroup) as any;

        expect(quyen).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuyen for empty Quyen initial value', () => {
        const formGroup = service.createQuyenFormGroup();

        const quyen = service.getQuyen(formGroup) as any;

        expect(quyen).toMatchObject({});
      });

      it('should return IQuyen', () => {
        const formGroup = service.createQuyenFormGroup(sampleWithRequiredData);

        const quyen = service.getQuyen(formGroup) as any;

        expect(quyen).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuyen should not enable id FormControl', () => {
        const formGroup = service.createQuyenFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuyen should disable id FormControl', () => {
        const formGroup = service.createQuyenFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
