import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../log-lien-thong-mot-cua.test-samples';

import { LogLienThongMotCuaFormService } from './log-lien-thong-mot-cua-form.service';

describe('LogLienThongMotCua Form Service', () => {
  let service: LogLienThongMotCuaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogLienThongMotCuaFormService);
  });

  describe('Service methods', () => {
    describe('createLogLienThongMotCuaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogLienThongMotCuaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            idChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            noiDung: expect.any(Object),
          }),
        );
      });

      it('passing ILogLienThongMotCua should create a new form with FormGroup', () => {
        const formGroup = service.createLogLienThongMotCuaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            idChungThuc: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            noiDung: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogLienThongMotCua', () => {
      it('should return NewLogLienThongMotCua for default LogLienThongMotCua initial value', () => {
        const formGroup = service.createLogLienThongMotCuaFormGroup(sampleWithNewData);

        const logLienThongMotCua = service.getLogLienThongMotCua(formGroup) as any;

        expect(logLienThongMotCua).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogLienThongMotCua for empty LogLienThongMotCua initial value', () => {
        const formGroup = service.createLogLienThongMotCuaFormGroup();

        const logLienThongMotCua = service.getLogLienThongMotCua(formGroup) as any;

        expect(logLienThongMotCua).toMatchObject({});
      });

      it('should return ILogLienThongMotCua', () => {
        const formGroup = service.createLogLienThongMotCuaFormGroup(sampleWithRequiredData);

        const logLienThongMotCua = service.getLogLienThongMotCua(formGroup) as any;

        expect(logLienThongMotCua).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogLienThongMotCua should not enable id FormControl', () => {
        const formGroup = service.createLogLienThongMotCuaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogLienThongMotCua should disable id FormControl', () => {
        const formGroup = service.createLogLienThongMotCuaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
