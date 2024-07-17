import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-loai-giay-to.test-samples';

import { DanhMucLoaiGiayToFormService } from './danh-muc-loai-giay-to-form.service';

describe('DanhMucLoaiGiayTo Form Service', () => {
  let service: DanhMucLoaiGiayToFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiGiayToFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiGiayToFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiGiayToFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiGiayTo should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiGiayToFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiGiayTo: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiGiayTo', () => {
      it('should return NewDanhMucLoaiGiayTo for default DanhMucLoaiGiayTo initial value', () => {
        const formGroup = service.createDanhMucLoaiGiayToFormGroup(sampleWithNewData);

        const danhMucLoaiGiayTo = service.getDanhMucLoaiGiayTo(formGroup) as any;

        expect(danhMucLoaiGiayTo).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiGiayTo for empty DanhMucLoaiGiayTo initial value', () => {
        const formGroup = service.createDanhMucLoaiGiayToFormGroup();

        const danhMucLoaiGiayTo = service.getDanhMucLoaiGiayTo(formGroup) as any;

        expect(danhMucLoaiGiayTo).toMatchObject({});
      });

      it('should return IDanhMucLoaiGiayTo', () => {
        const formGroup = service.createDanhMucLoaiGiayToFormGroup(sampleWithRequiredData);

        const danhMucLoaiGiayTo = service.getDanhMucLoaiGiayTo(formGroup) as any;

        expect(danhMucLoaiGiayTo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucLoaiGiayTo should not enable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiGiayToFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucLoaiGiayTo should disable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiGiayToFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
