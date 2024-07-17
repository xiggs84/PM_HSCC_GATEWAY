import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IThuaTach } from '../thua-tach.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../thua-tach.test-samples';

import { ThuaTachService } from './thua-tach.service';

const requireRestSample: IThuaTach = {
  ...sampleWithRequiredData,
};

describe('ThuaTach Service', () => {
  let service: ThuaTachService;
  let httpMock: HttpTestingController;
  let expectedResult: IThuaTach | IThuaTach[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(ThuaTachService);
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

    it('should create a ThuaTach', () => {
      const thuaTach = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(thuaTach).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a ThuaTach', () => {
      const thuaTach = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(thuaTach).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a ThuaTach', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of ThuaTach', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a ThuaTach', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addThuaTachToCollectionIfMissing', () => {
      it('should add a ThuaTach to an empty array', () => {
        const thuaTach: IThuaTach = sampleWithRequiredData;
        expectedResult = service.addThuaTachToCollectionIfMissing([], thuaTach);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thuaTach);
      });

      it('should not add a ThuaTach to an array that contains it', () => {
        const thuaTach: IThuaTach = sampleWithRequiredData;
        const thuaTachCollection: IThuaTach[] = [
          {
            ...thuaTach,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addThuaTachToCollectionIfMissing(thuaTachCollection, thuaTach);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a ThuaTach to an array that doesn't contain it", () => {
        const thuaTach: IThuaTach = sampleWithRequiredData;
        const thuaTachCollection: IThuaTach[] = [sampleWithPartialData];
        expectedResult = service.addThuaTachToCollectionIfMissing(thuaTachCollection, thuaTach);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thuaTach);
      });

      it('should add only unique ThuaTach to an array', () => {
        const thuaTachArray: IThuaTach[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const thuaTachCollection: IThuaTach[] = [sampleWithRequiredData];
        expectedResult = service.addThuaTachToCollectionIfMissing(thuaTachCollection, ...thuaTachArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const thuaTach: IThuaTach = sampleWithRequiredData;
        const thuaTach2: IThuaTach = sampleWithPartialData;
        expectedResult = service.addThuaTachToCollectionIfMissing([], thuaTach, thuaTach2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(thuaTach);
        expect(expectedResult).toContain(thuaTach2);
      });

      it('should accept null and undefined values', () => {
        const thuaTach: IThuaTach = sampleWithRequiredData;
        expectedResult = service.addThuaTachToCollectionIfMissing([], null, thuaTach, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(thuaTach);
      });

      it('should return initial array if no ThuaTach is added', () => {
        const thuaTachCollection: IThuaTach[] = [sampleWithRequiredData];
        expectedResult = service.addThuaTachToCollectionIfMissing(thuaTachCollection, undefined, null);
        expect(expectedResult).toEqual(thuaTachCollection);
      });
    });

    describe('compareThuaTach', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareThuaTach(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareThuaTach(entity1, entity2);
        const compareResult2 = service.compareThuaTach(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareThuaTach(entity1, entity2);
        const compareResult2 = service.compareThuaTach(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareThuaTach(entity1, entity2);
        const compareResult2 = service.compareThuaTach(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
