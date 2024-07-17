import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../log-dang-nhap.test-samples';

import { LogDangNhapFormService } from './log-dang-nhap-form.service';

describe('LogDangNhap Form Service', () => {
  let service: LogDangNhapFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogDangNhapFormService);
  });

  describe('Service methods', () => {
    describe('createLogDangNhapFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogDangNhapFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ngayDangNhap: expect.any(Object),
            ipAddress: expect.any(Object),
            idCanBo: expect.any(Object),
            tenDangNhap: expect.any(Object),
          }),
        );
      });

      it('passing ILogDangNhap should create a new form with FormGroup', () => {
        const formGroup = service.createLogDangNhapFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ngayDangNhap: expect.any(Object),
            ipAddress: expect.any(Object),
            idCanBo: expect.any(Object),
            tenDangNhap: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogDangNhap', () => {
      it('should return NewLogDangNhap for default LogDangNhap initial value', () => {
        const formGroup = service.createLogDangNhapFormGroup(sampleWithNewData);

        const logDangNhap = service.getLogDangNhap(formGroup) as any;

        expect(logDangNhap).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogDangNhap for empty LogDangNhap initial value', () => {
        const formGroup = service.createLogDangNhapFormGroup();

        const logDangNhap = service.getLogDangNhap(formGroup) as any;

        expect(logDangNhap).toMatchObject({});
      });

      it('should return ILogDangNhap', () => {
        const formGroup = service.createLogDangNhapFormGroup(sampleWithRequiredData);

        const logDangNhap = service.getLogDangNhap(formGroup) as any;

        expect(logDangNhap).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogDangNhap should not enable id FormControl', () => {
        const formGroup = service.createLogDangNhapFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogDangNhap should disable id FormControl', () => {
        const formGroup = service.createLogDangNhapFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
