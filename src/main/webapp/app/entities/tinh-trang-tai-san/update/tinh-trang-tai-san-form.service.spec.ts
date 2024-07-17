import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../tinh-trang-tai-san.test-samples';

import { TinhTrangTaiSanFormService } from './tinh-trang-tai-san-form.service';

describe('TinhTrangTaiSan Form Service', () => {
  let service: TinhTrangTaiSanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinhTrangTaiSanFormService);
  });

  describe('Service methods', () => {
    describe('createTinhTrangTaiSanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTinhTrangTaiSanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTinhTrang: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing ITinhTrangTaiSan should create a new form with FormGroup', () => {
        const formGroup = service.createTinhTrangTaiSanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idTinhTrang: expect.any(Object),
            dienGiai: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getTinhTrangTaiSan', () => {
      it('should return NewTinhTrangTaiSan for default TinhTrangTaiSan initial value', () => {
        const formGroup = service.createTinhTrangTaiSanFormGroup(sampleWithNewData);

        const tinhTrangTaiSan = service.getTinhTrangTaiSan(formGroup) as any;

        expect(tinhTrangTaiSan).toMatchObject(sampleWithNewData);
      });

      it('should return NewTinhTrangTaiSan for empty TinhTrangTaiSan initial value', () => {
        const formGroup = service.createTinhTrangTaiSanFormGroup();

        const tinhTrangTaiSan = service.getTinhTrangTaiSan(formGroup) as any;

        expect(tinhTrangTaiSan).toMatchObject({});
      });

      it('should return ITinhTrangTaiSan', () => {
        const formGroup = service.createTinhTrangTaiSanFormGroup(sampleWithRequiredData);

        const tinhTrangTaiSan = service.getTinhTrangTaiSan(formGroup) as any;

        expect(tinhTrangTaiSan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITinhTrangTaiSan should not enable id FormControl', () => {
        const formGroup = service.createTinhTrangTaiSanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTinhTrangTaiSan should disable id FormControl', () => {
        const formGroup = service.createTinhTrangTaiSanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
