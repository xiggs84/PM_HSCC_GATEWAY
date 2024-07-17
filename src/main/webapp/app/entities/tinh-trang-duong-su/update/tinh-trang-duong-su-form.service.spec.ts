import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tinh-trang-duong-su.test-samples';

import { TinhTrangDuongSuFormService } from './tinh-trang-duong-su-form.service';

describe('TinhTrangDuongSu Form Service', () => {
  let service: TinhTrangDuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinhTrangDuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createTinhTrangDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTinhTrangDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTinhTrang: expect.any(Object),
            dienGiai: expect.any(Object),
            idLoaiDs: expect.any(Object),
          }),
        );
      });

      it('passing ITinhTrangDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createTinhTrangDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTinhTrang: expect.any(Object),
            dienGiai: expect.any(Object),
            idLoaiDs: expect.any(Object),
          }),
        );
      });
    });

    describe('getTinhTrangDuongSu', () => {
      it('should return NewTinhTrangDuongSu for default TinhTrangDuongSu initial value', () => {
        const formGroup = service.createTinhTrangDuongSuFormGroup(sampleWithNewData);

        const tinhTrangDuongSu = service.getTinhTrangDuongSu(formGroup) as any;

        expect(tinhTrangDuongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewTinhTrangDuongSu for empty TinhTrangDuongSu initial value', () => {
        const formGroup = service.createTinhTrangDuongSuFormGroup();

        const tinhTrangDuongSu = service.getTinhTrangDuongSu(formGroup) as any;

        expect(tinhTrangDuongSu).toMatchObject({});
      });

      it('should return ITinhTrangDuongSu', () => {
        const formGroup = service.createTinhTrangDuongSuFormGroup(sampleWithRequiredData);

        const tinhTrangDuongSu = service.getTinhTrangDuongSu(formGroup) as any;

        expect(tinhTrangDuongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITinhTrangDuongSu should not enable id FormControl', () => {
        const formGroup = service.createTinhTrangDuongSuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTinhTrangDuongSu should disable id FormControl', () => {
        const formGroup = service.createTinhTrangDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
