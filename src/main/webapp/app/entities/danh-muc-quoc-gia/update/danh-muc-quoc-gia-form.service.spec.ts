import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-quoc-gia.test-samples';

import { DanhMucQuocGiaFormService } from './danh-muc-quoc-gia-form.service';

describe('DanhMucQuocGia Form Service', () => {
  let service: DanhMucQuocGiaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucQuocGiaFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucQuocGiaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucQuocGiaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuocGia: expect.any(Object),
            tenQuocGia: expect.any(Object),
            tenTiengAnh: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucQuocGia should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucQuocGiaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuocGia: expect.any(Object),
            tenQuocGia: expect.any(Object),
            tenTiengAnh: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucQuocGia', () => {
      it('should return NewDanhMucQuocGia for default DanhMucQuocGia initial value', () => {
        const formGroup = service.createDanhMucQuocGiaFormGroup(sampleWithNewData);

        const danhMucQuocGia = service.getDanhMucQuocGia(formGroup) as any;

        expect(danhMucQuocGia).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucQuocGia for empty DanhMucQuocGia initial value', () => {
        const formGroup = service.createDanhMucQuocGiaFormGroup();

        const danhMucQuocGia = service.getDanhMucQuocGia(formGroup) as any;

        expect(danhMucQuocGia).toMatchObject({});
      });

      it('should return IDanhMucQuocGia', () => {
        const formGroup = service.createDanhMucQuocGiaFormGroup(sampleWithRequiredData);

        const danhMucQuocGia = service.getDanhMucQuocGia(formGroup) as any;

        expect(danhMucQuocGia).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucQuocGia should not enable id FormControl', () => {
        const formGroup = service.createDanhMucQuocGiaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucQuocGia should disable id FormControl', () => {
        const formGroup = service.createDanhMucQuocGiaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
