import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-dich-vu.test-samples';

import { DanhMucDichVuFormService } from './danh-muc-dich-vu-form.service';

describe('DanhMucDichVu Form Service', () => {
  let service: DanhMucDichVuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucDichVuFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucDichVuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucDichVuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dienGiai: expect.any(Object),
            donViTinh: expect.any(Object),
            donGia: expect.any(Object),
            idDichVu: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucDichVu should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucDichVuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            dienGiai: expect.any(Object),
            donViTinh: expect.any(Object),
            donGia: expect.any(Object),
            idDichVu: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucDichVu', () => {
      it('should return NewDanhMucDichVu for default DanhMucDichVu initial value', () => {
        const formGroup = service.createDanhMucDichVuFormGroup(sampleWithNewData);

        const danhMucDichVu = service.getDanhMucDichVu(formGroup) as any;

        expect(danhMucDichVu).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucDichVu for empty DanhMucDichVu initial value', () => {
        const formGroup = service.createDanhMucDichVuFormGroup();

        const danhMucDichVu = service.getDanhMucDichVu(formGroup) as any;

        expect(danhMucDichVu).toMatchObject({});
      });

      it('should return IDanhMucDichVu', () => {
        const formGroup = service.createDanhMucDichVuFormGroup(sampleWithRequiredData);

        const danhMucDichVu = service.getDanhMucDichVu(formGroup) as any;

        expect(danhMucDichVu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucDichVu should not enable id FormControl', () => {
        const formGroup = service.createDanhMucDichVuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucDichVu should disable id FormControl', () => {
        const formGroup = service.createDanhMucDichVuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
