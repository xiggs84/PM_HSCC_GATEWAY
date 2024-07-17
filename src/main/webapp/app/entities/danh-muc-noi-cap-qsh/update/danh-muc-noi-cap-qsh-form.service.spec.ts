import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-noi-cap-qsh.test-samples';

import { DanhMucNoiCapQshFormService } from './danh-muc-noi-cap-qsh-form.service';

describe('DanhMucNoiCapQsh Form Service', () => {
  let service: DanhMucNoiCapQshFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucNoiCapQshFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucNoiCapQshFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucNoiCapQshFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNoiCap: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucNoiCapQsh should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucNoiCapQshFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNoiCap: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucNoiCapQsh', () => {
      it('should return NewDanhMucNoiCapQsh for default DanhMucNoiCapQsh initial value', () => {
        const formGroup = service.createDanhMucNoiCapQshFormGroup(sampleWithNewData);

        const danhMucNoiCapQsh = service.getDanhMucNoiCapQsh(formGroup) as any;

        expect(danhMucNoiCapQsh).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucNoiCapQsh for empty DanhMucNoiCapQsh initial value', () => {
        const formGroup = service.createDanhMucNoiCapQshFormGroup();

        const danhMucNoiCapQsh = service.getDanhMucNoiCapQsh(formGroup) as any;

        expect(danhMucNoiCapQsh).toMatchObject({});
      });

      it('should return IDanhMucNoiCapQsh', () => {
        const formGroup = service.createDanhMucNoiCapQshFormGroup(sampleWithRequiredData);

        const danhMucNoiCapQsh = service.getDanhMucNoiCapQsh(formGroup) as any;

        expect(danhMucNoiCapQsh).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucNoiCapQsh should not enable id FormControl', () => {
        const formGroup = service.createDanhMucNoiCapQshFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucNoiCapQsh should disable id FormControl', () => {
        const formGroup = service.createDanhMucNoiCapQshFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
