import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../danh-muc-faq.test-samples';

import { DanhMucFaqFormService } from './danh-muc-faq-form.service';

describe('DanhMucFaq Form Service', () => {
  let service: DanhMucFaqFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DanhMucFaqFormService);
  });

  describe('Service methods', () => {
    describe('createDanhMucFaqFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDanhMucFaqFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            noiDung: expect.any(Object),
            cauTraLoi: expect.any(Object),
            loai: expect.any(Object),
          }),
        );
      });

      it('passing IDanhMucFaq should create a new form with FormGroup', () => {
        const formGroup = service.createDanhMucFaqFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            noiDung: expect.any(Object),
            cauTraLoi: expect.any(Object),
            loai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDanhMucFaq', () => {
      it('should return NewDanhMucFaq for default DanhMucFaq initial value', () => {
        const formGroup = service.createDanhMucFaqFormGroup(sampleWithNewData);

        const danhMucFaq = service.getDanhMucFaq(formGroup) as any;

        expect(danhMucFaq).toMatchObject(sampleWithNewData);
      });

      it('should return NewDanhMucFaq for empty DanhMucFaq initial value', () => {
        const formGroup = service.createDanhMucFaqFormGroup();

        const danhMucFaq = service.getDanhMucFaq(formGroup) as any;

        expect(danhMucFaq).toMatchObject({});
      });

      it('should return IDanhMucFaq', () => {
        const formGroup = service.createDanhMucFaqFormGroup(sampleWithRequiredData);

        const danhMucFaq = service.getDanhMucFaq(formGroup) as any;

        expect(danhMucFaq).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDanhMucFaq should not enable id FormControl', () => {
        const formGroup = service.createDanhMucFaqFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDanhMucFaq should disable id FormControl', () => {
        const formGroup = service.createDanhMucFaqFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
