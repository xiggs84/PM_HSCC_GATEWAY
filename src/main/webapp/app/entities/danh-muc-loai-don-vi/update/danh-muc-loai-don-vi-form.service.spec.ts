import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-loai-don-vi.test-samples';

import { DanhMucLoaiDonViFormService } from './danh-muc-loai-don-vi-form.service';

describe('DanhMucLoaiDonVi Form Service', () => {
  let service: DanhMucLoaiDonViFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiDonViFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiDonViFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiDonViFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiDv: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiDonVi should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiDonViFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiDv: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiDonVi', () => {
      it('should return NewDanhMucLoaiDonVi for default DanhMucLoaiDonVi initial value', () => {
        const formGroup = service.createDanhMucLoaiDonViFormGroup(sampleWithNewData);

        const danhMucLoaiDonVi = service.getDanhMucLoaiDonVi(formGroup) as any;

        expect(danhMucLoaiDonVi).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiDonVi for empty DanhMucLoaiDonVi initial value', () => {
        const formGroup = service.createDanhMucLoaiDonViFormGroup();

        const danhMucLoaiDonVi = service.getDanhMucLoaiDonVi(formGroup) as any;

        expect(danhMucLoaiDonVi).toMatchObject({});
      });

      it('should return IDanhMucLoaiDonVi', () => {
        const formGroup = service.createDanhMucLoaiDonViFormGroup(sampleWithRequiredData);

        const danhMucLoaiDonVi = service.getDanhMucLoaiDonVi(formGroup) as any;

        expect(danhMucLoaiDonVi).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucLoaiDonVi should not enable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiDonViFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucLoaiDonVi should disable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiDonViFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
