import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ITaisannhadatid } from '../taisannhadatid.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../taisannhadatid.test-samples';

import { TaisannhadatidService } from './taisannhadatid.service';

const requireRestSample: ITaisannhadatid = {
  ...sampleWithRequiredData,
};

describe('Taisannhadatid Service', () => {
  let service: TaisannhadatidService;
  let httpMock: HttpTestingController;
  let expectedResult: ITaisannhadatid | ITaisannhadatid[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(TaisannhadatidService);
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

    it('should create a Taisannhadatid', () => {
      const taisannhadatid = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(taisannhadatid).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Taisannhadatid', () => {
      const taisannhadatid = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(taisannhadatid).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Taisannhadatid', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Taisannhadatid', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Taisannhadatid', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addTaisannhadatidToCollectionIfMissing', () => {
      it('should add a Taisannhadatid to an empty array', () => {
        const taisannhadatid: ITaisannhadatid = sampleWithRequiredData;
        expectedResult = service.addTaisannhadatidToCollectionIfMissing([], taisannhadatid);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taisannhadatid);
      });

      it('should not add a Taisannhadatid to an array that contains it', () => {
        const taisannhadatid: ITaisannhadatid = sampleWithRequiredData;
        const taisannhadatidCollection: ITaisannhadatid[] = [
          {
            ...taisannhadatid,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addTaisannhadatidToCollectionIfMissing(taisannhadatidCollection, taisannhadatid);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Taisannhadatid to an array that doesn't contain it", () => {
        const taisannhadatid: ITaisannhadatid = sampleWithRequiredData;
        const taisannhadatidCollection: ITaisannhadatid[] = [sampleWithPartialData];
        expectedResult = service.addTaisannhadatidToCollectionIfMissing(taisannhadatidCollection, taisannhadatid);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taisannhadatid);
      });

      it('should add only unique Taisannhadatid to an array', () => {
        const taisannhadatidArray: ITaisannhadatid[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const taisannhadatidCollection: ITaisannhadatid[] = [sampleWithRequiredData];
        expectedResult = service.addTaisannhadatidToCollectionIfMissing(taisannhadatidCollection, ...taisannhadatidArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const taisannhadatid: ITaisannhadatid = sampleWithRequiredData;
        const taisannhadatid2: ITaisannhadatid = sampleWithPartialData;
        expectedResult = service.addTaisannhadatidToCollectionIfMissing([], taisannhadatid, taisannhadatid2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(taisannhadatid);
        expect(expectedResult).toContain(taisannhadatid2);
      });

      it('should accept null and undefined values', () => {
        const taisannhadatid: ITaisannhadatid = sampleWithRequiredData;
        expectedResult = service.addTaisannhadatidToCollectionIfMissing([], null, taisannhadatid, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(taisannhadatid);
      });

      it('should return initial array if no Taisannhadatid is added', () => {
        const taisannhadatidCollection: ITaisannhadatid[] = [sampleWithRequiredData];
        expectedResult = service.addTaisannhadatidToCollectionIfMissing(taisannhadatidCollection, undefined, null);
        expect(expectedResult).toEqual(taisannhadatidCollection);
      });
    });

    describe('compareTaisannhadatid', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareTaisannhadatid(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareTaisannhadatid(entity1, entity2);
        const compareResult2 = service.compareTaisannhadatid(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareTaisannhadatid(entity1, entity2);
        const compareResult2 = service.compareTaisannhadatid(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareTaisannhadatid(entity1, entity2);
        const compareResult2 = service.compareTaisannhadatid(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
