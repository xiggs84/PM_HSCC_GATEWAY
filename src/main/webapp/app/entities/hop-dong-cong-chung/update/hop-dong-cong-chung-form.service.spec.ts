import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../hop-dong-cong-chung.test-samples';

import { HopDongCongChungFormService } from './hop-dong-cong-chung-form.service';

describe('HopDongCongChung Form Service', () => {
  let service: HopDongCongChungFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HopDongCongChungFormService);
  });

  describe('Service methods', () => {
    describe('createHopDongCongChungFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHopDongCongChungFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idHopDong: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            thongTinDuongSu: expect.any(Object),
            thongTinTaiSan: expect.any(Object),
            thongTinVanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dieuKhoanHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idHdGoc: expect.any(Object),
            thongTinChuyenNhuong: expect.any(Object),
            maHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            ngayHen: expect.any(Object),
            soCongChung: expect.any(Object),
            congChungVien: expect.any(Object),
            ngayKyHd: expect.any(Object),
            nguoiRutTrich: expect.any(Object),
            soTienRutTrich: expect.any(Object),
            ngayRutTrich: expect.any(Object),
            hdThuCong: expect.any(Object),
            trangThaiRutTrich: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            strSearch: expect.any(Object),
            idMaster: expect.any(Object),
            idHdSdHb: expect.any(Object),
            srcDmMaster: expect.any(Object),
            repRefUnique: expect.any(Object),
            ngayText: expect.any(Object),
            ngayNum: expect.any(Object),
            ngayThaoTacRutTrich: expect.any(Object),
            thuLaoCongChung: expect.any(Object),
            quyenLaiSt: expect.any(Object),
            soLaiSt: expect.any(Object),
            quyenLaiTl: expect.any(Object),
            soLaiTl: expect.any(Object),
            srcKySoPdf: expect.any(Object),
            srcKySoPdfSigned: expect.any(Object),
            syncStatus: expect.any(Object),
            ngayRutTrichText: expect.any(Object),
            idLoaiHD: expect.any(Object),
            idSoCongChung: expect.any(Object),
          }),
        );
      });

      it('passing IHopDongCongChung should create a new form with FormGroup', () => {
        const formGroup = service.createHopDongCongChungFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idHopDong: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            thongTinDuongSu: expect.any(Object),
            thongTinTaiSan: expect.any(Object),
            thongTinVanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dieuKhoanHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idHdGoc: expect.any(Object),
            thongTinChuyenNhuong: expect.any(Object),
            maHopDong: expect.any(Object),
            srcHopDong: expect.any(Object),
            ngayHen: expect.any(Object),
            soCongChung: expect.any(Object),
            congChungVien: expect.any(Object),
            ngayKyHd: expect.any(Object),
            nguoiRutTrich: expect.any(Object),
            soTienRutTrich: expect.any(Object),
            ngayRutTrich: expect.any(Object),
            hdThuCong: expect.any(Object),
            trangThaiRutTrich: expect.any(Object),
            chuKyNgoaiTruSo: expect.any(Object),
            strSearch: expect.any(Object),
            idMaster: expect.any(Object),
            idHdSdHb: expect.any(Object),
            srcDmMaster: expect.any(Object),
            repRefUnique: expect.any(Object),
            ngayText: expect.any(Object),
            ngayNum: expect.any(Object),
            ngayThaoTacRutTrich: expect.any(Object),
            thuLaoCongChung: expect.any(Object),
            quyenLaiSt: expect.any(Object),
            soLaiSt: expect.any(Object),
            quyenLaiTl: expect.any(Object),
            soLaiTl: expect.any(Object),
            srcKySoPdf: expect.any(Object),
            srcKySoPdfSigned: expect.any(Object),
            syncStatus: expect.any(Object),
            ngayRutTrichText: expect.any(Object),
            idLoaiHD: expect.any(Object),
            idSoCongChung: expect.any(Object),
          }),
        );
      });
    });

    describe('getHopDongCongChung', () => {
      it('should return NewHopDongCongChung for default HopDongCongChung initial value', () => {
        const formGroup = service.createHopDongCongChungFormGroup(sampleWithNewData);

        const hopDongCongChung = service.getHopDongCongChung(formGroup) as any;

        expect(hopDongCongChung).toMatchObject(sampleWithNewData);
      });

      it('should return NewHopDongCongChung for empty HopDongCongChung initial value', () => {
        const formGroup = service.createHopDongCongChungFormGroup();

        const hopDongCongChung = service.getHopDongCongChung(formGroup) as any;

        expect(hopDongCongChung).toMatchObject({});
      });

      it('should return IHopDongCongChung', () => {
        const formGroup = service.createHopDongCongChungFormGroup(sampleWithRequiredData);

        const hopDongCongChung = service.getHopDongCongChung(formGroup) as any;

        expect(hopDongCongChung).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHopDongCongChung should not enable id FormControl', () => {
        const formGroup = service.createHopDongCongChungFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHopDongCongChung should disable id FormControl', () => {
        const formGroup = service.createHopDongCongChungFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
