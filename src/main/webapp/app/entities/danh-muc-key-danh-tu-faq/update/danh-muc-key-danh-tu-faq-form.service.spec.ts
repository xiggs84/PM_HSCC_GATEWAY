import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-key-danh-tu-faq.test-samples';

import { DanhMucKeyDanhTuFaqFormService } from './danh-muc-key-danh-tu-faq-form.service';

describe('DanhMucKeyDanhTuFaq Form Service', () => {
  let service: DanhMucKeyDanhTuFaqFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucKeyDanhTuFaqFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucKeyDanhTuFaqFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucKeyDanhTuFaqFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            keyDanhTu: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucKeyDanhTuFaq should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucKeyDanhTuFaqFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            keyDanhTu: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucKeyDanhTuFaq', () => {
      it('should return NewDanhMucKeyDanhTuFaq for default DanhMucKeyDanhTuFaq initial value', () => {
        const formGroup = service.createDanhMucKeyDanhTuFaqFormGroup(sampleWithNewData);

        const danhMucKeyDanhTuFaq = service.getDanhMucKeyDanhTuFaq(formGroup) as any;

        expect(danhMucKeyDanhTuFaq).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucKeyDanhTuFaq for empty DanhMucKeyDanhTuFaq initial value', () => {
        const formGroup = service.createDanhMucKeyDanhTuFaqFormGroup();

        const danhMucKeyDanhTuFaq = service.getDanhMucKeyDanhTuFaq(formGroup) as any;

        expect(danhMucKeyDanhTuFaq).toMatchObject({});
      });

      it('should return IDanhMucKeyDanhTuFaq', () => {
        const formGroup = service.createDanhMucKeyDanhTuFaqFormGroup(sampleWithRequiredData);

        const danhMucKeyDanhTuFaq = service.getDanhMucKeyDanhTuFaq(formGroup) as any;

        expect(danhMucKeyDanhTuFaq).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucKeyDanhTuFaq should not enable id FormControl', () => {
        const formGroup = service.createDanhMucKeyDanhTuFaqFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucKeyDanhTuFaq should disable id FormControl', () => {
        const formGroup = service.createDanhMucKeyDanhTuFaqFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
