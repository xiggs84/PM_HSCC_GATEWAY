import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../quan-he-nhan-than.test-samples';

import { QuanHeNhanThanFormService } from './quan-he-nhan-than-form.service';

describe('QuanHeNhanThan Form Service', () => {
  let service: QuanHeNhanThanFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanHeNhanThanFormService);
  });

  describe('Service methods', () => {
    describe('createQuanHeNhanThanFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createQuanHeNhanThanFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuanHe: expect.any(Object),
            dienGiai: expect.any(Object),
            idQuanHeDoiUng: expect.any(Object),
            idGioiTinh: expect.any(Object),
          }),
        );
      });

      it('passing IQuanHeNhanThan should create a new form with FormGroup', () => {
        const formGroup = service.createQuanHeNhanThanFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idQuanHe: expect.any(Object),
            dienGiai: expect.any(Object),
            idQuanHeDoiUng: expect.any(Object),
            idGioiTinh: expect.any(Object),
          }),
        );
      });
    });

    describe('getQuanHeNhanThan', () => {
      it('should return NewQuanHeNhanThan for default QuanHeNhanThan initial value', () => {
        const formGroup = service.createQuanHeNhanThanFormGroup(sampleWithNewData);

        const quanHeNhanThan = service.getQuanHeNhanThan(formGroup) as any;

        expect(quanHeNhanThan).toMatchObject(sampleWithNewData);
      });

      it('should return NewQuanHeNhanThan for empty QuanHeNhanThan initial value', () => {
        const formGroup = service.createQuanHeNhanThanFormGroup();

        const quanHeNhanThan = service.getQuanHeNhanThan(formGroup) as any;

        expect(quanHeNhanThan).toMatchObject({});
      });

      it('should return IQuanHeNhanThan', () => {
        const formGroup = service.createQuanHeNhanThanFormGroup(sampleWithRequiredData);

        const quanHeNhanThan = service.getQuanHeNhanThan(formGroup) as any;

        expect(quanHeNhanThan).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IQuanHeNhanThan should not enable id FormControl', () => {
        const formGroup = service.createQuanHeNhanThanFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewQuanHeNhanThan should disable id FormControl', () => {
        const formGroup = service.createQuanHeNhanThanFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
