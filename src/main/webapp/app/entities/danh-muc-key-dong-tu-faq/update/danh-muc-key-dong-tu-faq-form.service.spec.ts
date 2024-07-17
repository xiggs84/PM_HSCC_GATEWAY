import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-key-dong-tu-faq.test-samples';

import { DanhMucKeyDongTuFaqFormService } from './danh-muc-key-dong-tu-faq-form.service';

describe('DanhMucKeyDongTuFaq Form Service', () => {
  let service: DanhMucKeyDongTuFaqFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucKeyDongTuFaqFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucKeyDongTuFaqFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucKeyDongTuFaqFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            keyDongTu: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucKeyDongTuFaq should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucKeyDongTuFaqFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            keyDongTu: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucKeyDongTuFaq', () => {
      it('should return NewDanhMucKeyDongTuFaq for default DanhMucKeyDongTuFaq initial value', () => {
        const formGroup = service.createDanhMucKeyDongTuFaqFormGroup(sampleWithNewData);

        const danhMucKeyDongTuFaq = service.getDanhMucKeyDongTuFaq(formGroup) as any;

        expect(danhMucKeyDongTuFaq).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucKeyDongTuFaq for empty DanhMucKeyDongTuFaq initial value', () => {
        const formGroup = service.createDanhMucKeyDongTuFaqFormGroup();

        const danhMucKeyDongTuFaq = service.getDanhMucKeyDongTuFaq(formGroup) as any;

        expect(danhMucKeyDongTuFaq).toMatchObject({});
      });

      it('should return IDanhMucKeyDongTuFaq', () => {
        const formGroup = service.createDanhMucKeyDongTuFaqFormGroup(sampleWithRequiredData);

        const danhMucKeyDongTuFaq = service.getDanhMucKeyDongTuFaq(formGroup) as any;

        expect(danhMucKeyDongTuFaq).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucKeyDongTuFaq should not enable id FormControl', () => {
        const formGroup = service.createDanhMucKeyDongTuFaqFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucKeyDongTuFaq should disable id FormControl', () => {
        const formGroup = service.createDanhMucKeyDongTuFaqFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
