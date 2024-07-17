import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../log-download-file-drive.test-samples';

import { LogDownloadFileDriveFormService } from './log-download-file-drive-form.service';

describe('LogDownloadFileDrive Form Service', () => {
  let service: LogDownloadFileDriveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogDownloadFileDriveFormService);
  });

  describe('Service methods', () => {
    describe('createLogDownloadFileDriveFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLogDownloadFileDriveFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            noiDung: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            key: expect.any(Object),
          }),
        );
      });

      it('passing ILogDownloadFileDrive should create a new form with FormGroup', () => {
        const formGroup = service.createLogDownloadFileDriveFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLog: expect.any(Object),
            noiDung: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            key: expect.any(Object),
          }),
        );
      });
    });

    describe('getLogDownloadFileDrive', () => {
      it('should return NewLogDownloadFileDrive for default LogDownloadFileDrive initial value', () => {
        const formGroup = service.createLogDownloadFileDriveFormGroup(sampleWithNewData);

        const logDownloadFileDrive = service.getLogDownloadFileDrive(formGroup) as any;

        expect(logDownloadFileDrive).toMatchObject(sampleWithNewData);
      });

      it('should return NewLogDownloadFileDrive for empty LogDownloadFileDrive initial value', () => {
        const formGroup = service.createLogDownloadFileDriveFormGroup();

        const logDownloadFileDrive = service.getLogDownloadFileDrive(formGroup) as any;

        expect(logDownloadFileDrive).toMatchObject({});
      });

      it('should return ILogDownloadFileDrive', () => {
        const formGroup = service.createLogDownloadFileDriveFormGroup(sampleWithRequiredData);

        const logDownloadFileDrive = service.getLogDownloadFileDrive(formGroup) as any;

        expect(logDownloadFileDrive).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILogDownloadFileDrive should not enable id FormControl', () => {
        const formGroup = service.createLogDownloadFileDriveFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLogDownloadFileDrive should disable id FormControl', () => {
        const formGroup = service.createLogDownloadFileDriveFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
