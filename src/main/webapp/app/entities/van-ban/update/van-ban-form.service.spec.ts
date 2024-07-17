import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../van-ban.test-samples';

import { VanBanFormService } from './van-ban-form.service';

describe('VanBan Form Service', () => {
  let service: VanBanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VanBanFormService);
  });

  describe('Service methods', () => {
    describe('createVanBanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createVanBanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idVanBan: expect.any(Object),
            dienGiai: expect.any(Object),
            tenFile: expect.any(Object),
            srcFile: expect.any(Object),
            idLoaiVb: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDonVi: expect.any(Object),
            idVbGoc: expect.any(Object),
          }),
        );
      });

      it('passing IVanBan should create a new form with FormGroup', () => {
        const formGroup = service.createVanBanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idVanBan: expect.any(Object),
            dienGiai: expect.any(Object),
            tenFile: expect.any(Object),
            srcFile: expect.any(Object),
            idLoaiVb: expect.any(Object),
            trangThai: expect.any(Object),
            ngayThaoTac: expect.any(Object),
            nguoiThaoTac: expect.any(Object),
            idDonVi: expect.any(Object),
            idVbGoc: expect.any(Object),
          }),
        );
      });
    });

    describe('getVanBan', () => {
      it('should return NewVanBan for default VanBan initial value', () => {
        const formGroup = service.createVanBanFormGroup(sampleWithNewData);

        const vanBan = service.getVanBan(formGroup) as any;

        expect(vanBan).toMatchObject(sampleWithNewData);
      });

      it('should return NewVanBan for empty VanBan initial value', () => {
        const formGroup = service.createVanBanFormGroup();

        const vanBan = service.getVanBan(formGroup) as any;

        expect(vanBan).toMatchObject({});
      });

      it('should return IVanBan', () => {
        const formGroup = service.createVanBanFormGroup(sampleWithRequiredData);

        const vanBan = service.getVanBan(formGroup) as any;

        expect(vanBan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IVanBan should not enable id FormControl', () => {
        const formGroup = service.createVanBanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewVanBan should disable id FormControl', () => {
        const formGroup = service.createVanBanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
