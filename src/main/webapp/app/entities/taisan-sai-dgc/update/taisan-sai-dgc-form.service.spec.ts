import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../taisan-sai-dgc.test-samples';

import { TaisanSaiDgcFormService } from './taisan-sai-dgc-form.service';

describe('TaisanSaiDgc Form Service', () => {
  let service: TaisanSaiDgcFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaisanSaiDgcFormService);
  });

  describe('Service methods', () => {
    describe('createTaisanSaiDgcFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaisanSaiDgcFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idMaster: expect.any(Object),
            thongTinTs: expect.any(Object),
            thongTinTsDung: expect.any(Object),
          }),
        );
      });

      it('passing ITaisanSaiDgc should create a new form with FormGroup', () => {
        const formGroup = service.createTaisanSaiDgcFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idMaster: expect.any(Object),
            thongTinTs: expect.any(Object),
            thongTinTsDung: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaisanSaiDgc', () => {
      it('should return NewTaisanSaiDgc for default TaisanSaiDgc initial value', () => {
        const formGroup = service.createTaisanSaiDgcFormGroup(sampleWithNewData);

        const taisanSaiDgc = service.getTaisanSaiDgc(formGroup) as any;

        expect(taisanSaiDgc).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaisanSaiDgc for empty TaisanSaiDgc initial value', () => {
        const formGroup = service.createTaisanSaiDgcFormGroup();

        const taisanSaiDgc = service.getTaisanSaiDgc(formGroup) as any;

        expect(taisanSaiDgc).toMatchObject({});
      });

      it('should return ITaisanSaiDgc', () => {
        const formGroup = service.createTaisanSaiDgcFormGroup(sampleWithRequiredData);

        const taisanSaiDgc = service.getTaisanSaiDgc(formGroup) as any;

        expect(taisanSaiDgc).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaisanSaiDgc should not enable id FormControl', () => {
        const formGroup = service.createTaisanSaiDgcFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaisanSaiDgc should disable id FormControl', () => {
        const formGroup = service.createTaisanSaiDgcFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
