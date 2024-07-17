import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../dm-noi-cap-gpdkx.test-samples';

import { DmNoiCapGpdkxFormService } from './dm-noi-cap-gpdkx-form.service';

describe('DmNoiCapGpdkx Form Service', () => {
  let service: DmNoiCapGpdkxFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DmNoiCapGpdkxFormService);
  });

  describe('Service methods', () => {
    describe('createDmNoiCapGpdkxFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createDmNoiCapGpdkxFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNoiCap: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });

      it('passing IDmNoiCapGpdkx should create a new form with FormGroup', () => {
        const formGroup = service.createDmNoiCapGpdkxFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            idNoiCap: expect.any(Object),
            dienGiai: expect.any(Object),
            idDonVi: expect.any(Object),
            trangThai: expect.any(Object),
          }),
        );
      });
    });

    describe('getDmNoiCapGpdkx', () => {
      it('should return NewDmNoiCapGpdkx for default DmNoiCapGpdkx initial value', () => {
        const formGroup = service.createDmNoiCapGpdkxFormGroup(sampleWithNewData);

        const dmNoiCapGpdkx = service.getDmNoiCapGpdkx(formGroup) as any;

        expect(dmNoiCapGpdkx).toMatchObject(sampleWithNewData);
      });

      it('should return NewDmNoiCapGpdkx for empty DmNoiCapGpdkx initial value', () => {
        const formGroup = service.createDmNoiCapGpdkxFormGroup();

        const dmNoiCapGpdkx = service.getDmNoiCapGpdkx(formGroup) as any;

        expect(dmNoiCapGpdkx).toMatchObject({});
      });

      it('should return IDmNoiCapGpdkx', () => {
        const formGroup = service.createDmNoiCapGpdkxFormGroup(sampleWithRequiredData);

        const dmNoiCapGpdkx = service.getDmNoiCapGpdkx(formGroup) as any;

        expect(dmNoiCapGpdkx).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IDmNoiCapGpdkx should not enable id FormControl', () => {
        const formGroup = service.createDmNoiCapGpdkxFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewDmNoiCapGpdkx should disable id FormControl', () => {
        const formGroup = service.createDmNoiCapGpdkxFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
