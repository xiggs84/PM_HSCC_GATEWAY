import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../taisan-sai-qsdd-dgc.test-samples';

import { TaisanSaiQsddDgcFormService } from './taisan-sai-qsdd-dgc-form.service';

describe('TaisanSaiQsddDgc Form Service', () => {
  let service: TaisanSaiQsddDgcFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaisanSaiQsddDgcFormService);
  });

  describe('Service methods', () => {
    describe('createTaisanSaiQsddDgcFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaisanSaiQsddDgcFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idMaster: expect.any(Object),
            noiCapQsdd: expect.any(Object),
          }),
        );
      });

      it('passing ITaisanSaiQsddDgc should create a new form with FormGroup', () => {
        const formGroup = service.createTaisanSaiQsddDgcFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idMaster: expect.any(Object),
            noiCapQsdd: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaisanSaiQsddDgc', () => {
      it('should return NewTaisanSaiQsddDgc for default TaisanSaiQsddDgc initial value', () => {
        const formGroup = service.createTaisanSaiQsddDgcFormGroup(sampleWithNewData);

        const taisanSaiQsddDgc = service.getTaisanSaiQsddDgc(formGroup) as any;

        expect(taisanSaiQsddDgc).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaisanSaiQsddDgc for empty TaisanSaiQsddDgc initial value', () => {
        const formGroup = service.createTaisanSaiQsddDgcFormGroup();

        const taisanSaiQsddDgc = service.getTaisanSaiQsddDgc(formGroup) as any;

        expect(taisanSaiQsddDgc).toMatchObject({});
      });

      it('should return ITaisanSaiQsddDgc', () => {
        const formGroup = service.createTaisanSaiQsddDgcFormGroup(sampleWithRequiredData);

        const taisanSaiQsddDgc = service.getTaisanSaiQsddDgc(formGroup) as any;

        expect(taisanSaiQsddDgc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaisanSaiQsddDgc should not enable id FormControl', () => {
        const formGroup = service.createTaisanSaiQsddDgcFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaisanSaiQsddDgc should disable id FormControl', () => {
        const formGroup = service.createTaisanSaiQsddDgcFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
