import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../log-search-ds-ts.test-samples';

import { LogSearchDsTsFormService } from './log-search-ds-ts-form.service';

describe('LogSearchDsTs Form Service', () => {
  let service: LogSearchDsTsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogSearchDsTsFormService);
  });

  describe('Service methods', () => {
    describe('createLogSearchDsTsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogSearchDsTsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            noiDung: expect.any(Object),
            slKq: expect.any(Object),
            kqSearch: expect.any(Object),
          }),
        );
      });

      it('passing ILogSearchDsTs should create a new form with FormGroup', () => {
        const formGroup = service.createLogSearchDsTsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            noiDung: expect.any(Object),
            slKq: expect.any(Object),
            kqSearch: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogSearchDsTs', () => {
      it('should return NewLogSearchDsTs for default LogSearchDsTs initial value', () => {
        const formGroup = service.createLogSearchDsTsFormGroup(sampleWithNewData);

        const logSearchDsTs = service.getLogSearchDsTs(formGroup) as any;

        expect(logSearchDsTs).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogSearchDsTs for empty LogSearchDsTs initial value', () => {
        const formGroup = service.createLogSearchDsTsFormGroup();

        const logSearchDsTs = service.getLogSearchDsTs(formGroup) as any;

        expect(logSearchDsTs).toMatchObject({});
      });

      it('should return ILogSearchDsTs', () => {
        const formGroup = service.createLogSearchDsTsFormGroup(sampleWithRequiredData);

        const logSearchDsTs = service.getLogSearchDsTs(formGroup) as any;

        expect(logSearchDsTs).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogSearchDsTs should not enable id FormControl', () => {
        const formGroup = service.createLogSearchDsTsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogSearchDsTs should disable id FormControl', () => {
        const formGroup = service.createLogSearchDsTsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
