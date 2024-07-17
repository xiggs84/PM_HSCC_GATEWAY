import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-tinh-trang-hon-nhan.test-samples';

import { DanhMucTinhTrangHonNhanFormService } from './danh-muc-tinh-trang-hon-nhan-form.service';

describe('DanhMucTinhTrangHonNhan Form Service', () => {
  let service: DanhMucTinhTrangHonNhanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucTinhTrangHonNhanFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucTinhTrangHonNhanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucTinhTrangHonNhanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTinhTrang: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucTinhTrangHonNhan should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucTinhTrangHonNhanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTinhTrang: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucTinhTrangHonNhan', () => {
      it('should return NewDanhMucTinhTrangHonNhan for default DanhMucTinhTrangHonNhan initial value', () => {
        const formGroup = service.createDanhMucTinhTrangHonNhanFormGroup(sampleWithNewData);

        const danhMucTinhTrangHonNhan = service.getDanhMucTinhTrangHonNhan(formGroup) as any;

        expect(danhMucTinhTrangHonNhan).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucTinhTrangHonNhan for empty DanhMucTinhTrangHonNhan initial value', () => {
        const formGroup = service.createDanhMucTinhTrangHonNhanFormGroup();

        const danhMucTinhTrangHonNhan = service.getDanhMucTinhTrangHonNhan(formGroup) as any;

        expect(danhMucTinhTrangHonNhan).toMatchObject({});
      });

      it('should return IDanhMucTinhTrangHonNhan', () => {
        const formGroup = service.createDanhMucTinhTrangHonNhanFormGroup(sampleWithRequiredData);

        const danhMucTinhTrangHonNhan = service.getDanhMucTinhTrangHonNhan(formGroup) as any;

        expect(danhMucTinhTrangHonNhan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucTinhTrangHonNhan should not enable id FormControl', () => {
        const formGroup = service.createDanhMucTinhTrangHonNhanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucTinhTrangHonNhan should disable id FormControl', () => {
        const formGroup = service.createDanhMucTinhTrangHonNhanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
