import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tai-san-dat-nha.test-samples';

import { TaiSanDatNhaFormService } from './tai-san-dat-nha-form.service';

describe('TaiSanDatNha Form Service', () => {
  let service: TaiSanDatNhaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiSanDatNhaFormService);
  });

  describe('Service methods', () => {
    describe('createTaiSanDatNhaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaiSanDatNhaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinTs: expect.any(Object),
            idLoaiTs: expect.any(Object),
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
          }),
        );
      });

      it('passing ITaiSanDatNha should create a new form with FormGroup', () => {
        const formGroup = service.createTaiSanDatNhaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinTs: expect.any(Object),
            idLoaiTs: expect.any(Object),
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
          }),
        );
      });
    });

    describe('getTaiSanDatNha', () => {
      it('should return NewTaiSanDatNha for default TaiSanDatNha initial value', () => {
        const formGroup = service.createTaiSanDatNhaFormGroup(sampleWithNewData);

        const taiSanDatNha = service.getTaiSanDatNha(formGroup) as any;

        expect(taiSanDatNha).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaiSanDatNha for empty TaiSanDatNha initial value', () => {
        const formGroup = service.createTaiSanDatNhaFormGroup();

        const taiSanDatNha = service.getTaiSanDatNha(formGroup) as any;

        expect(taiSanDatNha).toMatchObject({});
      });

      it('should return ITaiSanDatNha', () => {
        const formGroup = service.createTaiSanDatNhaFormGroup(sampleWithRequiredData);

        const taiSanDatNha = service.getTaiSanDatNha(formGroup) as any;

        expect(taiSanDatNha).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaiSanDatNha should not enable id FormControl', () => {
        const formGroup = service.createTaiSanDatNhaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaiSanDatNha should disable id FormControl', () => {
        const formGroup = service.createTaiSanDatNhaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
