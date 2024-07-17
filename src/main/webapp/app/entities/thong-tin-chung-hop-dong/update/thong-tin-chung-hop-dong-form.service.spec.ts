import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../thong-tin-chung-hop-dong.test-samples';

import { ThongTinChungHopDongFormService } from './thong-tin-chung-hop-dong-form.service';

describe('ThongTinChungHopDong Form Service', () => {
  let service: ThongTinChungHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThongTinChungHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createThongTinChungHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createThongTinChungHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            thongTinVanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dieuKhoanHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idHdGoc: expect.any(Object),
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
            thongTinChung: expect.any(Object),
            thongTinChungClob: expect.any(Object),
            idHopDong: expect.any(Object),
            idLoaiHD: expect.any(Object),
            idSoCongChung: expect.any(Object),
          }),
        );
      });

      it('passing IThongTinChungHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createThongTinChungHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            ngayLapHd: expect.any(Object),
            nguoiLapHd: expect.any(Object),
            thongTinVanBan: expect.any(Object),
            trangThai: expect.any(Object),
            idLoaiHd: expect.any(Object),
            dieuKhoanHd: expect.any(Object),
            idDonVi: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idHdGoc: expect.any(Object),
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
            thongTinChung: expect.any(Object),
            thongTinChungClob: expect.any(Object),
            idHopDong: expect.any(Object),
            idLoaiHD: expect.any(Object),
            idSoCongChung: expect.any(Object),
          }),
        );
      });
    });

    describe('getThongTinChungHopDong', () => {
      it('should return NewThongTinChungHopDong for default ThongTinChungHopDong initial value', () => {
        const formGroup = service.createThongTinChungHopDongFormGroup(sampleWithNewData);

        const thongTinChungHopDong = service.getThongTinChungHopDong(formGroup) as any;

        expect(thongTinChungHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewThongTinChungHopDong for empty ThongTinChungHopDong initial value', () => {
        const formGroup = service.createThongTinChungHopDongFormGroup();

        const thongTinChungHopDong = service.getThongTinChungHopDong(formGroup) as any;

        expect(thongTinChungHopDong).toMatchObject({});
      });

      it('should return IThongTinChungHopDong', () => {
        const formGroup = service.createThongTinChungHopDongFormGroup(sampleWithRequiredData);

        const thongTinChungHopDong = service.getThongTinChungHopDong(formGroup) as any;

        expect(thongTinChungHopDong).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IThongTinChungHopDong should not enable id FormControl', () => {
        const formGroup = service.createThongTinChungHopDongFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewThongTinChungHopDong should disable id FormControl', () => {
        const formGroup = service.createThongTinChungHopDongFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
