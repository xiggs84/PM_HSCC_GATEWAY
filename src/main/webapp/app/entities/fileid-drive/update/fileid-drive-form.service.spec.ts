import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../fileid-drive.test-samples';

import { FileidDriveFormService } from './fileid-drive-form.service';

describe('FileidDrive Form Service', () => {
  let service: FileidDriveFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileidDriveFormService);
  });

  describe('Service methods', () => {
    describe('createFileidDriveFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFileidDriveFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fileId: expect.any(Object),
            trangThai: expect.any(Object),
            idHopDong: expect.any(Object),
          }),
        );
      });

      it('passing IFileidDrive should create a new form with FormGroup', () => {
        const formGroup = service.createFileidDriveFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            fileId: expect.any(Object),
            trangThai: expect.any(Object),
            idHopDong: expect.any(Object),
          }),
        );
      });
    });

    describe('getFileidDrive', () => {
      it('should return NewFileidDrive for default FileidDrive initial value', () => {
        const formGroup = service.createFileidDriveFormGroup(sampleWithNewData);

        const fileidDrive = service.getFileidDrive(formGroup) as any;

        expect(fileidDrive).toMatchObject(sampleWithNewData);
      });

      it('should return NewFileidDrive for empty FileidDrive initial value', () => {
        const formGroup = service.createFileidDriveFormGroup();

        const fileidDrive = service.getFileidDrive(formGroup) as any;

        expect(fileidDrive).toMatchObject({});
      });

      it('should return IFileidDrive', () => {
        const formGroup = service.createFileidDriveFormGroup(sampleWithRequiredData);

        const fileidDrive = service.getFileidDrive(formGroup) as any;

        expect(fileidDrive).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFileidDrive should not enable id FormControl', () => {
        const formGroup = service.createFileidDriveFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFileidDrive should disable id FormControl', () => {
        const formGroup = service.createFileidDriveFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
