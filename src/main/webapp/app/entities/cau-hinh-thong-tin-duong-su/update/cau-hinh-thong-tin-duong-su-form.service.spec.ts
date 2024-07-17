import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cau-hinh-thong-tin-duong-su.test-samples';

import { CauHinhThongTinDuongSuFormService } from './cau-hinh-thong-tin-duong-su-form.service';

describe('CauHinhThongTinDuongSu Form Service', () => {
  let service: CauHinhThongTinDuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauHinhThongTinDuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createCauHinhThongTinDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCauHinhThongTinDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHinh: expect.any(Object),
            noiDung: expect.any(Object),
            javascript: expect.any(Object),
            css: expect.any(Object),
            idLoaiDs: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing ICauHinhThongTinDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createCauHinhThongTinDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHinh: expect.any(Object),
            noiDung: expect.any(Object),
            javascript: expect.any(Object),
            css: expect.any(Object),
            idLoaiDs: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getCauHinhThongTinDuongSu', () => {
      it('should return NewCauHinhThongTinDuongSu for default CauHinhThongTinDuongSu initial value', () => {
        const formGroup = service.createCauHinhThongTinDuongSuFormGroup(sampleWithNewData);

        const cauHinhThongTinDuongSu = service.getCauHinhThongTinDuongSu(formGroup) as any;

        expect(cauHinhThongTinDuongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewCauHinhThongTinDuongSu for empty CauHinhThongTinDuongSu initial value', () => {
        const formGroup = service.createCauHinhThongTinDuongSuFormGroup();

        const cauHinhThongTinDuongSu = service.getCauHinhThongTinDuongSu(formGroup) as any;

        expect(cauHinhThongTinDuongSu).toMatchObject({});
      });

      it('should return ICauHinhThongTinDuongSu', () => {
        const formGroup = service.createCauHinhThongTinDuongSuFormGroup(sampleWithRequiredData);

        const cauHinhThongTinDuongSu = service.getCauHinhThongTinDuongSu(formGroup) as any;

        expect(cauHinhThongTinDuongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICauHinhThongTinDuongSu should not enable id FormControl', () => {
        const formGroup = service.createCauHinhThongTinDuongSuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCauHinhThongTinDuongSu should disable id FormControl', () => {
        const formGroup = service.createCauHinhThongTinDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
