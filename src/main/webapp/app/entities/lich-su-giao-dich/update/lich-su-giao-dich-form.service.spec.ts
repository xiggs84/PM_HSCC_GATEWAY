import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../lich-su-giao-dich.test-samples';

import { LichSuGiaoDichFormService } from './lich-su-giao-dich-form.service';

describe('LichSuGiaoDich Form Service', () => {
  let service: LichSuGiaoDichFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LichSuGiaoDichFormService);
  });

  describe('Service methods', () => {
    describe('createLichSuGiaoDichFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createLichSuGiaoDichFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            idDuongSu: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            idHopDong: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idChungThuc: expect.any(Object),
          }),
        );
      });

      it('passing ILichSuGiaoDich should create a new form with FormGroup', () => {
        const formGroup = service.createLichSuGiaoDichFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTaiSan: expect.any(Object),
            idDuongSu: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            idHopDong: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idChungThuc: expect.any(Object),
          }),
        );
      });
    });

    describe('getLichSuGiaoDich', () => {
      it('should return NewLichSuGiaoDich for default LichSuGiaoDich initial value', () => {
        const formGroup = service.createLichSuGiaoDichFormGroup(sampleWithNewData);

        const lichSuGiaoDich = service.getLichSuGiaoDich(formGroup) as any;

        expect(lichSuGiaoDich).toMatchObject(sampleWithNewData);
      });

      it('should return NewLichSuGiaoDich for empty LichSuGiaoDich initial value', () => {
        const formGroup = service.createLichSuGiaoDichFormGroup();

        const lichSuGiaoDich = service.getLichSuGiaoDich(formGroup) as any;

        expect(lichSuGiaoDich).toMatchObject({});
      });

      it('should return ILichSuGiaoDich', () => {
        const formGroup = service.createLichSuGiaoDichFormGroup(sampleWithRequiredData);

        const lichSuGiaoDich = service.getLichSuGiaoDich(formGroup) as any;

        expect(lichSuGiaoDich).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ILichSuGiaoDich should not enable id FormControl', () => {
        const formGroup = service.createLichSuGiaoDichFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewLichSuGiaoDich should disable id FormControl', () => {
        const formGroup = service.createLichSuGiaoDichFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
