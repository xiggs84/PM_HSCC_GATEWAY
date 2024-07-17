import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../so-lan-hoi-faq.test-samples';

import { SoLanHoiFaqFormService } from './so-lan-hoi-faq-form.service';

describe('SoLanHoiFaq Form Service', () => {
  let service: SoLanHoiFaqFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoLanHoiFaqFormService);
  });

  describe('Service methods', () => {
    describe('createSoLanHoiFaqFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createSoLanHoiFaqFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            idCanBo: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });

      it('passing ISoLanHoiFaq should create a new form with FormGroup', () => {
        const formGroup = service.createSoLanHoiFaqFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idCauHoi: expect.any(Object),
            idCanBo: expect.any(Object),
            ngayThaoTac: expect.any(Object),
          }),
        );
      });
    });

    describe('getSoLanHoiFaq', () => {
      it('should return NewSoLanHoiFaq for default SoLanHoiFaq initial value', () => {
        const formGroup = service.createSoLanHoiFaqFormGroup(sampleWithNewData);

        const soLanHoiFaq = service.getSoLanHoiFaq(formGroup) as any;

        expect(soLanHoiFaq).toMatchObject(sampleWithNewData);
      });

      it('should return NewSoLanHoiFaq for empty SoLanHoiFaq initial value', () => {
        const formGroup = service.createSoLanHoiFaqFormGroup();

        const soLanHoiFaq = service.getSoLanHoiFaq(formGroup) as any;

        expect(soLanHoiFaq).toMatchObject({});
      });

      it('should return ISoLanHoiFaq', () => {
        const formGroup = service.createSoLanHoiFaqFormGroup(sampleWithRequiredData);

        const soLanHoiFaq = service.getSoLanHoiFaq(formGroup) as any;

        expect(soLanHoiFaq).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ISoLanHoiFaq should not enable id FormControl', () => {
        const formGroup = service.createSoLanHoiFaqFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewSoLanHoiFaq should disable id FormControl', () => {
        const formGroup = service.createSoLanHoiFaqFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
