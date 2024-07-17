import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../log-thao-tac.test-samples';

import { LogThaoTacFormService } from './log-thao-tac-form.service';

describe('LogThaoTac Form Service', () => {
  let service: LogThaoTacFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogThaoTacFormService);
  });

  describe('Service methods', () => {
    describe('createLogThaoTacFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogThaoTacFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            dienGiai: expect.any(Object),
            tenBang: expect.any(Object),
            idKhoa: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
          }),
        );
      });

      it('passing ILogThaoTac should create a new form with FormGroup', () => {
        const formGroup = service.createLogThaoTacFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            dienGiai: expect.any(Object),
            tenBang: expect.any(Object),
            idKhoa: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogThaoTac', () => {
      it('should return NewLogThaoTac for default LogThaoTac initial value', () => {
        const formGroup = service.createLogThaoTacFormGroup(sampleWithNewData);

        const logThaoTac = service.getLogThaoTac(formGroup) as any;

        expect(logThaoTac).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogThaoTac for empty LogThaoTac initial value', () => {
        const formGroup = service.createLogThaoTacFormGroup();

        const logThaoTac = service.getLogThaoTac(formGroup) as any;

        expect(logThaoTac).toMatchObject({});
      });

      it('should return ILogThaoTac', () => {
        const formGroup = service.createLogThaoTacFormGroup(sampleWithRequiredData);

        const logThaoTac = service.getLogThaoTac(formGroup) as any;

        expect(logThaoTac).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogThaoTac should not enable id FormControl', () => {
        const formGroup = service.createLogThaoTacFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogThaoTac should disable id FormControl', () => {
        const formGroup = service.createLogThaoTacFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
