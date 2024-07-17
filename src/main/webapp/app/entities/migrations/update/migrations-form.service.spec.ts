import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../migrations.test-samples';

import { MigrationsFormService } from './migrations-form.service';

describe('Migrations Form Service', () => {
  let service: MigrationsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MigrationsFormService);
  });

  describe('Service methods', () => {
    describe('createMigrationsFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createMigrationsFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            migration: expect.any(Object),
            batch: expect.any(Object),
          }),
        );
      });

      it('passing IMigrations should create a new form with FormGroup', () => {
        const formGroup = service.createMigrationsFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            migration: expect.any(Object),
            batch: expect.any(Object),
          }),
        );
      });
    });

    describe('getMigrations', () => {
      it('should return NewMigrations for default Migrations initial value', () => {
        const formGroup = service.createMigrationsFormGroup(sampleWithNewData);

        const migrations = service.getMigrations(formGroup) as any;

        expect(migrations).toMatchObject(sampleWithNewData);
      });

      it('should return NewMigrations for empty Migrations initial value', () => {
        const formGroup = service.createMigrationsFormGroup();

        const migrations = service.getMigrations(formGroup) as any;

        expect(migrations).toMatchObject({});
      });

      it('should return IMigrations', () => {
        const formGroup = service.createMigrationsFormGroup(sampleWithRequiredData);

        const migrations = service.getMigrations(formGroup) as any;

        expect(migrations).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IMigrations should not enable id FormControl', () => {
        const formGroup = service.createMigrationsFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewMigrations should disable id FormControl', () => {
        const formGroup = service.createMigrationsFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
