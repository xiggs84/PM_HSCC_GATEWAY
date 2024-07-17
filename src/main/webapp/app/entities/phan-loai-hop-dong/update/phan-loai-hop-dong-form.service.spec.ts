import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../phan-loai-hop-dong.test-samples';

import { PhanLoaiHopDongFormService } from './phan-loai-hop-dong-form.service';

describe('PhanLoaiHopDong Form Service', () => {
  let service: PhanLoaiHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhanLoaiHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createPhanLoaiHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createPhanLoaiHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });

      it('passing IPhanLoaiHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createPhanLoaiHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idPhanLoaiHopDong: expect.any(Object),
            dienGiai: expect.any(Object),
          }),
        );
      });
    });

    describe('getPhanLoaiHopDong', () => {
      it('should return NewPhanLoaiHopDong for default PhanLoaiHopDong initial value', () => {
        const formGroup = service.createPhanLoaiHopDongFormGroup(sampleWithNewData);

        const phanLoaiHopDong = service.getPhanLoaiHopDong(formGroup) as any;

        expect(phanLoaiHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewPhanLoaiHopDong for empty PhanLoaiHopDong initial value', () => {
        const formGroup = service.createPhanLoaiHopDongFormGroup();

        const phanLoaiHopDong = service.getPhanLoaiHopDong(formGroup) as any;

        expect(phanLoaiHopDong).toMatchObject({});
      });

      it('should return IPhanLoaiHopDong', () => {
        const formGroup = service.createPhanLoaiHopDongFormGroup(sampleWithRequiredData);

        const phanLoaiHopDong = service.getPhanLoaiHopDong(formGroup) as any;

        expect(phanLoaiHopDong).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IPhanLoaiHopDong should not enable id FormControl', () => {
        const formGroup = service.createPhanLoaiHopDongFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewPhanLoaiHopDong should disable id FormControl', () => {
        const formGroup = service.createPhanLoaiHopDongFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
