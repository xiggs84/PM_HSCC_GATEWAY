import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../cau-hinh-hop-dong.test-samples';

import { CauHinhHopDongFormService } from './cau-hinh-hop-dong-form.service';

describe('CauHinhHopDong Form Service', () => {
  let service: CauHinhHopDongFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CauHinhHopDongFormService);
  });

  describe('Service methods', () => {
    describe('createCauHinhHopDongFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCauHinhHopDongFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idDonVi: expect.any(Object),
            chieuDai: expect.any(Object),
            tienTo: expect.any(Object),
            giaTri: expect.any(Object),
            hienThi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing ICauHinhHopDong should create a new form with FormGroup', () => {
        const formGroup = service.createCauHinhHopDongFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idDonVi: expect.any(Object),
            chieuDai: expect.any(Object),
            tienTo: expect.any(Object),
            giaTri: expect.any(Object),
            hienThi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getCauHinhHopDong', () => {
      it('should return NewCauHinhHopDong for default CauHinhHopDong initial value', () => {
        const formGroup = service.createCauHinhHopDongFormGroup(sampleWithNewData);

        const cauHinhHopDong = service.getCauHinhHopDong(formGroup) as any;

        expect(cauHinhHopDong).toMatchObject(sampleWithNewData);
      });

      it('should return NewCauHinhHopDong for empty CauHinhHopDong initial value', () => {
        const formGroup = service.createCauHinhHopDongFormGroup();

        const cauHinhHopDong = service.getCauHinhHopDong(formGroup) as any;

        expect(cauHinhHopDong).toMatchObject({});
      });

      it('should return ICauHinhHopDong', () => {
        const formGroup = service.createCauHinhHopDongFormGroup(sampleWithRequiredData);

        const cauHinhHopDong = service.getCauHinhHopDong(formGroup) as any;

        expect(cauHinhHopDong).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICauHinhHopDong should not enable id FormControl', () => {
        const formGroup = service.createCauHinhHopDongFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCauHinhHopDong should disable id FormControl', () => {
        const formGroup = service.createCauHinhHopDongFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
