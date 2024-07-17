import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-sach-tai-san.test-samples';

import { DanhSachTaiSanFormService } from './danh-sach-tai-san-form.service';

describe('DanhSachTaiSan Form Service', () => {
  let service: DanhSachTaiSanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhSachTaiSanFormService);
  });

  describe('Service methods', () => {
    describe('createDanhSachTaiSanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhSachTaiSanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            ghiChu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDuongSu: expect.any(Object),
            idTsGoc: expect.any(Object),
            maTaiSan: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
            ngayBdNganChan: expect.any(Object),
            ngayKtNganChan: expect.any(Object),
            idMaster: expect.any(Object),
            strSearch: expect.any(Object),
            idDonVi: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            loaiNganChan: expect.any(Object),
            maXa: expect.any(Object),
            idLoaiTs: expect.any(Object),
          }),
        );
      });

      it('passing IDanhSachTaiSan should create a new form with FormGroup', () => {
        const formGroup = service.createDanhSachTaiSanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            ghiChu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDuongSu: expect.any(Object),
            idTsGoc: expect.any(Object),
            maTaiSan: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
            ngayBdNganChan: expect.any(Object),
            ngayKtNganChan: expect.any(Object),
            idMaster: expect.any(Object),
            strSearch: expect.any(Object),
            idDonVi: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            loaiNganChan: expect.any(Object),
            maXa: expect.any(Object),
            idLoaiTs: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhSachTaiSan', () => {
      it('should return NewDanhSachTaiSan for default DanhSachTaiSan initial value', () => {
        const formGroup = service.createDanhSachTaiSanFormGroup(sampleWithNewData);

        const danhSachTaiSan = service.getDanhSachTaiSan(formGroup) as any;

        expect(danhSachTaiSan).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhSachTaiSan for empty DanhSachTaiSan initial value', () => {
        const formGroup = service.createDanhSachTaiSanFormGroup();

        const danhSachTaiSan = service.getDanhSachTaiSan(formGroup) as any;

        expect(danhSachTaiSan).toMatchObject({});
      });

      it('should return IDanhSachTaiSan', () => {
        const formGroup = service.createDanhSachTaiSanFormGroup(sampleWithRequiredData);

        const danhSachTaiSan = service.getDanhSachTaiSan(formGroup) as any;

        expect(danhSachTaiSan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhSachTaiSan should not enable id FormControl', () => {
        const formGroup = service.createDanhSachTaiSanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhSachTaiSan should disable id FormControl', () => {
        const formGroup = service.createDanhSachTaiSanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
