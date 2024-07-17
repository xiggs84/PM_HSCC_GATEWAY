import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cau-hinh-thong-tin-loai-tai-san.test-samples';

import { CauHinhThongTinLoaiTaiSanFormService } from './cau-hinh-thong-tin-loai-tai-san-form.service';

describe('CauHinhThongTinLoaiTaiSan Form Service', () => {
  let service: CauHinhThongTinLoaiTaiSanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauHinhThongTinLoaiTaiSanFormService);
  });

  describe('Service methods', () => {
    describe('createCauHinhThongTinLoaiTaiSanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCauHinhThongTinLoaiTaiSanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHinh: expect.any(Object),
            noiDung: expect.any(Object),
            javascript: expect.any(Object),
            css: expect.any(Object),
            idLoaiTs: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            xml: expect.any(Object),
          }),
        );
      });

      it('passing ICauHinhThongTinLoaiTaiSan should create a new form with FormGroup', () => {
        const formGroup = service.createCauHinhThongTinLoaiTaiSanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHinh: expect.any(Object),
            noiDung: expect.any(Object),
            javascript: expect.any(Object),
            css: expect.any(Object),
            idLoaiTs: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            xml: expect.any(Object),
          }),
        );
      });
    });

    describe('getCauHinhThongTinLoaiTaiSan', () => {
      it('should return NewCauHinhThongTinLoaiTaiSan for default CauHinhThongTinLoaiTaiSan initial value', () => {
        const formGroup = service.createCauHinhThongTinLoaiTaiSanFormGroup(sampleWithNewData);

        const cauHinhThongTinLoaiTaiSan = service.getCauHinhThongTinLoaiTaiSan(formGroup) as any;

        expect(cauHinhThongTinLoaiTaiSan).toMatchObject(sampleWithNewData);
      });

      it('should return NewCauHinhThongTinLoaiTaiSan for empty CauHinhThongTinLoaiTaiSan initial value', () => {
        const formGroup = service.createCauHinhThongTinLoaiTaiSanFormGroup();

        const cauHinhThongTinLoaiTaiSan = service.getCauHinhThongTinLoaiTaiSan(formGroup) as any;

        expect(cauHinhThongTinLoaiTaiSan).toMatchObject({});
      });

      it('should return ICauHinhThongTinLoaiTaiSan', () => {
        const formGroup = service.createCauHinhThongTinLoaiTaiSanFormGroup(sampleWithRequiredData);

        const cauHinhThongTinLoaiTaiSan = service.getCauHinhThongTinLoaiTaiSan(formGroup) as any;

        expect(cauHinhThongTinLoaiTaiSan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICauHinhThongTinLoaiTaiSan should not enable id FormControl', () => {
        const formGroup = service.createCauHinhThongTinLoaiTaiSanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCauHinhThongTinLoaiTaiSan should disable id FormControl', () => {
        const formGroup = service.createCauHinhThongTinLoaiTaiSanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
