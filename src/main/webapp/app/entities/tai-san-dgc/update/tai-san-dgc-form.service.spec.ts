import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tai-san-dgc.test-samples';

import { TaiSanDgcFormService } from './tai-san-dgc-form.service';

describe('TaiSanDgc Form Service', () => {
  let service: TaiSanDgcFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiSanDgcFormService);
  });

  describe('Service methods', () => {
    describe('createTaiSanDgcFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaiSanDgcFormGroup();

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
          }),
        );
      });

      it('passing ITaiSanDgc should create a new form with FormGroup', () => {
        const formGroup = service.createTaiSanDgcFormGroup(sampleWithRequiredData);

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
          }),
        );
      });
    });

    describe('getTaiSanDgc', () => {
      it('should return NewTaiSanDgc for default TaiSanDgc initial value', () => {
        const formGroup = service.createTaiSanDgcFormGroup(sampleWithNewData);

        const taiSanDgc = service.getTaiSanDgc(formGroup) as any;

        expect(taiSanDgc).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaiSanDgc for empty TaiSanDgc initial value', () => {
        const formGroup = service.createTaiSanDgcFormGroup();

        const taiSanDgc = service.getTaiSanDgc(formGroup) as any;

        expect(taiSanDgc).toMatchObject({});
      });

      it('should return ITaiSanDgc', () => {
        const formGroup = service.createTaiSanDgcFormGroup(sampleWithRequiredData);

        const taiSanDgc = service.getTaiSanDgc(formGroup) as any;

        expect(taiSanDgc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaiSanDgc should not enable id FormControl', () => {
        const formGroup = service.createTaiSanDgcFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaiSanDgc should disable id FormControl', () => {
        const formGroup = service.createTaiSanDgcFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
