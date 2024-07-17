import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-tu-viet-tat.test-samples';

import { DanhMucTuVietTatFormService } from './danh-muc-tu-viet-tat-form.service';

describe('DanhMucTuVietTat Form Service', () => {
  let service: DanhMucTuVietTatFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucTuVietTatFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucTuVietTatFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucTuVietTatFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idVietTat: expect.any(Object),
            tuVietTat: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucTuVietTat should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucTuVietTatFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idVietTat: expect.any(Object),
            tuVietTat: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucTuVietTat', () => {
      it('should return NewDanhMucTuVietTat for default DanhMucTuVietTat initial value', () => {
        const formGroup = service.createDanhMucTuVietTatFormGroup(sampleWithNewData);

        const danhMucTuVietTat = service.getDanhMucTuVietTat(formGroup) as any;

        expect(danhMucTuVietTat).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucTuVietTat for empty DanhMucTuVietTat initial value', () => {
        const formGroup = service.createDanhMucTuVietTatFormGroup();

        const danhMucTuVietTat = service.getDanhMucTuVietTat(formGroup) as any;

        expect(danhMucTuVietTat).toMatchObject({});
      });

      it('should return IDanhMucTuVietTat', () => {
        const formGroup = service.createDanhMucTuVietTatFormGroup(sampleWithRequiredData);

        const danhMucTuVietTat = service.getDanhMucTuVietTat(formGroup) as any;

        expect(danhMucTuVietTat).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucTuVietTat should not enable id FormControl', () => {
        const formGroup = service.createDanhMucTuVietTatFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucTuVietTat should disable id FormControl', () => {
        const formGroup = service.createDanhMucTuVietTatFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
