import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tai-san-duong-su.test-samples';

import { TaiSanDuongSuFormService } from './tai-san-duong-su-form.service';

describe('TaiSanDuongSu Form Service', () => {
  let service: TaiSanDuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiSanDuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createTaiSanDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaiSanDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trangThai: expect.any(Object),
            idDuongSu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idChungThuc: expect.any(Object),
            idTaiSan: expect.any(Object),
          }),
        );
      });

      it('passing ITaiSanDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createTaiSanDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            trangThai: expect.any(Object),
            idDuongSu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idChungThuc: expect.any(Object),
            idTaiSan: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaiSanDuongSu', () => {
      it('should return NewTaiSanDuongSu for default TaiSanDuongSu initial value', () => {
        const formGroup = service.createTaiSanDuongSuFormGroup(sampleWithNewData);

        const taiSanDuongSu = service.getTaiSanDuongSu(formGroup) as any;

        expect(taiSanDuongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaiSanDuongSu for empty TaiSanDuongSu initial value', () => {
        const formGroup = service.createTaiSanDuongSuFormGroup();

        const taiSanDuongSu = service.getTaiSanDuongSu(formGroup) as any;

        expect(taiSanDuongSu).toMatchObject({});
      });

      it('should return ITaiSanDuongSu', () => {
        const formGroup = service.createTaiSanDuongSuFormGroup(sampleWithRequiredData);

        const taiSanDuongSu = service.getTaiSanDuongSu(formGroup) as any;

        expect(taiSanDuongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaiSanDuongSu should not enable id FormControl', () => {
        const formGroup = service.createTaiSanDuongSuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaiSanDuongSu should disable id FormControl', () => {
        const formGroup = service.createTaiSanDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
