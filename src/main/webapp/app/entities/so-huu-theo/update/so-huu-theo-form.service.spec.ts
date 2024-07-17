import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../so-huu-theo.test-samples';

import { SoHuuTheoFormService } from './so-huu-theo-form.service';

describe('SoHuuTheo Form Service', () => {
  let service: SoHuuTheoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoHuuTheoFormService);
  });

  describe('Service methods', () => {
    describe('createSoHuuTheoFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSoHuuTheoFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idSoHuu: expect.any(Object),
            dienGiai: expect.any(Object),
            tenGcn: expect.any(Object),
          }),
        );
      });

      it('passing ISoHuuTheo should create a new form with FormGroup', () => {
        const formGroup = service.createSoHuuTheoFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idSoHuu: expect.any(Object),
            dienGiai: expect.any(Object),
            tenGcn: expect.any(Object),
          }),
        );
      });
    });

    describe('getSoHuuTheo', () => {
      it('should return NewSoHuuTheo for default SoHuuTheo initial value', () => {
        const formGroup = service.createSoHuuTheoFormGroup(sampleWithNewData);

        const soHuuTheo = service.getSoHuuTheo(formGroup) as any;

        expect(soHuuTheo).toMatchObject(sampleWithNewData);
      });

      it('should return NewSoHuuTheo for empty SoHuuTheo initial value', () => {
        const formGroup = service.createSoHuuTheoFormGroup();

        const soHuuTheo = service.getSoHuuTheo(formGroup) as any;

        expect(soHuuTheo).toMatchObject({});
      });

      it('should return ISoHuuTheo', () => {
        const formGroup = service.createSoHuuTheoFormGroup(sampleWithRequiredData);

        const soHuuTheo = service.getSoHuuTheo(formGroup) as any;

        expect(soHuuTheo).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISoHuuTheo should not enable id FormControl', () => {
        const formGroup = service.createSoHuuTheoFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSoHuuTheo should disable id FormControl', () => {
        const formGroup = service.createSoHuuTheoFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
