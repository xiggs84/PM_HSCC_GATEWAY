import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ISoHuuTheo } from '../so-huu-theo.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../so-huu-theo.test-samples';

import { SoHuuTheoService } from './so-huu-theo.service';

const requireRestSample: ISoHuuTheo = {
  ...sampleWithRequiredData,
};

describe('SoHuuTheo Service', () => {
  let service: SoHuuTheoService;
  let httpMock: HttpTestingController;
  let expectedResult: ISoHuuTheo | ISoHuuTheo[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(SoHuuTheoService);
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

    it('should create a SoHuuTheo', () => {
      const soHuuTheo = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(soHuuTheo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a SoHuuTheo', () => {
      const soHuuTheo = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(soHuuTheo).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a SoHuuTheo', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of SoHuuTheo', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a SoHuuTheo', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addSoHuuTheoToCollectionIfMissing', () => {
      it('should add a SoHuuTheo to an empty array', () => {
        const soHuuTheo: ISoHuuTheo = sampleWithRequiredData;
        expectedResult = service.addSoHuuTheoToCollectionIfMissing([], soHuuTheo);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soHuuTheo);
      });

      it('should not add a SoHuuTheo to an array that contains it', () => {
        const soHuuTheo: ISoHuuTheo = sampleWithRequiredData;
        const soHuuTheoCollection: ISoHuuTheo[] = [
          {
            ...soHuuTheo,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addSoHuuTheoToCollectionIfMissing(soHuuTheoCollection, soHuuTheo);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a SoHuuTheo to an array that doesn't contain it", () => {
        const soHuuTheo: ISoHuuTheo = sampleWithRequiredData;
        const soHuuTheoCollection: ISoHuuTheo[] = [sampleWithPartialData];
        expectedResult = service.addSoHuuTheoToCollectionIfMissing(soHuuTheoCollection, soHuuTheo);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soHuuTheo);
      });

      it('should add only unique SoHuuTheo to an array', () => {
        const soHuuTheoArray: ISoHuuTheo[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const soHuuTheoCollection: ISoHuuTheo[] = [sampleWithRequiredData];
        expectedResult = service.addSoHuuTheoToCollectionIfMissing(soHuuTheoCollection, ...soHuuTheoArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const soHuuTheo: ISoHuuTheo = sampleWithRequiredData;
        const soHuuTheo2: ISoHuuTheo = sampleWithPartialData;
        expectedResult = service.addSoHuuTheoToCollectionIfMissing([], soHuuTheo, soHuuTheo2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(soHuuTheo);
        expect(expectedResult).toContain(soHuuTheo2);
      });

      it('should accept null and undefined values', () => {
        const soHuuTheo: ISoHuuTheo = sampleWithRequiredData;
        expectedResult = service.addSoHuuTheoToCollectionIfMissing([], null, soHuuTheo, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(soHuuTheo);
      });

      it('should return initial array if no SoHuuTheo is added', () => {
        const soHuuTheoCollection: ISoHuuTheo[] = [sampleWithRequiredData];
        expectedResult = service.addSoHuuTheoToCollectionIfMissing(soHuuTheoCollection, undefined, null);
        expect(expectedResult).toEqual(soHuuTheoCollection);
      });
    });

    describe('compareSoHuuTheo', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareSoHuuTheo(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareSoHuuTheo(entity1, entity2);
        const compareResult2 = service.compareSoHuuTheo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareSoHuuTheo(entity1, entity2);
        const compareResult2 = service.compareSoHuuTheo(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareSoHuuTheo(entity1, entity2);
        const compareResult2 = service.compareSoHuuTheo(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
