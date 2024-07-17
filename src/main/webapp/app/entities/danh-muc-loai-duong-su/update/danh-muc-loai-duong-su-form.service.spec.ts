import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-loai-duong-su.test-samples';

import { DanhMucLoaiDuongSuFormService } from './danh-muc-loai-duong-su-form.service';

describe('DanhMucLoaiDuongSu Form Service', () => {
  let service: DanhMucLoaiDuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiDuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiDs: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
            strSearch: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiDs: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
            strSearch: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiDuongSu', () => {
      it('should return NewDanhMucLoaiDuongSu for default DanhMucLoaiDuongSu initial value', () => {
        const formGroup = service.createDanhMucLoaiDuongSuFormGroup(sampleWithNewData);

        const danhMucLoaiDuongSu = service.getDanhMucLoaiDuongSu(formGroup) as any;

        expect(danhMucLoaiDuongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiDuongSu for empty DanhMucLoaiDuongSu initial value', () => {
        const formGroup = service.createDanhMucLoaiDuongSuFormGroup();

        const danhMucLoaiDuongSu = service.getDanhMucLoaiDuongSu(formGroup) as any;

        expect(danhMucLoaiDuongSu).toMatchObject({});
      });

      it('should return IDanhMucLoaiDuongSu', () => {
        const formGroup = service.createDanhMucLoaiDuongSuFormGroup(sampleWithRequiredData);

        const danhMucLoaiDuongSu = service.getDanhMucLoaiDuongSu(formGroup) as any;

        expect(danhMucLoaiDuongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucLoaiDuongSu should not enable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiDuongSuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucLoaiDuongSu should disable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
