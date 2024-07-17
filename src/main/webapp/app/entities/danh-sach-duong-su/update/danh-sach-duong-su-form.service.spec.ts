import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-sach-duong-su.test-samples';

import { DanhSachDuongSuFormService } from './danh-sach-duong-su-form.service';

describe('DanhSachDuongSu Form Service', () => {
  let service: DanhSachDuongSuFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhSachDuongSuFormService);
  });

  describe('Service methods', () => {
    describe('createDanhSachDuongSuFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhSachDuongSuFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            idLoaiDs: expect.any(Object),
            diaChi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
          }),
        );
      });

      it('passing IDanhSachDuongSu should create a new form with FormGroup', () => {
        const formGroup = service.createDanhSachDuongSuFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            idLoaiDs: expect.any(Object),
            diaChi: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            idLoaiNganChan: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhSachDuongSu', () => {
      it('should return NewDanhSachDuongSu for default DanhSachDuongSu initial value', () => {
        const formGroup = service.createDanhSachDuongSuFormGroup(sampleWithNewData);

        const danhSachDuongSu = service.getDanhSachDuongSu(formGroup) as any;

        expect(danhSachDuongSu).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhSachDuongSu for empty DanhSachDuongSu initial value', () => {
        const formGroup = service.createDanhSachDuongSuFormGroup();

        const danhSachDuongSu = service.getDanhSachDuongSu(formGroup) as any;

        expect(danhSachDuongSu).toMatchObject({});
      });

      it('should return IDanhSachDuongSu', () => {
        const formGroup = service.createDanhSachDuongSuFormGroup(sampleWithRequiredData);

        const danhSachDuongSu = service.getDanhSachDuongSu(formGroup) as any;

        expect(danhSachDuongSu).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhSachDuongSu should not enable id FormControl', () => {
        const formGroup = service.createDanhSachDuongSuFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhSachDuongSu should disable id FormControl', () => {
        const formGroup = service.createDanhSachDuongSuFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
