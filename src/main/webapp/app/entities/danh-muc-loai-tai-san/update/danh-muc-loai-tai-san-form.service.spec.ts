import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-loai-tai-san.test-samples';

import { DanhMucLoaiTaiSanFormService } from './danh-muc-loai-tai-san-form.service';

describe('DanhMucLoaiTaiSan Form Service', () => {
  let service: DanhMucLoaiTaiSanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiTaiSanFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiTaiSanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiTaiSanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiTs: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
            searchStr: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiTaiSan should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiTaiSanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiTs: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
            searchStr: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiTaiSan', () => {
      it('should return NewDanhMucLoaiTaiSan for default DanhMucLoaiTaiSan initial value', () => {
        const formGroup = service.createDanhMucLoaiTaiSanFormGroup(sampleWithNewData);

        const danhMucLoaiTaiSan = service.getDanhMucLoaiTaiSan(formGroup) as any;

        expect(danhMucLoaiTaiSan).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiTaiSan for empty DanhMucLoaiTaiSan initial value', () => {
        const formGroup = service.createDanhMucLoaiTaiSanFormGroup();

        const danhMucLoaiTaiSan = service.getDanhMucLoaiTaiSan(formGroup) as any;

        expect(danhMucLoaiTaiSan).toMatchObject({});
      });

      it('should return IDanhMucLoaiTaiSan', () => {
        const formGroup = service.createDanhMucLoaiTaiSanFormGroup(sampleWithRequiredData);

        const danhMucLoaiTaiSan = service.getDanhMucLoaiTaiSan(formGroup) as any;

        expect(danhMucLoaiTaiSan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucLoaiTaiSan should not enable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiTaiSanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucLoaiTaiSan should disable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiTaiSanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
