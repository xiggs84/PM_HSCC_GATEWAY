import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-don-vi.test-samples';

import { DanhMucDonViFormService } from './danh-muc-don-vi-form.service';

describe('DanhMucDonVi Form Service', () => {
  let service: DanhMucDonViFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucDonViFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucDonViFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucDonViFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDonVi: expect.any(Object),
            tenDonVi: expect.any(Object),
            diaChi: expect.any(Object),
            nguoiDaiDien: expect.any(Object),
            soDienThoai: expect.any(Object),
            idDonViQl: expect.any(Object),
            loaiDonVi: expect.any(Object),
            ngayKhaiBao: expect.any(Object),
            trangThai: expect.any(Object),
            soNha: expect.any(Object),
            maSoThue: expect.any(Object),
            idCapQl: expect.any(Object),
            loaiNhiemVu: expect.any(Object),
            hoaDonDt: expect.any(Object),
            maDonViIgate: expect.any(Object),
            maCoQuanIgate: expect.any(Object),
            capDonVi: expect.any(Object),
            kySo: expect.any(Object),
            qrScan: expect.any(Object),
            verifyIdCard: expect.any(Object),
            isVerifyFace: expect.any(Object),
            isElastic: expect.any(Object),
            apikeyCccd: expect.any(Object),
            apikeyFace: expect.any(Object),
            verifyCodeCccd: expect.any(Object),
            usernameElastic: expect.any(Object),
            passwordElastic: expect.any(Object),
            idTinh: expect.any(Object),
            idHuyen: expect.any(Object),
            idPhuongXa: expect.any(Object),
            idLoaiDv: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucDonVi should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucDonViFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDonVi: expect.any(Object),
            tenDonVi: expect.any(Object),
            diaChi: expect.any(Object),
            nguoiDaiDien: expect.any(Object),
            soDienThoai: expect.any(Object),
            idDonViQl: expect.any(Object),
            loaiDonVi: expect.any(Object),
            ngayKhaiBao: expect.any(Object),
            trangThai: expect.any(Object),
            soNha: expect.any(Object),
            maSoThue: expect.any(Object),
            idCapQl: expect.any(Object),
            loaiNhiemVu: expect.any(Object),
            hoaDonDt: expect.any(Object),
            maDonViIgate: expect.any(Object),
            maCoQuanIgate: expect.any(Object),
            capDonVi: expect.any(Object),
            kySo: expect.any(Object),
            qrScan: expect.any(Object),
            verifyIdCard: expect.any(Object),
            isVerifyFace: expect.any(Object),
            isElastic: expect.any(Object),
            apikeyCccd: expect.any(Object),
            apikeyFace: expect.any(Object),
            verifyCodeCccd: expect.any(Object),
            usernameElastic: expect.any(Object),
            passwordElastic: expect.any(Object),
            idTinh: expect.any(Object),
            idHuyen: expect.any(Object),
            idPhuongXa: expect.any(Object),
            idLoaiDv: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucDonVi', () => {
      it('should return NewDanhMucDonVi for default DanhMucDonVi initial value', () => {
        const formGroup = service.createDanhMucDonViFormGroup(sampleWithNewData);

        const danhMucDonVi = service.getDanhMucDonVi(formGroup) as any;

        expect(danhMucDonVi).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucDonVi for empty DanhMucDonVi initial value', () => {
        const formGroup = service.createDanhMucDonViFormGroup();

        const danhMucDonVi = service.getDanhMucDonVi(formGroup) as any;

        expect(danhMucDonVi).toMatchObject({});
      });

      it('should return IDanhMucDonVi', () => {
        const formGroup = service.createDanhMucDonViFormGroup(sampleWithRequiredData);

        const danhMucDonVi = service.getDanhMucDonVi(formGroup) as any;

        expect(danhMucDonVi).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucDonVi should not enable id FormControl', () => {
        const formGroup = service.createDanhMucDonViFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucDonVi should disable id FormControl', () => {
        const formGroup = service.createDanhMucDonViFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
