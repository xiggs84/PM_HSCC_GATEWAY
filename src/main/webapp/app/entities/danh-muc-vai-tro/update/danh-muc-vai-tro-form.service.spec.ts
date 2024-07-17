import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-vai-tro.test-samples';

import { DanhMucVaiTroFormService } from './danh-muc-vai-tro-form.service';

describe('DanhMucVaiTro Form Service', () => {
  let service: DanhMucVaiTroFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucVaiTroFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucVaiTroFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucVaiTroFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idVaiTro: expect.any(Object),
            dienGiai: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idLoaiVaiTro: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucVaiTro should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucVaiTroFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idVaiTro: expect.any(Object),
            dienGiai: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
            idLoaiVaiTro: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucVaiTro', () => {
      it('should return NewDanhMucVaiTro for default DanhMucVaiTro initial value', () => {
        const formGroup = service.createDanhMucVaiTroFormGroup(sampleWithNewData);

        const danhMucVaiTro = service.getDanhMucVaiTro(formGroup) as any;

        expect(danhMucVaiTro).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucVaiTro for empty DanhMucVaiTro initial value', () => {
        const formGroup = service.createDanhMucVaiTroFormGroup();

        const danhMucVaiTro = service.getDanhMucVaiTro(formGroup) as any;

        expect(danhMucVaiTro).toMatchObject({});
      });

      it('should return IDanhMucVaiTro', () => {
        const formGroup = service.createDanhMucVaiTroFormGroup(sampleWithRequiredData);

        const danhMucVaiTro = service.getDanhMucVaiTro(formGroup) as any;

        expect(danhMucVaiTro).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucVaiTro should not enable id FormControl', () => {
        const formGroup = service.createDanhMucVaiTroFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucVaiTro should disable id FormControl', () => {
        const formGroup = service.createDanhMucVaiTroFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
