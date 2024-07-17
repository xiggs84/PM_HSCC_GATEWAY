import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-huyen.test-samples';

import { DanhMucHuyenFormService } from './danh-muc-huyen-form.service';

describe('DanhMucHuyen Form Service', () => {
  let service: DanhMucHuyenFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucHuyenFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucHuyenFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucHuyenFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maHuyen: expect.any(Object),
            tenHuyen: expect.any(Object),
            trangThai: expect.any(Object),
            maTinh: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucHuyen should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucHuyenFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            maHuyen: expect.any(Object),
            tenHuyen: expect.any(Object),
            trangThai: expect.any(Object),
            maTinh: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucHuyen', () => {
      it('should return NewDanhMucHuyen for default DanhMucHuyen initial value', () => {
        const formGroup = service.createDanhMucHuyenFormGroup(sampleWithNewData);

        const danhMucHuyen = service.getDanhMucHuyen(formGroup) as any;

        expect(danhMucHuyen).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucHuyen for empty DanhMucHuyen initial value', () => {
        const formGroup = service.createDanhMucHuyenFormGroup();

        const danhMucHuyen = service.getDanhMucHuyen(formGroup) as any;

        expect(danhMucHuyen).toMatchObject({});
      });

      it('should return IDanhMucHuyen', () => {
        const formGroup = service.createDanhMucHuyenFormGroup(sampleWithRequiredData);

        const danhMucHuyen = service.getDanhMucHuyen(formGroup) as any;

        expect(danhMucHuyen).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucHuyen should not enable id FormControl', () => {
        const formGroup = service.createDanhMucHuyenFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucHuyen should disable id FormControl', () => {
        const formGroup = service.createDanhMucHuyenFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
