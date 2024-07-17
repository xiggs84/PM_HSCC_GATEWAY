import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { IHdMasterTcCoCcv } from '../hd-master-tc-co-ccv.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../hd-master-tc-co-ccv.test-samples';

import { HdMasterTcCoCcvService } from './hd-master-tc-co-ccv.service';

const requireRestSample: IHdMasterTcCoCcv = {
  ...sampleWithRequiredData,
};

describe('HdMasterTcCoCcv Service', () => {
  let service: HdMasterTcCoCcvService;
  let httpMock: HttpTestingController;
  let expectedResult: IHdMasterTcCoCcv | IHdMasterTcCoCcv[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(HdMasterTcCoCcvService);
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

    it('should create a HdMasterTcCoCcv', () => {
      const hdMasterTcCoCcv = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(hdMasterTcCoCcv).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a HdMasterTcCoCcv', () => {
      const hdMasterTcCoCcv = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(hdMasterTcCoCcv).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a HdMasterTcCoCcv', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of HdMasterTcCoCcv', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a HdMasterTcCoCcv', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addHdMasterTcCoCcvToCollectionIfMissing', () => {
      it('should add a HdMasterTcCoCcv to an empty array', () => {
        const hdMasterTcCoCcv: IHdMasterTcCoCcv = sampleWithRequiredData;
        expectedResult = service.addHdMasterTcCoCcvToCollectionIfMissing([], hdMasterTcCoCcv);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdMasterTcCoCcv);
      });

      it('should not add a HdMasterTcCoCcv to an array that contains it', () => {
        const hdMasterTcCoCcv: IHdMasterTcCoCcv = sampleWithRequiredData;
        const hdMasterTcCoCcvCollection: IHdMasterTcCoCcv[] = [
          {
            ...hdMasterTcCoCcv,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addHdMasterTcCoCcvToCollectionIfMissing(hdMasterTcCoCcvCollection, hdMasterTcCoCcv);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a HdMasterTcCoCcv to an array that doesn't contain it", () => {
        const hdMasterTcCoCcv: IHdMasterTcCoCcv = sampleWithRequiredData;
        const hdMasterTcCoCcvCollection: IHdMasterTcCoCcv[] = [sampleWithPartialData];
        expectedResult = service.addHdMasterTcCoCcvToCollectionIfMissing(hdMasterTcCoCcvCollection, hdMasterTcCoCcv);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdMasterTcCoCcv);
      });

      it('should add only unique HdMasterTcCoCcv to an array', () => {
        const hdMasterTcCoCcvArray: IHdMasterTcCoCcv[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const hdMasterTcCoCcvCollection: IHdMasterTcCoCcv[] = [sampleWithRequiredData];
        expectedResult = service.addHdMasterTcCoCcvToCollectionIfMissing(hdMasterTcCoCcvCollection, ...hdMasterTcCoCcvArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const hdMasterTcCoCcv: IHdMasterTcCoCcv = sampleWithRequiredData;
        const hdMasterTcCoCcv2: IHdMasterTcCoCcv = sampleWithPartialData;
        expectedResult = service.addHdMasterTcCoCcvToCollectionIfMissing([], hdMasterTcCoCcv, hdMasterTcCoCcv2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(hdMasterTcCoCcv);
        expect(expectedResult).toContain(hdMasterTcCoCcv2);
      });

      it('should accept null and undefined values', () => {
        const hdMasterTcCoCcv: IHdMasterTcCoCcv = sampleWithRequiredData;
        expectedResult = service.addHdMasterTcCoCcvToCollectionIfMissing([], null, hdMasterTcCoCcv, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(hdMasterTcCoCcv);
      });

      it('should return initial array if no HdMasterTcCoCcv is added', () => {
        const hdMasterTcCoCcvCollection: IHdMasterTcCoCcv[] = [sampleWithRequiredData];
        expectedResult = service.addHdMasterTcCoCcvToCollectionIfMissing(hdMasterTcCoCcvCollection, undefined, null);
        expect(expectedResult).toEqual(hdMasterTcCoCcvCollection);
      });
    });

    describe('compareHdMasterTcCoCcv', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareHdMasterTcCoCcv(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareHdMasterTcCoCcv(entity1, entity2);
        const compareResult2 = service.compareHdMasterTcCoCcv(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareHdMasterTcCoCcv(entity1, entity2);
        const compareResult2 = service.compareHdMasterTcCoCcv(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareHdMasterTcCoCcv(entity1, entity2);
        const compareResult2 = service.compareHdMasterTcCoCcv(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
