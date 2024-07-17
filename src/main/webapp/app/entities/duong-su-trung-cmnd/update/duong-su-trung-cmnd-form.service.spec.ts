import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../duong-su-trung-cmnd.test-samples';

import { DuongSuTrungCmndFormService } from './duong-su-trung-cmnd-form.service';

describe('DuongSuTrungCmnd Form Service', () => {
  let service: DuongSuTrungCmndFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuongSuTrungCmndFormService);
  });

  describe('Service methods', () => {
    describe('createDuongSuTrungCmndFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDuongSuTrungCmndFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            idLoaiDs: expect.any(Object),
            diaChi: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinDs: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            idDuongSuMin: expect.any(Object),
            idMasterMin: expect.any(Object),
            idDuongSuMax: expect.any(Object),
            idMasterMax: expect.any(Object),
          }),
        );
      });

      it('passing IDuongSuTrungCmnd should create a new form with FormGroup', () => {
        const formGroup = service.createDuongSuTrungCmndFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idDuongSu: expect.any(Object),
            tenDuongSu: expect.any(Object),
            idLoaiDs: expect.any(Object),
            diaChi: expect.any(Object),
            trangThai: expect.any(Object),
            thongTinDs: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDsGoc: expect.any(Object),
            idTinhTrang: expect.any(Object),
            idMaster: expect.any(Object),
            idDonVi: expect.any(Object),
            strSearch: expect.any(Object),
            soGiayTo: expect.any(Object),
            idDuongSuMin: expect.any(Object),
            idMasterMin: expect.any(Object),
            idDuongSuMax: expect.any(Object),
            idMasterMax: expect.any(Object),
          }),
        );
      });
    });

    describe('getDuongSuTrungCmnd', () => {
      it('should return NewDuongSuTrungCmnd for default DuongSuTrungCmnd initial value', () => {
        const formGroup = service.createDuongSuTrungCmndFormGroup(sampleWithNewData);

        const duongSuTrungCmnd = service.getDuongSuTrungCmnd(formGroup) as any;

        expect(duongSuTrungCmnd).toMatchObject(sampleWithNewData);
      });

      it('should return NewDuongSuTrungCmnd for empty DuongSuTrungCmnd initial value', () => {
        const formGroup = service.createDuongSuTrungCmndFormGroup();

        const duongSuTrungCmnd = service.getDuongSuTrungCmnd(formGroup) as any;

        expect(duongSuTrungCmnd).toMatchObject({});
      });

      it('should return IDuongSuTrungCmnd', () => {
        const formGroup = service.createDuongSuTrungCmndFormGroup(sampleWithRequiredData);

        const duongSuTrungCmnd = service.getDuongSuTrungCmnd(formGroup) as any;

        expect(duongSuTrungCmnd).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDuongSuTrungCmnd should not enable id FormControl', () => {
        const formGroup = service.createDuongSuTrungCmndFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDuongSuTrungCmnd should disable id FormControl', () => {
        const formGroup = service.createDuongSuTrungCmndFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
