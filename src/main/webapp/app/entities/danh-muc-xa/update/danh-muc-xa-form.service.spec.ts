import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-xa.test-samples';

import { DanhMucXaFormService } from './danh-muc-xa-form.service';

describe('DanhMucXa Form Service', () => {
  let service: DanhMucXaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucXaFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucXaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucXaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maXa: expect.any(Object),
            tenXa: expect.any(Object),
            trangThai: expect.any(Object),
            maHuyen: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucXa should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucXaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maXa: expect.any(Object),
            tenXa: expect.any(Object),
            trangThai: expect.any(Object),
            maHuyen: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucXa', () => {
      it('should return NewDanhMucXa for default DanhMucXa initial value', () => {
        const formGroup = service.createDanhMucXaFormGroup(sampleWithNewData);

        const danhMucXa = service.getDanhMucXa(formGroup) as any;

        expect(danhMucXa).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucXa for empty DanhMucXa initial value', () => {
        const formGroup = service.createDanhMucXaFormGroup();

        const danhMucXa = service.getDanhMucXa(formGroup) as any;

        expect(danhMucXa).toMatchObject({});
      });

      it('should return IDanhMucXa', () => {
        const formGroup = service.createDanhMucXaFormGroup(sampleWithRequiredData);

        const danhMucXa = service.getDanhMucXa(formGroup) as any;

        expect(danhMucXa).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucXa should not enable id FormControl', () => {
        const formGroup = service.createDanhMucXaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucXa should disable id FormControl', () => {
        const formGroup = service.createDanhMucXaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
