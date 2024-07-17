import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tai-san.test-samples';

import { TaiSanFormService } from './tai-san-form.service';

describe('TaiSan Form Service', () => {
  let service: TaiSanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiSanFormService);
  });

  describe('Service methods', () => {
    describe('createTaiSanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaiSanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinTs: expect.any(Object),
            ghiChu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDuongSu: expect.any(Object),
            idTsGoc: expect.any(Object),
            maTaiSan: expect.any(Object),
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
            syncStatus: expect.any(Object),
            idTsGocs: expect.any(Object),
            idLoaiTs: expect.any(Object),
            idTinhTrang: expect.any(Object),
            taiSans: expect.any(Object),
          }),
        );
      });

      it('passing ITaiSan should create a new form with FormGroup', () => {
        const formGroup = service.createTaiSanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            tenTaiSan: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinTs: expect.any(Object),
            ghiChu: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDuongSu: expect.any(Object),
            idTsGoc: expect.any(Object),
            maTaiSan: expect.any(Object),
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
            syncStatus: expect.any(Object),
            idTsGocs: expect.any(Object),
            idLoaiTs: expect.any(Object),
            idTinhTrang: expect.any(Object),
            taiSans: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaiSan', () => {
      it('should return NewTaiSan for default TaiSan initial value', () => {
        const formGroup = service.createTaiSanFormGroup(sampleWithNewData);

        const taiSan = service.getTaiSan(formGroup) as any;

        expect(taiSan).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaiSan for empty TaiSan initial value', () => {
        const formGroup = service.createTaiSanFormGroup();

        const taiSan = service.getTaiSan(formGroup) as any;

        expect(taiSan).toMatchObject({});
      });

      it('should return ITaiSan', () => {
        const formGroup = service.createTaiSanFormGroup(sampleWithRequiredData);

        const taiSan = service.getTaiSan(formGroup) as any;

        expect(taiSan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaiSan should not enable id FormControl', () => {
        const formGroup = service.createTaiSanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaiSan should disable id FormControl', () => {
        const formGroup = service.createTaiSanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
