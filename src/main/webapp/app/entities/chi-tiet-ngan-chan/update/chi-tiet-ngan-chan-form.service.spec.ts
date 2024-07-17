import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../chi-tiet-ngan-chan.test-samples';

import { ChiTietNganChanFormService } from './chi-tiet-ngan-chan-form.service';

describe('ChiTietNganChan Form Service', () => {
  let service: ChiTietNganChanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChiTietNganChanFormService);
  });

  describe('Service methods', () => {
    describe('createChiTietNganChanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createChiTietNganChanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stt: expect.any(Object),
            idDoiTuong: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            loaiDoiTuong: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            ngayNganChan: expect.any(Object),
            ngayBdNganChan: expect.any(Object),
            ngayKtNganChan: expect.any(Object),
            trangThai: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            loaiNganChan: expect.any(Object),
            ngayCongVan: expect.any(Object),
          }),
        );
      });

      it('passing IChiTietNganChan should create a new form with FormGroup', () => {
        const formGroup = service.createChiTietNganChanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            stt: expect.any(Object),
            idDoiTuong: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            loaiDoiTuong: expect.any(Object),
            soHsCv: expect.any(Object),
            soCc: expect.any(Object),
            soVaoSo: expect.any(Object),
            moTa: expect.any(Object),
            ngayNganChan: expect.any(Object),
            ngayBdNganChan: expect.any(Object),
            ngayKtNganChan: expect.any(Object),
            trangThai: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            loaiNganChan: expect.any(Object),
            ngayCongVan: expect.any(Object),
          }),
        );
      });
    });

    describe('getChiTietNganChan', () => {
      it('should return NewChiTietNganChan for default ChiTietNganChan initial value', () => {
        const formGroup = service.createChiTietNganChanFormGroup(sampleWithNewData);

        const chiTietNganChan = service.getChiTietNganChan(formGroup) as any;

        expect(chiTietNganChan).toMatchObject(sampleWithNewData);
      });

      it('should return NewChiTietNganChan for empty ChiTietNganChan initial value', () => {
        const formGroup = service.createChiTietNganChanFormGroup();

        const chiTietNganChan = service.getChiTietNganChan(formGroup) as any;

        expect(chiTietNganChan).toMatchObject({});
      });

      it('should return IChiTietNganChan', () => {
        const formGroup = service.createChiTietNganChanFormGroup(sampleWithRequiredData);

        const chiTietNganChan = service.getChiTietNganChan(formGroup) as any;

        expect(chiTietNganChan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IChiTietNganChan should not enable id FormControl', () => {
        const formGroup = service.createChiTietNganChanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewChiTietNganChan should disable id FormControl', () => {
        const formGroup = service.createChiTietNganChanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
