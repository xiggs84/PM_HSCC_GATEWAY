import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ILogSearchDsTs } from '../log-search-ds-ts.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../log-search-ds-ts.test-samples';

import { LogSearchDsTsService, RestLogSearchDsTs } from './log-search-ds-ts.service';

const requireRestSample: RestLogSearchDsTs = {
  ...sampleWithRequiredData,
  ngayThaoTac: sampleWithRequiredData.ngayThaoTac?.format(DATE_FORMAT),
};

describe('LogSearchDsTs Service', () => {
  let service: LogSearchDsTsService;
  let httpMock: HttpTestingController;
  let expectedResult: ILogSearchDsTs | ILogSearchDsTs[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(LogSearchDsTsService);
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

    it('should create a LogSearchDsTs', () => {
      const logSearchDsTs = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(logSearchDsTs).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a LogSearchDsTs', () => {
      const logSearchDsTs = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(logSearchDsTs).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a LogSearchDsTs', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of LogSearchDsTs', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a LogSearchDsTs', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addLogSearchDsTsToCollectionIfMissing', () => {
      it('should add a LogSearchDsTs to an empty array', () => {
        const logSearchDsTs: ILogSearchDsTs = sampleWithRequiredData;
        expectedResult = service.addLogSearchDsTsToCollectionIfMissing([], logSearchDsTs);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logSearchDsTs);
      });

      it('should not add a LogSearchDsTs to an array that contains it', () => {
        const logSearchDsTs: ILogSearchDsTs = sampleWithRequiredData;
        const logSearchDsTsCollection: ILogSearchDsTs[] = [
          {
            ...logSearchDsTs,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addLogSearchDsTsToCollectionIfMissing(logSearchDsTsCollection, logSearchDsTs);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a LogSearchDsTs to an array that doesn't contain it", () => {
        const logSearchDsTs: ILogSearchDsTs = sampleWithRequiredData;
        const logSearchDsTsCollection: ILogSearchDsTs[] = [sampleWithPartialData];
        expectedResult = service.addLogSearchDsTsToCollectionIfMissing(logSearchDsTsCollection, logSearchDsTs);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logSearchDsTs);
      });

      it('should add only unique LogSearchDsTs to an array', () => {
        const logSearchDsTsArray: ILogSearchDsTs[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const logSearchDsTsCollection: ILogSearchDsTs[] = [sampleWithRequiredData];
        expectedResult = service.addLogSearchDsTsToCollectionIfMissing(logSearchDsTsCollection, ...logSearchDsTsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const logSearchDsTs: ILogSearchDsTs = sampleWithRequiredData;
        const logSearchDsTs2: ILogSearchDsTs = sampleWithPartialData;
        expectedResult = service.addLogSearchDsTsToCollectionIfMissing([], logSearchDsTs, logSearchDsTs2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(logSearchDsTs);
        expect(expectedResult).toContain(logSearchDsTs2);
      });

      it('should accept null and undefined values', () => {
        const logSearchDsTs: ILogSearchDsTs = sampleWithRequiredData;
        expectedResult = service.addLogSearchDsTsToCollectionIfMissing([], null, logSearchDsTs, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(logSearchDsTs);
      });

      it('should return initial array if no LogSearchDsTs is added', () => {
        const logSearchDsTsCollection: ILogSearchDsTs[] = [sampleWithRequiredData];
        expectedResult = service.addLogSearchDsTsToCollectionIfMissing(logSearchDsTsCollection, undefined, null);
        expect(expectedResult).toEqual(logSearchDsTsCollection);
      });
    });

    describe('compareLogSearchDsTs', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareLogSearchDsTs(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareLogSearchDsTs(entity1, entity2);
        const compareResult2 = service.compareLogSearchDsTs(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareLogSearchDsTs(entity1, entity2);
        const compareResult2 = service.compareLogSearchDsTs(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareLogSearchDsTs(entity1, entity2);
        const compareResult2 = service.compareLogSearchDsTs(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
