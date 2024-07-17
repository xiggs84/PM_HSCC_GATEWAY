import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../hd-tc-master.test-samples';

import { HdTcMasterFormService } from './hd-tc-master-form.service';

describe('HdTcMaster Form Service', () => {
  let service: HdTcMasterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HdTcMasterFormService);
  });

  describe('Service methods', () => {
    describe('createHdTcMasterFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createHdTcMasterFormGroup();

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
            idSoCongChung: expect.any(Object),
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
          }),
        );
      });

      it('passing IHdTcMaster should create a new form with FormGroup', () => {
        const formGroup = service.createHdTcMasterFormGroup(sampleWithRequiredData);

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
            idSoCongChung: expect.any(Object),
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
          }),
        );
      });
    });

    describe('getHdTcMaster', () => {
      it('should return NewHdTcMaster for default HdTcMaster initial value', () => {
        const formGroup = service.createHdTcMasterFormGroup(sampleWithNewData);

        const hdTcMaster = service.getHdTcMaster(formGroup) as any;

        expect(hdTcMaster).toMatchObject(sampleWithNewData);
      });

      it('should return NewHdTcMaster for empty HdTcMaster initial value', () => {
        const formGroup = service.createHdTcMasterFormGroup();

        const hdTcMaster = service.getHdTcMaster(formGroup) as any;

        expect(hdTcMaster).toMatchObject({});
      });

      it('should return IHdTcMaster', () => {
        const formGroup = service.createHdTcMasterFormGroup(sampleWithRequiredData);

        const hdTcMaster = service.getHdTcMaster(formGroup) as any;

        expect(hdTcMaster).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IHdTcMaster should not enable id FormControl', () => {
        const formGroup = service.createHdTcMasterFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewHdTcMaster should disable id FormControl', () => {
        const formGroup = service.createHdTcMasterFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
