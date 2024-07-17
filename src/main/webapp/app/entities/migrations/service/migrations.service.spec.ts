import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IMigrations } from '../migrations.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../migrations.test-samples';

import { MigrationsService } from './migrations.service';

const requireRestSample: IMigrations = {
  ...sampleWithRequiredData,
};

describe('Migrations Service', () => {
  let service: MigrationsService;
  let httpMock: HttpTestingController;
  let expectedResult: IMigrations | IMigrations[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(MigrationsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Migrations', () => {
      const migrations = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(migrations).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Migrations', () => {
      const migrations = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(migrations).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Migrations', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Migrations', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Migrations', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addMigrationsToCollectionIfMissing', () => {
      it('should add a Migrations to an empty array', () => {
        const migrations: IMigrations = sampleWithRequiredData;
        expectedResult = service.addMigrationsToCollectionIfMissing([], migrations);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(migrations);
      });

      it('should not add a Migrations to an array that contains it', () => {
        const migrations: IMigrations = sampleWithRequiredData;
        const migrationsCollection: IMigrations[] = [
          {
            ...migrations,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addMigrationsToCollectionIfMissing(migrationsCollection, migrations);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Migrations to an array that doesn't contain it", () => {
        const migrations: IMigrations = sampleWithRequiredData;
        const migrationsCollection: IMigrations[] = [sampleWithPartialData];
        expectedResult = service.addMigrationsToCollectionIfMissing(migrationsCollection, migrations);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(migrations);
      });

      it('should add only unique Migrations to an array', () => {
        const migrationsArray: IMigrations[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const migrationsCollection: IMigrations[] = [sampleWithRequiredData];
        expectedResult = service.addMigrationsToCollectionIfMissing(migrationsCollection, ...migrationsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const migrations: IMigrations = sampleWithRequiredData;
        const migrations2: IMigrations = sampleWithPartialData;
        expectedResult = service.addMigrationsToCollectionIfMissing([], migrations, migrations2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(migrations);
        expect(expectedResult).toContain(migrations2);
      });

      it('should accept null and undefined values', () => {
        const migrations: IMigrations = sampleWithRequiredData;
        expectedResult = service.addMigrationsToCollectionIfMissing([], null, migrations, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(migrations);
      });

      it('should return initial array if no Migrations is added', () => {
        const migrationsCollection: IMigrations[] = [sampleWithRequiredData];
        expectedResult = service.addMigrationsToCollectionIfMissing(migrationsCollection, undefined, null);
        expect(expectedResult).toEqual(migrationsCollection);
      });
    });

    describe('compareMigrations', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareMigrations(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareMigrations(entity1, entity2);
        const compareResult2 = service.compareMigrations(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareMigrations(entity1, entity2);
        const compareResult2 = service.compareMigrations(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareMigrations(entity1, entity2);
        const compareResult2 = service.compareMigrations(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
