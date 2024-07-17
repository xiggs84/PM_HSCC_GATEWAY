import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cau-hinh-hoa-don-dien-tu.test-samples';

import { CauHinhHoaDonDienTuFormService } from './cau-hinh-hoa-don-dien-tu-form.service';

describe('CauHinhHoaDonDienTu Form Service', () => {
  let service: CauHinhHoaDonDienTuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauHinhHoaDonDienTuFormService);
  });

  describe('Service methods', () => {
    describe('createCauHinhHoaDonDienTuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCauHinhHoaDonDienTuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDonVi: expect.any(Object),
            apiUrl: expect.any(Object),
            account: expect.any(Object),
            accPass: expect.any(Object),
            username: expect.any(Object),
            password: expect.any(Object),
            mauSo: expect.any(Object),
            kyHieu: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });

      it('passing ICauHinhHoaDonDienTu should create a new form with FormGroup', () => {
        const formGroup = service.createCauHinhHoaDonDienTuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDonVi: expect.any(Object),
            apiUrl: expect.any(Object),
            account: expect.any(Object),
            accPass: expect.any(Object),
            username: expect.any(Object),
            password: expect.any(Object),
            mauSo: expect.any(Object),
            kyHieu: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });
    });

    describe('getCauHinhHoaDonDienTu', () => {
      it('should return NewCauHinhHoaDonDienTu for default CauHinhHoaDonDienTu initial value', () => {
        const formGroup = service.createCauHinhHoaDonDienTuFormGroup(sampleWithNewData);

        const cauHinhHoaDonDienTu = service.getCauHinhHoaDonDienTu(formGroup) as any;

        expect(cauHinhHoaDonDienTu).toMatchObject(sampleWithNewData);
      });

      it('should return NewCauHinhHoaDonDienTu for empty CauHinhHoaDonDienTu initial value', () => {
        const formGroup = service.createCauHinhHoaDonDienTuFormGroup();

        const cauHinhHoaDonDienTu = service.getCauHinhHoaDonDienTu(formGroup) as any;

        expect(cauHinhHoaDonDienTu).toMatchObject({});
      });

      it('should return ICauHinhHoaDonDienTu', () => {
        const formGroup = service.createCauHinhHoaDonDienTuFormGroup(sampleWithRequiredData);

        const cauHinhHoaDonDienTu = service.getCauHinhHoaDonDienTu(formGroup) as any;

        expect(cauHinhHoaDonDienTu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICauHinhHoaDonDienTu should not enable id FormControl', () => {
        const formGroup = service.createCauHinhHoaDonDienTuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCauHinhHoaDonDienTu should disable id FormControl', () => {
        const formGroup = service.createCauHinhHoaDonDienTuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
