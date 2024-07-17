import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-can-bo.test-samples';

import { DanhMucCanBoFormService } from './danh-muc-can-bo-form.service';

describe('DanhMucCanBo Form Service', () => {
  let service: DanhMucCanBoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucCanBoFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucCanBoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucCanBoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCanBo: expect.any(Object),
            tenCanBo: expect.any(Object),
            diaChi: expect.any(Object),
            namSinh: expect.any(Object),
            email: expect.any(Object),
            soDienThoai: expect.any(Object),
            soCmnd: expect.any(Object),
            tenDangNhap: expect.any(Object),
            matKhau: expect.any(Object),
            trangThai: expect.any(Object),
            clientId: expect.any(Object),
            clientSecret: expect.any(Object),
            usernameKyso: expect.any(Object),
            passwordKyso: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucCanBo should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucCanBoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCanBo: expect.any(Object),
            tenCanBo: expect.any(Object),
            diaChi: expect.any(Object),
            namSinh: expect.any(Object),
            email: expect.any(Object),
            soDienThoai: expect.any(Object),
            soCmnd: expect.any(Object),
            tenDangNhap: expect.any(Object),
            matKhau: expect.any(Object),
            trangThai: expect.any(Object),
            clientId: expect.any(Object),
            clientSecret: expect.any(Object),
            usernameKyso: expect.any(Object),
            passwordKyso: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucCanBo', () => {
      it('should return NewDanhMucCanBo for default DanhMucCanBo initial value', () => {
        const formGroup = service.createDanhMucCanBoFormGroup(sampleWithNewData);

        const danhMucCanBo = service.getDanhMucCanBo(formGroup) as any;

        expect(danhMucCanBo).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucCanBo for empty DanhMucCanBo initial value', () => {
        const formGroup = service.createDanhMucCanBoFormGroup();

        const danhMucCanBo = service.getDanhMucCanBo(formGroup) as any;

        expect(danhMucCanBo).toMatchObject({});
      });

      it('should return IDanhMucCanBo', () => {
        const formGroup = service.createDanhMucCanBoFormGroup(sampleWithRequiredData);

        const danhMucCanBo = service.getDanhMucCanBo(formGroup) as any;

        expect(danhMucCanBo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucCanBo should not enable id FormControl', () => {
        const formGroup = service.createDanhMucCanBoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucCanBo should disable id FormControl', () => {
        const formGroup = service.createDanhMucCanBoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
