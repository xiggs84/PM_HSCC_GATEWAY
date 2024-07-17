import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../log-hoa-don-dien-tu.test-samples';

import { LogHoaDonDienTuFormService } from './log-hoa-don-dien-tu-form.service';

describe('LogHoaDonDienTu Form Service', () => {
  let service: LogHoaDonDienTuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogHoaDonDienTuFormService);
  });

  describe('Service methods', () => {
    describe('createLogHoaDonDienTuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogHoaDonDienTuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDonVi: expect.any(Object),
            idHopDong: expect.any(Object),
            fKey: expect.any(Object),
            ketQua: expect.any(Object),
            trangThai: expect.any(Object),
            ngayPhatHanh: expect.any(Object),
          }),
        );
      });

      it('passing ILogHoaDonDienTu should create a new form with FormGroup', () => {
        const formGroup = service.createLogHoaDonDienTuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDonVi: expect.any(Object),
            idHopDong: expect.any(Object),
            fKey: expect.any(Object),
            ketQua: expect.any(Object),
            trangThai: expect.any(Object),
            ngayPhatHanh: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogHoaDonDienTu', () => {
      it('should return NewLogHoaDonDienTu for default LogHoaDonDienTu initial value', () => {
        const formGroup = service.createLogHoaDonDienTuFormGroup(sampleWithNewData);

        const logHoaDonDienTu = service.getLogHoaDonDienTu(formGroup) as any;

        expect(logHoaDonDienTu).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogHoaDonDienTu for empty LogHoaDonDienTu initial value', () => {
        const formGroup = service.createLogHoaDonDienTuFormGroup();

        const logHoaDonDienTu = service.getLogHoaDonDienTu(formGroup) as any;

        expect(logHoaDonDienTu).toMatchObject({});
      });

      it('should return ILogHoaDonDienTu', () => {
        const formGroup = service.createLogHoaDonDienTuFormGroup(sampleWithRequiredData);

        const logHoaDonDienTu = service.getLogHoaDonDienTu(formGroup) as any;

        expect(logHoaDonDienTu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogHoaDonDienTu should not enable id FormControl', () => {
        const formGroup = service.createLogHoaDonDienTuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogHoaDonDienTu should disable id FormControl', () => {
        const formGroup = service.createLogHoaDonDienTuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
