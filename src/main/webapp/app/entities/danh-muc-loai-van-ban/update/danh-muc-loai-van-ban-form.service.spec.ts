import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-loai-van-ban.test-samples';

import { DanhMucLoaiVanBanFormService } from './danh-muc-loai-van-ban-form.service';

describe('DanhMucLoaiVanBan Form Service', () => {
  let service: DanhMucLoaiVanBanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucLoaiVanBanFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucLoaiVanBanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucLoaiVanBanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiVb: expect.any(Object),
            dienGiai: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucLoaiVanBan should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucLoaiVanBanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idLoaiVb: expect.any(Object),
            dienGiai: expect.any(Object),
            idLoaiHopDong: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucLoaiVanBan', () => {
      it('should return NewDanhMucLoaiVanBan for default DanhMucLoaiVanBan initial value', () => {
        const formGroup = service.createDanhMucLoaiVanBanFormGroup(sampleWithNewData);

        const danhMucLoaiVanBan = service.getDanhMucLoaiVanBan(formGroup) as any;

        expect(danhMucLoaiVanBan).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucLoaiVanBan for empty DanhMucLoaiVanBan initial value', () => {
        const formGroup = service.createDanhMucLoaiVanBanFormGroup();

        const danhMucLoaiVanBan = service.getDanhMucLoaiVanBan(formGroup) as any;

        expect(danhMucLoaiVanBan).toMatchObject({});
      });

      it('should return IDanhMucLoaiVanBan', () => {
        const formGroup = service.createDanhMucLoaiVanBanFormGroup(sampleWithRequiredData);

        const danhMucLoaiVanBan = service.getDanhMucLoaiVanBan(formGroup) as any;

        expect(danhMucLoaiVanBan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucLoaiVanBan should not enable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiVanBanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucLoaiVanBan should disable id FormControl', () => {
        const formGroup = service.createDanhMucLoaiVanBanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
