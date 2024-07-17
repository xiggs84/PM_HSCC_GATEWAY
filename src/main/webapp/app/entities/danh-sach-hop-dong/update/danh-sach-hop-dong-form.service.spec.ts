import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-sach-hop-dong.test-samples';

import { DanhSachHopDongFormService } from './danh-sach-hop-dong-form.service';

describe('DanhSachHopDong Form Service', () => {
  let service: DanhSachHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhSachHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createDanhSachHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhSachHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcHopDong: expect.any(Object),
            soCongChung: expect.any(Object),
            congChungVien: expect.any(Object),
            soTienRutTrich: expect.any(Object),
            hdThuCong: expect.any(Object),
            trangThaiRutTrich: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            strSearch: expect.any(Object),
            ngayText: expect.any(Object),
            ngayRutTrichText: expect.any(Object),
            ngayThaoTacRutTrich: expect.any(Object),
            thuLaoCongChung: expect.any(Object),
            quyenLaiSt: expect.any(Object),
            soLaiSt: expect.any(Object),
            quyenLaiTl: expect.any(Object),
            soLaiTl: expect.any(Object),
            srcKySoPdf: expect.any(Object),
            srcKySoPdfSigned: expect.any(Object),
            idHopDong: expect.any(Object),
            idSoCongChung: expect.any(Object),
          }),
        );
      });

      it('passing IDanhSachHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createDanhSachHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            srcHopDong: expect.any(Object),
            soCongChung: expect.any(Object),
            congChungVien: expect.any(Object),
            soTienRutTrich: expect.any(Object),
            hdThuCong: expect.any(Object),
            trangThaiRutTrich: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            strSearch: expect.any(Object),
            ngayText: expect.any(Object),
            ngayRutTrichText: expect.any(Object),
            ngayThaoTacRutTrich: expect.any(Object),
            thuLaoCongChung: expect.any(Object),
            quyenLaiSt: expect.any(Object),
            soLaiSt: expect.any(Object),
            quyenLaiTl: expect.any(Object),
            soLaiTl: expect.any(Object),
            srcKySoPdf: expect.any(Object),
            srcKySoPdfSigned: expect.any(Object),
            idHopDong: expect.any(Object),
            idSoCongChung: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhSachHopDong', () => {
      it('should return NewDanhSachHopDong for default DanhSachHopDong initial value', () => {
        const formGroup = service.createDanhSachHopDongFormGroup(sampleWithNewData);

        const danhSachHopDong = service.getDanhSachHopDong(formGroup) as any;

        expect(danhSachHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhSachHopDong for empty DanhSachHopDong initial value', () => {
        const formGroup = service.createDanhSachHopDongFormGroup();

        const danhSachHopDong = service.getDanhSachHopDong(formGroup) as any;

        expect(danhSachHopDong).toMatchObject({});
      });

      it('should return IDanhSachHopDong', () => {
        const formGroup = service.createDanhSachHopDongFormGroup(sampleWithRequiredData);

        const danhSachHopDong = service.getDanhSachHopDong(formGroup) as any;

        expect(danhSachHopDong).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhSachHopDong should not enable id FormControl', () => {
        const formGroup = service.createDanhSachHopDongFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhSachHopDong should disable id FormControl', () => {
        const formGroup = service.createDanhSachHopDongFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
