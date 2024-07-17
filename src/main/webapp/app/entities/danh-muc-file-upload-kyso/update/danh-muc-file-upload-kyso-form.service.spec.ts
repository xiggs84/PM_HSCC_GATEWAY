import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-file-upload-kyso.test-samples';

import { DanhMucFileUploadKysoFormService } from './danh-muc-file-upload-kyso-form.service';

describe('DanhMucFileUploadKyso Form Service', () => {
  let service: DanhMucFileUploadKysoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucFileUploadKysoFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucFileUploadKysoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucFileUploadKysoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idFile: expect.any(Object),
            tenFile: expect.any(Object),
            fileUrl: expect.any(Object),
            fileSignedUrl: expect.any(Object),
            idCanBo: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
            filePdfUrl: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucFileUploadKyso should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucFileUploadKysoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idFile: expect.any(Object),
            tenFile: expect.any(Object),
            fileUrl: expect.any(Object),
            fileSignedUrl: expect.any(Object),
            idCanBo: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            trangThai: expect.any(Object),
            filePdfUrl: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucFileUploadKyso', () => {
      it('should return NewDanhMucFileUploadKyso for default DanhMucFileUploadKyso initial value', () => {
        const formGroup = service.createDanhMucFileUploadKysoFormGroup(sampleWithNewData);

        const danhMucFileUploadKyso = service.getDanhMucFileUploadKyso(formGroup) as any;

        expect(danhMucFileUploadKyso).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucFileUploadKyso for empty DanhMucFileUploadKyso initial value', () => {
        const formGroup = service.createDanhMucFileUploadKysoFormGroup();

        const danhMucFileUploadKyso = service.getDanhMucFileUploadKyso(formGroup) as any;

        expect(danhMucFileUploadKyso).toMatchObject({});
      });

      it('should return IDanhMucFileUploadKyso', () => {
        const formGroup = service.createDanhMucFileUploadKysoFormGroup(sampleWithRequiredData);

        const danhMucFileUploadKyso = service.getDanhMucFileUploadKyso(formGroup) as any;

        expect(danhMucFileUploadKyso).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucFileUploadKyso should not enable id FormControl', () => {
        const formGroup = service.createDanhMucFileUploadKysoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucFileUploadKyso should disable id FormControl', () => {
        const formGroup = service.createDanhMucFileUploadKysoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
