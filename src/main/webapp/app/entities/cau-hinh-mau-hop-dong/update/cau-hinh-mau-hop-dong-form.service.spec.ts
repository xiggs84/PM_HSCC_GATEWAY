import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cau-hinh-mau-hop-dong.test-samples';

import { CauHinhMauHopDongFormService } from './cau-hinh-mau-hop-dong-form.service';

describe('CauHinhMauHopDong Form Service', () => {
  let service: CauHinhMauHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauHinhMauHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createCauHinhMauHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCauHinhMauHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dienGiai: expect.any(Object),
            idVaiTro1: expect.any(Object),
            idVaiTro2: expect.any(Object),
            fileHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            dieuKhoan: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcLoiChung: expect.any(Object),
            idNhom: expect.any(Object),
            fileLoiChung: expect.any(Object),
            chuyenTaiSan: expect.any(Object),
            loaiSuaDoi: expect.any(Object),
            loaiHuyBo: expect.any(Object),
            trangThaiDuyet: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            srcCv: expect.any(Object),
            srcTb: expect.any(Object),
            srcTtpc: expect.any(Object),
            idVaiTro3: expect.any(Object),
            idLoaiHD: expect.any(Object),
            idPhanLoaiHD: expect.any(Object),
          }),
        );
      });

      it('passing ICauHinhMauHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createCauHinhMauHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dienGiai: expect.any(Object),
            idVaiTro1: expect.any(Object),
            idVaiTro2: expect.any(Object),
            fileHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            dieuKhoan: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcLoiChung: expect.any(Object),
            idNhom: expect.any(Object),
            fileLoiChung: expect.any(Object),
            chuyenTaiSan: expect.any(Object),
            loaiSuaDoi: expect.any(Object),
            loaiHuyBo: expect.any(Object),
            trangThaiDuyet: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            srcCv: expect.any(Object),
            srcTb: expect.any(Object),
            srcTtpc: expect.any(Object),
            idVaiTro3: expect.any(Object),
            idLoaiHD: expect.any(Object),
            idPhanLoaiHD: expect.any(Object),
          }),
        );
      });
    });

    describe('getCauHinhMauHopDong', () => {
      it('should return NewCauHinhMauHopDong for default CauHinhMauHopDong initial value', () => {
        const formGroup = service.createCauHinhMauHopDongFormGroup(sampleWithNewData);

        const cauHinhMauHopDong = service.getCauHinhMauHopDong(formGroup) as any;

        expect(cauHinhMauHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewCauHinhMauHopDong for empty CauHinhMauHopDong initial value', () => {
        const formGroup = service.createCauHinhMauHopDongFormGroup();

        const cauHinhMauHopDong = service.getCauHinhMauHopDong(formGroup) as any;

        expect(cauHinhMauHopDong).toMatchObject({});
      });

      it('should return ICauHinhMauHopDong', () => {
        const formGroup = service.createCauHinhMauHopDongFormGroup(sampleWithRequiredData);

        const cauHinhMauHopDong = service.getCauHinhMauHopDong(formGroup) as any;

        expect(cauHinhMauHopDong).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICauHinhMauHopDong should not enable id FormControl', () => {
        const formGroup = service.createCauHinhMauHopDongFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCauHinhMauHopDong should disable id FormControl', () => {
        const formGroup = service.createCauHinhMauHopDongFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
