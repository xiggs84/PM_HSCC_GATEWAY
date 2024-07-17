import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-dau-so-cmnd.test-samples';

import { DanhMucDauSoCmndFormService } from './danh-muc-dau-so-cmnd-form.service';

describe('DanhMucDauSoCmnd Form Service', () => {
  let service: DanhMucDauSoCmndFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucDauSoCmndFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucDauSoCmndFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucDauSoCmndFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDauSo: expect.any(Object),
            dauSo: expect.any(Object),
            tinhThanh: expect.any(Object),
            idLoai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucDauSoCmnd should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucDauSoCmndFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDauSo: expect.any(Object),
            dauSo: expect.any(Object),
            tinhThanh: expect.any(Object),
            idLoai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucDauSoCmnd', () => {
      it('should return NewDanhMucDauSoCmnd for default DanhMucDauSoCmnd initial value', () => {
        const formGroup = service.createDanhMucDauSoCmndFormGroup(sampleWithNewData);

        const danhMucDauSoCmnd = service.getDanhMucDauSoCmnd(formGroup) as any;

        expect(danhMucDauSoCmnd).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucDauSoCmnd for empty DanhMucDauSoCmnd initial value', () => {
        const formGroup = service.createDanhMucDauSoCmndFormGroup();

        const danhMucDauSoCmnd = service.getDanhMucDauSoCmnd(formGroup) as any;

        expect(danhMucDauSoCmnd).toMatchObject({});
      });

      it('should return IDanhMucDauSoCmnd', () => {
        const formGroup = service.createDanhMucDauSoCmndFormGroup(sampleWithRequiredData);

        const danhMucDauSoCmnd = service.getDanhMucDauSoCmnd(formGroup) as any;

        expect(danhMucDauSoCmnd).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucDauSoCmnd should not enable id FormControl', () => {
        const formGroup = service.createDanhMucDauSoCmndFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucDauSoCmnd should disable id FormControl', () => {
        const formGroup = service.createDanhMucDauSoCmndFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
